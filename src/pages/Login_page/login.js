import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useLoginContext } from "../../contextAPI/Authcontext.js";

import { loginCheckInDataBase } from "./logincheckdb.js";
export function LoginPage() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { login, setLogin } = useLoginContext();
  async function handelLogin(e) {
    e.preventDefault();
    const userdetails = {
      email: email.current.value,
      password: password.current.value,
    };
    const user = await loginCheckInDataBase(userdetails); // checking for valid credantials using firebase authentication.....

    // console.log(user.uid);
    if (!user) {
      toast.error("Invalid Credentials....");
      return;
    } else {
      setLogin({ id: user.userDocId, status: true });
      navigate("/");
      toast.success("Login Successfull....");
    }
  }
  return (
    <>
      <div className={styles.outer_cont}>
        <form onSubmit={handelLogin} className={styles.login_cont}>
          <div className={styles.input_cont}>
            <h1>Login</h1>
            <input ref={email} type="text" placeholder="Email...." />

            <input ref={password} type="text" placeholder="Password...." />
            <div className={styles.btn_cont}>
              <button>Submit</button>
            </div>
          </div>
        </form>
        <div>
          <Link to={"/register"}>
            <h2>Register. If Not....</h2>
          </Link>
        </div>
      </div>
    </>
  );
}
