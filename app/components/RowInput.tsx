import { InputRefsType } from "../utils/types";
import Input from "./Input";

type RowInputProps = {
  inputRefs: InputRefsType;
  row: number;
};

export default function RowInput(props: RowInputProps) {
  const { inputRefs, row } = props;

  return (
    <>
      <div className="flex flex-row gap-[5px]">
        {Array.from({ length: 5 }, (_, index) => (
          <Input key={index} inputRefs={inputRefs} col={index} row={row} />
        ))}
      </div>
    </>
  );
}
