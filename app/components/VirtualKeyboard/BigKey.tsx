import { RootState } from "@/app/redux/store";
import "@fontsource/roboto";
import clsx from "clsx";
import { ReactNode, RefObject, useEffect } from "react";
import { useSelector } from "react-redux";

type KeyProps = {
  bigKeyType: "ENTER" | "BACKSPACE";
  children: ReactNode;
  inputRefs?: RefObject<Map<any, any>>;
};

const triggerBackspaceKeydown = (node: HTMLInputElement) => {
  const event = new KeyboardEvent("keydown", {
    key: "Backspace",
    bubbles: true,
    cancelable: true,
  });

  node.dispatchEvent(event);
};

export default function BigKey({ bigKeyType, children, inputRefs }: KeyProps) {

  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );

  const keyboardStatus = useSelector(
    (state: RootState) => state.wordle.keyboardStatus
  );

  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  const handleClick = () => {
     
  };

  useEffect(() => {}, [keyboardStatus]);

  const classes = clsx(
    "w-[65.41px] h-[58px] flex items-center justify-center font-normal font-[Roboto] rounded-md text-white text-[11.5px] bg-key-default"
  );

  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
}
