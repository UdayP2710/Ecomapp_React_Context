import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useLoginContext } from "../../contextAPI/Authcontext";
import { useCartContext } from "../../contextAPI/Cartcontext";
import { useOrderContext } from "../../contextAPI/Ordercontext";
import { useNavigate } from "react-router";
export function HomePage() {
  const [products, setProducts] = useState([]);
  const { login } = useLoginContext();
  const { handelAddToCart } = useCartContext();
  const { shortenTitle } = useOrderContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetch("https://fakestoreapi.com/products/");
        const productsarr = await data.json();
        console.log(productsarr);
        setProducts([...productsarr]);
      } catch (err) {}
    }
    fetchProducts();
  }, []);
  return (
    <>
      <div className={styles.outer_cont}>
        <div className={styles.card_cont}>
          {products.map((product, index) => {
            return (
              <>
                <div key={product.id} className={styles.card}>
                  <img
                    className={styles.imgdiv}
                    src={product.image}
                    alt="img"
                  />

                  <div className={styles.details}>
                    <h4>{shortenTitle(product.title, 30)}</h4>
                  </div>
                  <div className={styles.price}>
                    <h1>$ {product.price}</h1>
                  </div>

                  <button
                    onClick={() => {
                      login.status
                        ? handelAddToCart(product)
                        : navigate("login");
                    }}
                    className={styles.btn}
                  >
                    Add To Cart
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
