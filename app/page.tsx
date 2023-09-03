"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { setCurrentRow, setPlayerGuesses } from "./redux/slices/wordleSlice";
import "@fontsource/roboto";
import { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";

const Input = forwardRef(function Input(props, ref) {
  const playerGuesses = useSelector(
    (state: RootState) => state.wordle.playerGuesses
  );
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  let localRef = useRef();

  const [letter, setLetter] = useState("");
  const dispatch = useDispatch();
  const { row, col, inputRefs } = props;
  const map = inputRefs.current;

  function animatePopToggle(node, toggleOn = true) {
    if (toggleOn) {
      node.classList.add("border-white/40");
      node.classList.add("animate-pop");
      node.classList.remove("border-white/20");
    } else {
      node.classList.remove("border-white/40");
      node.classList.remove("animate-pop");
      node.classList.add("border-white/20");
    }
  }

  const handleChange = (e) => {
    const nextCell = map.get(`cell-${row}-${col + 1}`);
    const thisCell = map.get(`cell-${row}-${col}`);
    if (e.target.value.length > 0) {
      animatePopToggle(thisCell);
    } else {
      animatePopToggle(thisCell, false);
    }
    setLetter(e.target.value);
    if (nextCell) {
      nextCell.focus();
    }
  };

  const handleKeyDown = (e) => {
    const thisCell = map.get(`cell-${row}-${col}`);
    const prevCell = map.get(`cell-${row}-${col - 1}`);

    if (e.key === "Backspace" && thisCell.value === "" && prevCell) {
      animatePopToggle(prevCell, false);
      prevCell.focus();
      prevCell.value = "";
    } else if (e.key === "Enter") {
      if (thisCell.value !== "" && col === 4) {
        console.log("pressed enter but accepted");

        let guessWord = "";
        Array.from(
          { length: 5 },
          (_, index) =>
            (guessWord += map.get(`cell-${currentRow}-${index}`).value)
        );

        dispatch(setPlayerGuesses(guessWord));
        dispatch(setCurrentRow(currentRow + 1));
        // console.log(guessWord);
      } else {
        console.log(playerGuesses);
        console.log("pressed enter but rejected");
      }
    }
  };

  // useEffect(() => {
  //   if (letter.length > 0) {
  //     localRef.current.classList.add("border-white/40");
  //     localRef.current.classList.add("animate-pop");
  //     localRef.current.classList.remove("border-white/20");
  //   } else if (letter.length === 0) {
  //     localRef.current.classList.remove("border-white/40");
  //     localRef.current.classList.remove("animate-pop");
  //     localRef.current.classList.add("border-white/20");
  //   }
  // }, [letter]);

  return (
    <input
      value={letter}
      maxLength={1}
      className="h-14 w-14 border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent"
      ref={(node) => {
        if (node) {
          map.set(`cell-${row}-${col}`, node);
          localRef.current = node;
        } else {
          map.delete(`cell-${row}-${col}`);
        }
      }}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
    ></input>
  );
});

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
      <div className="flex flex-row gap-1">
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

export default function Home() {
  const inputRefs = useRef(new Map());
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const map = inputRefs.current;

  const generateRegexFocusOnEmpty = (row) => new RegExp(`^cell-${row}-[0-4]$`);
  const generateRegexFocusOnLast = (row) => new RegExp(`^cell-${row}-4$`);

  const handleClick = () => {
    const regexEmpty = generateRegexFocusOnEmpty(currentRow);
    const regexLast = generateRegexFocusOnLast(currentRow)
    console.log(regexEmpty, regexLast);
    
    if (map) {
      for (const [key, node] of map.entries()) {
        if ((node && node.value.length === 0 && regexEmpty.test(key)) || (node && node.value.length === 1 && regexLast.test(key))) {
          node.focus();
          break; // Focus the first empty input and stop iterating
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [currentRow]);

  useEffect(() => {
    const firstRowNode = map.get(`cell-${currentRow}-0`);
    firstRowNode.focus();
  }, [currentRow]);

  return (
    <>
      <main className="h-screen w-screen bg-black/90 flex items-center justify-center">
        <section className="grid gap-1">
          {Array.from({ length: 6 }, (_, index) => (
            <RowInput key={index} inputRefs={inputRefs} row={index} />
          ))}
        </section>
      </main>
    </>
  );
}
