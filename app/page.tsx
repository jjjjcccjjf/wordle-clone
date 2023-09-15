"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import {
  setCurrentRow,
  setPlayerGuesses,
  setGameWinState,
  setSingleLetterKeyboardStatus,
  resetState,
  setSingleLetterCell,
  setSingleEmojiCell,
} from "./redux/slices/wordleSlice";
import "@fontsource/roboto";
import { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Wordle } from "./utils/Wordle";
import VirtualKeyboard from "./components/VirtualKeyboard";
import GameControls from "./components/GameControls";
import clsx from "clsx";
import { resetCellColor, triggerInputChange, animatePopToggle } from "./utils";

type InputProps = {
  row: number;
  col: number;
  inputRefs: Map<any, any>;
};

function Input(props: InputProps) {
  const { row, col, inputRefs } = props;
  const playerGuesses = useSelector(
    (state: RootState) => state.wordle.playerGuesses
  );
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const correctWord = useSelector(
    (state: RootState) => state.wordle.correctWord
  );

  let localRef = useRef();

  // const [letter, setLetter] = useState("");
  const letterCells = useSelector(
    (state: RootState) => state.wordle.letterCells
  );
  const letter = letterCells[row][col];
  const dispatch = useDispatch();
  const map = inputRefs.current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextCell = map.get(`cell-${row}-${col + 1}`);
    const thisCell = map.get(`cell-${row}-${col}`);
    if (e.target.value.length > 0) {
      animatePopToggle(thisCell);
    } else {
      animatePopToggle(thisCell, false);
    }
    // setLetter(e.target.value);
    const value = e.target.value.toUpperCase();
    dispatch(setSingleLetterCell({ row, col, value }));

    if (nextCell) {
      nextCell.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisCell = map.get(`cell-${row}-${col}`);
    const prevCell = map.get(`cell-${row}-${col - 1}`);
    const allowedKeys = /^[A-Za-z]$/;

    if (e.key === "Backspace" && thisCell.value === "" && prevCell) {
      animatePopToggle(prevCell, false);
      // prevCell.value = "";
      triggerInputChange(prevCell, "");
      prevCell.focus();
    } else if (e.key === "Enter") {
      if (thisCell.value !== "" && col === 4) {
        console.log("pressed enter but accepted");

        let guessWord = "";

        Array.from({ length: 5 }, (_, index) => {
          const item = map.get(`cell-${currentRow}-${index}`);
          guessWord += item.value;
        });

        const isWordValid = Wordle.checkWordValidity(guessWord)

        if(!isWordValid) {
          const item = map.get(`cell-${currentRow}-0`);
          item.parentNode.classList.add('animate-shake')
          
          setTimeout(()=> {
            item.parentNode.classList.remove('animate-shake')
          }, 400)

          console.log(isWordValid)
          // animateInvalidWord()
          e.preventDefault()
          return;
        }

        Array.from({ length: 5 }, (_, index) => {
          const item = map.get(`cell-${currentRow}-${index}`);
          guessWord += item.value;

          item.classList.add(`animate-flip-${index}`);
          const status = Wordle.getCorrectLetterStatus(
            item.value,
            index,
            correctWord
          );
          const color = Wordle.getColorByLetterStatus(status);
          const emoji = Wordle.getEmojiByLetterStatus(status);

          dispatch(
            setSingleEmojiCell({
              row,
              col: index,
              value: emoji,
            })
          );

          setTimeout(() => {
            item.classList.remove("bg-transparent");
            item.classList.remove("border-2");

            item.classList.add(color);
          }, index * 400 + 200);

          // add condition for double letters ??? if u kno u kno

          setTimeout(() => {
            dispatch(
              setSingleLetterKeyboardStatus({
                key: item.value.toUpperCase(),
                className: color,
              })
            ); // FIX THIS LATER. SHOULD UPPERCASE ALWAYS
          }, 4 * 400 + 400);
        });
        
        const gameWinState = Wordle.getGuessWordResult(guessWord, correctWord);

        if (gameWinState === "WIN") {
          dispatch(setGameWinState(gameWinState));
        } else if (gameWinState === "LOSE" && currentRow === 5) {
          dispatch(setGameWinState(gameWinState));
        }

        dispatch(setPlayerGuesses(guessWord.toUpperCase()));
        dispatch(setCurrentRow(currentRow + 1));
      } else {
        console.log(playerGuesses);
        console.log("pressed enter but rejected");
      }
    } else if (
      !e.key.match(allowedKeys) &&
      e.key !== "Backspace" &&
      e.key !== "Enter"
    ) {
      console.log("prevented");
      e.preventDefault();
    }
  };

  return (
    <input
      value={letter}
      maxLength={1}
      className="h-[62.5px] w-[62px] border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent pointer-events-none"
      ref={(node) => {
        if (node) {
          map.set(`cell-${row}-${col}`, node);
          localRef.current = node;
        } else {
          map.delete(`cell-${row}-${col}`);
        }
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
    ></input>
  );
}

////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////

function RowInput(props) {
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

////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////

function GameController({
  inputRefs,
}: {
  inputRefs: React.RefObject<Map<any, any>>;
}) {
  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );

  const gameControllerRef = useRef(null);

  const classes = clsx(
    "h-screen w-screen top-0 left-0 bg-black/50 flex items-center justify-center z-20 hidden"
    // "WIN" === gameWinState && "absolute",
    // !gameWinState && "hidden"
  );

  useEffect(() => {
    if (gameWinState === "WIN") {
      setTimeout(() => {
        if (gameControllerRef && gameControllerRef.current) {
          const gameControllerNode = gameControllerRef.current;
          gameControllerNode.classList.add("absolute");
          gameControllerNode.classList.remove("hidden");
        }
      }, 4 * 400 + 400);
    } else {
      if (gameControllerRef && gameControllerRef.current) {
        const gameControllerNode = gameControllerRef.current;
        gameControllerNode.classList.remove("absolute");
        gameControllerNode.classList.add("hidden");
      }
    }
  }, [gameWinState]);

  return (
    <>
      <aside className={classes} ref={gameControllerRef}>
        <div className="w-1/2  h-60  bg-[#121213] rounded-xl border border-white/5 font-[Roboto] flex items-center justify-center flex-col gap-8">
          <p className="text-4xl text-white font-bold">YOU WIN</p>
          <div className="">
            <GameControls inputRefs={inputRefs} tryAgain shareButton/>
          </div>
        </div>
      </aside>
    </>
  );
}

////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////

export default function Home() {
  const inputRefs = useRef(new Map());
  const mainRef = useRef();
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );
  const map = inputRefs.current;

  const generateRegexFocusOnEmpty = (row: number) =>
    new RegExp(`^cell-${row}-[0-4]$`);
  const generateRegexFocusOnLast = (row: number) =>
    new RegExp(`^cell-${row}-4$`);

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
      <main
        className="h-screen w-screen bg-black/90 flex flex-col items-center justify-center gap-10 "
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
      <aside className="absolute top-7 right-7">
        <GameControls inputRefs={inputRefs} tryAgain/>
      </aside>
    </>
  );
}
