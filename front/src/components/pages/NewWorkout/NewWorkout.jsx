import Layout from "../../common/Layout";
import bgImage from "../../../images/new-workout-bg.jpg";
import Field from "../../ui/Field/Field";
import { useState } from "react";
import Button from "../../ui/Button/button";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";

const NewWorkout = () => {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <Layout bgImage={bgImage} heading={"Create new workout"} />
      <div className="wrapperInnerPage">
        <form onSubmit={handleSubmit}>
          <Field
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Link to="/new-exercise" className="dark-link">
            Add new exercise
          </Link>
          <ReactSelect
            classNamePrefix="select2-selection"
            placeholder="Exercises..."
            title="Exercises"
            options={[
              { value: "dfsdfd", label: "Push-ups" },
              { value: "sdfdsf", label: "Pull-ups" },
            ]}
            value={exercises}
            onChange={setExercises}
            isMulti={true}
          />
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
