import Layout from "../../common/Layout";
import styles from "./Auth.module.scss";
import bgImage from "../../../images/auth-bg.png";
import Field from "../../ui/Field/Field";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import Alert from "../../ui/Alert/alert";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Field/Loader";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("auth");

  const { mutate, isLoading } = useMutation("Registration", () =>
    $api({
      url: "/users",
      type: "POST",
      body: { email, password },
      auth: false,
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "auth") {
      console.log("auth");
    } else {
      console.log("reg");
    }
  };

  return (
    <>
      <Layout bgImage={bgImage} heading={"Auth and Registration"} />
      <div className="wrapperInnerPage">
        {true && <Alert type="warning" text="вроде что то сделали" />}
        {true && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            type="email"
            placeholder="Введите почту"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <div className={styles.wrapperButtons}>
            <Button text="Sign in" callback={() => setType("auth")} />
            <Button text="Sign up" callback={() => setType("reg")} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
