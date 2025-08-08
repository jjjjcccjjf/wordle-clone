"use client";

import { useEffect, useRef } from "react";

import "@fontsource/roboto";
import { useSelector } from "react-redux";
import GameController from "./components/GameController";
import GameControls from "./components/GameControls";
import Nav from "./components/Nav";
import RowInput from "./components/RowInput";
import Toast from "./components/Toast";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { RootState } from "./redux/store";
import { generateRegexFocusOnEmpty, generateRegexFocusOnLast } from "./utils";

export default function Home() {
  const inputRefs = useRef(new Map<any, any>());
  const mainRef = useRef<HTMLElement | null>(null);
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );
  const map = inputRefs.current;

  const handleClick = () => {
    const regexEmpty = generateRegexFocusOnEmpty(currentRow);
    const regexLast = generateRegexFocusOnLast(currentRow);

    if (map && !gameWinState) {
      for (const [key, node] of map.entries()) {
        if (
          (node && node.value.length === 0 && regexEmpty.test(key)) ||
          (node && node.value.length === 1 && regexLast.test(key))
        ) {
          node.focus();
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (mainRef && mainRef.current) {
      const mainRefCurrent = mainRef.current;
      mainRefCurrent.addEventListener("click", handleClick);

      return () => {
        mainRefCurrent.removeEventListener("click", handleClick);
      };
    }
  }, [currentRow]);

  useEffect(() => {
    const firstRowNode = map.get(`cell-${currentRow}-0`);
    if (firstRowNode && !gameWinState) {
      firstRowNode.focus();
    }
  }, [currentRow]);

  return (
    <>
      <Nav>
        <GameControls inputRefs={inputRefs} tryAgain />
      </Nav>
      <main
        className="h-dvh w-dvh bg-wordle-bg flex flex-col items-center justify-center md:gap-10 gap-2 "
        ref={mainRef}
      >
        <section className="grid gap-[5px] mt-[38px] md:mt-0">
          {Array.from({ length: 6 }, (_, index) => (
            <RowInput key={index} inputRefs={inputRefs} row={index} />
          ))}
        </section>
        <VirtualKeyboard inputRefs={inputRefs} />
      </main>
      <GameController inputRefs={inputRefs} />
      <Toast />
    </>
  );
}
