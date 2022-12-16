import Layout from "../../common/Layout";
import styles from "./NewWorkout.module.scss";
import bgImage from "../../../images/new-workout-bg.jpg";
import Field from "../../ui/Field/Field";
import { useState } from "react";
import Button from "../../ui/Button/Button";

const NewWorkout = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <Layout bgImage={bgImage}></Layout>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <Field
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
