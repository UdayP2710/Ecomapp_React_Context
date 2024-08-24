import styles from "./navbar.module.css";
import homeimg from "../../images/home.png";
import signin from "../../images/sign.png";
import cartimg from "../../images/cart.png";
import storeimg from "../../images/download.png";
import signout from "../../images/logout.png";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../contextAPI/Authcontext";
export function Navbar() {
  const { login, setLogin } = useLoginContext();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.logo}`}>
          <h1>ShopSphere</h1>
        </div>
        <div
          className={
            login.status ? styles.login_navcont : styles.navigation_cont
          }
        >
          <Link className={styles.nounderline} to={"/"}>
            <div className={`${styles.image}  `}>
              <img src={homeimg}></img>
              <h2>Home</h2>
            </div>
          </Link>
          {login.status ? (
            <>
              {" "}
              <Link className={styles.nounderline} to={"orders"}>
                <div className={`${styles.image}  `}>
                  <img src={storeimg}></img>
                  <h2>Orders</h2>
                </div>
              </Link>
              <Link className={styles.nounderline} to={"cart"}>
                <div className={`${styles.image}  `}>
                  <img src={cartimg}></img>
                  <h2>Cart</h2>
                </div>
              </Link>
            </>
          ) : (
            ""
          )}
          {login.status ? (
            <div
              onClick={() => {
                navigate("login");
                setLogin({ id: null, status: false });
              }}
              className={`${styles.image}   `}
            >
              <img src={signout}></img>
              <h2>Logout</h2>
            </div>
          ) : (
            <Link className={styles.nounderline} to={"login"}>
              <div className={`${styles.image}   `}>
                <img src={signin}></img>
                <h2>Login</h2>
              </div>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
