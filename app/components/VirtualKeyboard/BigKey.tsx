import { setSingleLetterCell } from "@/app/redux/slices/wordleSlice";
import { RootState } from "@/app/redux/store";
import {
  animatePopToggle,
  generateRegexFocusOnEmpty,
  generateRegexFocusOnLast,
  getRowColFromKey,
} from "@/app/utils";
import "@fontsource/roboto";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import clsx from "clsx";
import { ReactNode, RefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type KeyProps = {
  bigKeyType: "Enter" | "Backspace";
  children: ReactNode;
  inputRefs?: RefObject<Map<any, any>>;
};

export default function BigKey({ bigKeyType, children, inputRefs }: KeyProps) {
  const map = inputRefs?.current;
  const dispatch = useDispatch();

  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  const classes = clsx(
    "w-[65.41px] h-[58px] flex items-center justify-center font-normal font-[Roboto] rounded-md text-white text-[11.5px] bg-key-default"
  );

  const regexEmpty = generateRegexFocusOnEmpty(currentRow);
  const regexLast = generateRegexFocusOnLast(currentRow);

  const triggerBackspaceKeydown = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Backspace",
      bubbles: true,
      cancelable: true,
    });

    if (map) {
      for (const [key, node] of map.entries()) {
        if (
          (node && node.value.length === 0 && regexEmpty.test(key)) ||
          (node && node.value.length === 1 && regexLast.test(key))
        ) {
          node.focus();
          node.dispatchEvent(event);
          node.value = "";
          animatePopToggle(node, false);
          const { row, col } = getRowColFromKey(key);
          dispatch(setSingleLetterCell({ row, col, value: "" }));
          break; // Focus the first empty input and stop iterating
        }
      }
    }
  };

  const triggerEnterKeydown = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });

    if (map) {
      
      for (const [key, node] of map.entries()) {
        if (
          (node && node.value.length === 0 && regexEmpty.test(key)) ||
          (node && node.value.length === 1 && regexLast.test(key))
        ) {
          node.focus()
          node.dispatchEvent(event);
          break; // Focus the first empty input and stop iterating
        }
      }
    }
  };

  return (
    <button
      className={classes}
      onClick={
        bigKeyType === "Backspace"
          ? () => triggerBackspaceKeydown()
          : () => triggerEnterKeydown()
      }
    >
      {children}
    </button>
  );
}
