import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

const Price = ({ control, index }) => {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });
  return <span>{(value.type || 0) * (value.amount || 0)}</span>;
};

const PriceTotal = ({ control }) => {
  const value = useWatch({
    control,
    name: `items`,
    defaultValue: {},
  });

  console.log(value);
  return null;
};

export default function App() {
  const { register, control, handleSubmit } = useForm();
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <button type="button" onClick={() => prepend({})}>
        Add
      </button>
      {fields.map(({ id, name, type, amount }, index) => {
        return (
          <div key={id}>
            <input
              ref={register()}
              name={`items[${index}].name`}
              defaultValue={name}
            />
            <select
              ref={register()}
              name={`items[${index}].type`}
              defaultValue={type}
            >
              <option value="">Select</option>
              <option value="10">ItemA</option>
              <option value="20">ItemB</option>
            </select>
            <input
              ref={register()}
              type="number"
              name={`items[${index}].amount`}
              defaultValue={amount}
            />
            <Price control={control} index={index} />

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}

      <input type="submit" />
      <PriceTotal control={control} />
    </form>
  );
}
