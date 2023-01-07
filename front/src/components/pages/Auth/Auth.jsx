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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("auth");

  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation(
    "Registration",
    () =>
      $api({
        url: "/users",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLogin(data.token);
      },
    }
  );

  const {
    mutate: auth,
    isLoading: isLoadingAuth,
    error: errorAuth,
  } = useMutation(
    "Auth",
    () =>
      $api({
        url: "/users/login",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLogin(data.token);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "auth") {
      console.log("auth");
    } else {
      register();
    }
  };

  return (
    <>
      <Layout bgImage={bgImage} heading={"Auth and Registration"} />
      <div className="wrapperInnerPage">
        {error && <Alert type="warning" text="ошибка какая то" />}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
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
            <Button text="Sign in" callback={() => setType("auth")} />
            <Button text="Sign up" callback={() => setType("reg")} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
