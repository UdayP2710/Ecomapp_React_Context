import { createContext, useContext, useEffect, useState } from "react";
import { useLoginContext } from "./Authcontext";
import { addDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../Databse_config/firebase";
import { toast } from "react-toastify";

const OrderContext = createContext();
export function useOrderContext() {
  const order = useContext(OrderContext);
  return order;
}
export function OrderContexProvider({ children }) {
  const [order, setOrder] = useState([]);
  const { login } = useLoginContext();
  async function updateOrderState() {
    if (login.status) {
      const coll_ref = collection(db, "users", login.id, "orders");
      const unsub = onSnapshot(coll_ref, (snap) => {
        const allorders = snap.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        setOrder([...allorders]);
      });
    }
  }
  async function addOrderToDataBase(product) {
    const coll_ref = collection(db, "users", login.id, "orders");
    const doc_ref = await addDoc(coll_ref, {
      ...product,
      Order_on: new Date().toDateString(),
    });
    toast.success("Order Has Been Placed.....");
  }

  // function to short the large title string.............
  function shortenTitle(title, maxlength) {
    if (title.length <= maxlength) {
      return title; // If the title is shorter than maxLength, return it as is
    }
    return title.slice(0, maxlength) + "...";
  }
  useEffect(() => {
    updateOrderState();
  }, [login]);
  return (
    <OrderContext.Provider
      value={{ order, setOrder, addOrderToDataBase, shortenTitle }}
    >
      {children}
    </OrderContext.Provider>
  );
}
