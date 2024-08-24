import { createContext, useContext, useEffect, useState } from "react";
import { useLoginContext } from "./Authcontext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Databse_config/firebase";
import { toast } from "react-toastify";
const CartContext = createContext();

export function useCartContext() {
  const cartstates = useContext(CartContext);
  return cartstates;
}
export function CartContextProvider({ children }) {
  const { login } = useLoginContext();
  const [cart, setCart] = useState([]);

  //.......function to fetch data from databse.........//
  async function updateCart() {
    if (login.status) {
      const coll_ref = collection(db, "users", login.id, "cart");
      const unsub = onSnapshot(coll_ref, (snap) => {
        const data = snap.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        setCart([...data]);
      });
    }
  }
  async function handelAddToCart(product) {
    const coll_ref = collection(db, "users", login.id, "cart");
    const doc_ref = await addDoc(coll_ref, { ...product, itemCount: 1 });
    toast.success("Item Added to Cart.....");
    return;
  }
  //......Remove item from database function........//
  async function removeItemFromCart(docid) {
    const doc_ref = doc(db, "users", login.id, "cart", docid);
    await deleteDoc(doc_ref);
    toast.warn("Item Removed Successfully.....");
  }
  async function setItemCount({ action, item_id }) {
    const doc_ref = doc(db, "users", login.id, "cart", item_id);
    const docdata = await getDoc(doc_ref);
    const current_count = docdata.data().itemCount;
    if (action === "add") {
      await updateDoc(doc_ref, { itemCount: current_count + 1 });
    } else {
      if (current_count > 1) {
        await updateDoc(doc_ref, { itemCount: current_count - 1 });
      }
    }
    return;
  }

  useEffect(() => {
    updateCart();
  }, [login]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        removeItemFromCart,
        handelAddToCart,
        setItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
