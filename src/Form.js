import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

function MainForm() {
  const { control, register, handleSubmit, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tasks", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  console.log(getValues());

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <div>
        <span>Customer Detail</span>
        <Controller
          render={({ onChange }) => (
            <input type="text" onIonChange={onChange} />
          )}
          control={control}
          defaultValue=""
          name="task-title"
        />
      </div>

      <div>
        <div>
          <h4>ADD PRODUCT</h4>
        </div>
        <div>
          <div style={{ "--padding-start": 0 }}>
            <span>Product</span>
            <Controller
              render={({ onChange }) => (
                <input type="text" onIonChange={onChange} />
              )}
              control={control}
              defaultValue=""
              name="task-input"
            />
          </div>
          <div lines="none" style={{ "--padding-start": 0 }}>
            <button
              onClick={() =>
                append({ id: Date.now(), subTask: getValues("task-input") })
              }
            >
              Add Task To Objective
            </button>
          </div>
        </div>
      </div>
      <p>PRODUCTS</p>
      {fields.map((task, index) => {
        return (
          <div key={task.id} style={{ "--padding-start": 0 }}>
            <span
              name={`tasks[${index}].subTask`}
              ref={register()}
              defaultValue={task.subTask}
            />
            <Controller
              render={({ value, onChange }) => (
                <input
                  type="text"
                  onIonChange={onChange}
                  name={`tasks[${index}].subTask`}
                  ref={register}
                  value={value}
                />
              )}
              control={control}
              defaultValue={task.subTask} // make sure to set up defaultValue
              name={`tasks[${index}].subTask`}
            />
          </div>
        );
      })}
      <button type="submit">SAVE IT ALL</button>
      <button onClick={() => console.log} color="danger">
        CANCEL
      </button>
    </form>
  );
}

export default MainForm;
