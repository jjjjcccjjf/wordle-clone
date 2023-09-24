"use client";

import { useEffect, useRef } from "react";

import "@fontsource/roboto";
import { useSelector } from "react-redux";
import GameController from "./components/GameController";
import GameControls from "./components/GameControls";
import RowInput from "./components/RowInput";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { RootState } from "./redux/store";
import { generateRegexFocusOnEmpty, generateRegexFocusOnLast } from "./utils";
import Toast from "./components/Toast";
import Nav from "./components/Nav";

export default function Home() {
  const inputRefs = useRef(new Map());
  const mainRef = useRef();
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );
  const map = inputRefs.current;

  const handleClick = () => {
    const regexEmpty = generateRegexFocusOnEmpty(currentRow);
    const regexLast = generateRegexFocusOnLast(currentRow);
    // console.log(regexEmpty, regexLast);

    if (map && !gameWinState) {
      for (const [key, node] of map.entries()) {
        if (
          (node && node.value.length === 0 && regexEmpty.test(key)) ||
          (node && node.value.length === 1 && regexLast.test(key))
        ) {
          node.focus();
          break; // Focus the first empty input and stop iterating
        }
      }
    }
  };

  useEffect(() => {
    mainRef.current.addEventListener("click", handleClick);

    return () => {
      mainRef.current.removeEventListener("click", handleClick);
    };
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
        className="h-screen w-screen bg-[#121213] flex flex-col items-center justify-center gap-10 "
        ref={mainRef}
      >
        <section className="grid gap-[5px]">
          {Array.from({ length: 6 }, (_, index) => (
            <RowInput key={index} inputRefs={inputRefs} row={index} />
          ))}
        </section>
        <VirtualKeyboard inputRefs={inputRefs} />
      </main>
      <GameController inputRefs={inputRefs} />
      <aside className="absolute top-7 right-7"></aside>
      <Toast />
    </>
  );
}
