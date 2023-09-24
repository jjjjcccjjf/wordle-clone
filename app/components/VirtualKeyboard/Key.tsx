import { RootState } from "@/app/redux/store";
import "@fontsource/roboto";
import clsx from "clsx";
import { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";

type KeyProps = {
  bigKey?: boolean;
  children: string;
  inputRefs?: RefObject<Map<any, any>>;
};

const triggerInputChange = (node: HTMLInputElement, inputValue: string) => {
  const descriptor = Object.getOwnPropertyDescriptor(node, "value");

  node.value = `${inputValue}#`;
  if (descriptor && descriptor.configurable) {
    delete node.value;
  }
  node.value = inputValue;

  const e = document.createEvent("HTMLEvents");
  e.initEvent("change", true, false);
  node.dispatchEvent(e);

  if (descriptor) {
    Object.defineProperty(node, "value", descriptor);
  }
};

export default function Key({ bigKey, children, inputRefs }: KeyProps) {
  const trimmedChildren = children.trim().toUpperCase();

  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );

  const keyboardStatus = useSelector(
    (state: RootState) => state.wordle.keyboardStatus
  );

  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  const handleClick = () => {
    if (inputRefs) {
      const map = inputRefs.current;
      let nextCell = null;
      const generateRegexFocusOnEmpty = (row: number) =>
        new RegExp(`^cell-${row}-[0-4]$`);
      const generateRegexFocusOnLast = (row: number) =>
        new RegExp(`^cell-${row}-4$`);
      const regexEmpty = generateRegexFocusOnEmpty(currentRow);
      const regexLast = generateRegexFocusOnLast(currentRow);

      if (map && !gameWinState) {
        for (const [key, node] of map.entries()) {
          if (
            (node && node.value.length === 0 && regexEmpty.test(key)) ||
            (node && node.value.length === 1 && regexLast.test(key))
          ) {
            nextCell = node;
            break; // Focus the first empty input and stop iterating
          }
        }
      }

      if (nextCell && nextCell.value.length === 0) {
        triggerInputChange(nextCell, children);
      }
    }
  };

  useEffect(() => {}, [keyboardStatus]);

  const classes = clsx(
    "md:w-[43px] w-[25px] h-[58px] flex items-center justify-center font-bold font-[Roboto] rounded-md text-white text-xl",
    keyboardStatus[trimmedChildren]
      ? keyboardStatus[trimmedChildren]
      : "bg-key-default"
  );
  return (
    <button className={classes} onClick={handleClick}>
      {trimmedChildren}
    </button>
  );
}
