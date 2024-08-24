import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import styles from "../../components/Home_page/home.module.css";
import cartStyles from "./cart.module.css";
import { useCartContext } from "../../contextAPI/Cartcontext";
import { useOrderContext } from "../../contextAPI/Ordercontext";
export function CartPage() {
  const { cart, removeItemFromCart, setItemCount } = useCartContext();
  const { addOrderToDataBase, shortenTitle } = useOrderContext();
  return (
    <>
      <div className={styles.outer_cont}>
        {cart.length === 0 ? (
          <h1>CART IS EMPTY.....</h1>
        ) : (
          <div className={styles.card_cont}>
            {cart.map((item, index) => {
              return (
                <>
                  <div key={item.id} className={styles.card}>
                    <img className={styles.imgdiv} src={item.image} alt="img" />

                    <div className={styles.details}>
                      <h4>{shortenTitle(item.title, 30)}</h4>
                    </div>
                    <div className={cartStyles.price_cont}>
                      <div className={cartStyles.price}>
                        <h1>$ {item.price * item.itemCount}</h1>
                      </div>

                      <div className={cartStyles.image}>
                        <img
                          onClick={() =>
                            setItemCount({ action: "add", item_id: item.id })
                          }
                          src={plus}
                        />
                        <h4>{item.itemCount}</h4>
                        <img
                          onClick={() =>
                            setItemCount({
                              action: "subtract",
                              item_id: item.id,
                            })
                          }
                          src={minus}
                        />
                      </div>
                    </div>
                    <div className={cartStyles.btn_cont}>
                      <button
                        onClick={() =>
                          addOrderToDataBase({
                            ...item,
                            total_price: item.price * item.itemCount,
                          })
                        }
                        className={`${cartStyles.purchase} ${cartStyles.btn}`}
                      >
                        Purchase
                      </button>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className={` ${cartStyles.remove} ${cartStyles.btn}`}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
