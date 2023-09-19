import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRow,
  setGameWinState,
  setPlayerGuesses,
  setSingleEmojiCell,
  setSingleLetterCell,
  setSingleLetterKeyboardStatus,
} from "../redux/slices/wordleSlice";
import { RootState } from "../redux/store";
import { animatePopToggle, animateShake, triggerInputChange } from "../utils";
import { Wordle } from "../utils/Wordle";
import { InputRefsType } from "../utils/types";

type InputProps = {
  row: number;
  col: number;
  inputRefs: InputRefsType;
};

export default function Input(props: InputProps) {
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
    if (map) {
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (map) {
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
          // console.log("pressed enter but accepted");

          let guessWord = "";

          Array.from({ length: 5 }, (_, index) => {
            const item = map.get(`cell-${currentRow}-${index}`);
            guessWord += item.value;
          });

          const isWordValid = Wordle.checkWordValidity(guessWord);

          if (!isWordValid) {
            const item = map.get(`cell-${currentRow}-0`);
            animateShake(item);
            e.preventDefault();
            return;
          }

          Array.from({ length: 5 }, (_, index) => {
            const item = map.get(`cell-${currentRow}-${index}`);

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

          const gameWinState = Wordle.getGuessWordResult(
            guessWord,
            correctWord
          );

          if (gameWinState === "WIN") {
            dispatch(setGameWinState(gameWinState));
          } else if (gameWinState === "LOSE" && currentRow === 5) {
            dispatch(setGameWinState(gameWinState));
          }

          dispatch(setPlayerGuesses(guessWord.toUpperCase()));
          dispatch(setCurrentRow(currentRow + 1));
        } else {
          const item = map.get(`cell-${currentRow}-0`);
          animateShake(item);
          e.preventDefault();
          console.log("pressed enter but rejected");
          return;
        }
      } else if (
        !e.key.match(allowedKeys) &&
        e.key !== "Backspace" &&
        e.key !== "Enter"
      ) {
        console.log("prevented");
        e.preventDefault();
      }
    }
  };

  return (
    <input
      value={letter}
      maxLength={1}
      className="h-[62.5px] w-[62px] border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent pointer-events-none"
      ref={(node) => {
        if (map && localRef) {
          if (node) {
            map.set(`cell-${row}-${col}`, node);
            localRef.current = node;
          } else {
            map.delete(`cell-${row}-${col}`);
          }
        }
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
    ></input>
  );
}
