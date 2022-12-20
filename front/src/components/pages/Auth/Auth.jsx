import Layout from "../../common/Layout";
import styles from "./Auth.module.scss";
import bgImage from "../../../images/new-workout-bg.jpg";
import Field from "../../ui/Field/Field";
import { useState } from "react";
import Button from "../../ui/Button/Button";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    console.log("auth");
  };
  const handleReg = () => {
    console.log("reg");
  };

  return (
    <>
      <Layout bgImage={bgImage} heading={"Auth and Registration"} />
      <div className="wrapperInnerPage">
        <form>
          <Field
            type="email"
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <div className={styles.wrapperButtons}>
            <Button text="Sign in" callback={handleAuth} />
            <Button text="Sign up" callback={handleReg} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
