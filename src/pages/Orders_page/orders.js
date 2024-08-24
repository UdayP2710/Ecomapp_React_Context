import Styles from "./orders.module.css";
import { useOrderContext } from "../../contextAPI/Ordercontext";
export function OrdersPage() {
  const { order, shortenTitle } = useOrderContext();
  return (
    <>
      <div className={Styles.table_cont}>
        {order.length === 0 ? (
          <h1>NO ORDER IS PLACED YET.....</h1>
        ) : (
          <>
            <div>
              <h1>Your Orders</h1>
            </div>
            <div className={Styles.table_box}>
              <table className={Styles.table}>
                <thead>
                  <tr className={Styles.thead}>
                    <th>Order_Id</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody className={Styles.table_body}>
                  {order.map((item, index) => {
                    return (
                      <>
                        {" "}
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{shortenTitle(item.title, 22)}</td>
                          <td>{item.itemCount}</td>
                          <td>{item.Order_on}</td>
                          <td>{item.total_price}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
