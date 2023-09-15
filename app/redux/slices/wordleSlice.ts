import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameWinStateType, KeyboardStatusType } from "@/app/utils/types";
import fiveLetterWordList from '@/app/utils/words.json'
import { Wordle } from "@/app/utils/Wordle";

type WordleState = {
  playerGuesses: Array<string>;
  currentRow: number;
  correctWord: string;
  gameWinState: GameWinStateType;
  keyboardStatus: KeyboardStatusType;
  letterCells: Array<Array<string>>;
  emojiCells: Array<Array<string>>;
  randomSeed: number;
};

// Define the initial state using that type
const randomSeed = Wordle.getRandomSeed()

const initialState: WordleState = {
  playerGuesses: [],
  currentRow: 0,
  correctWord: Wordle.getRandomFiveLetterWord(randomSeed),
  randomSeed: randomSeed,
  gameWinState: null,
  keyboardStatus: {
    Q: "",
    W: "",
    E: "",
    R: "",
    T: "",
    Y: "",
    U: "",
    I: "",
    O: "",
    P: "",
    A: "",
    S: "",
    D: "",
    F: "",
    G: "",
    H: "",
    J: "",
    K: "",
    L: "",
    Z: "",
    X: "",
    C: "",
    V: "",
    B: "",
    N: "",
    M: "",
  },
  letterCells: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  emojiCells: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
};


export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    setCurrentRow: (state, action: PayloadAction<number>) => {
      state.currentRow = action.payload;
    },
    setPlayerGuesses: (state, action: PayloadAction<string>) => {
      state.playerGuesses.push(action.payload);
    },
    setGameWinState: (state, action: PayloadAction<GameWinStateType>) => {
      state.gameWinState = action.payload;
    },
    setSingleLetterCell: (
      state,
      action: PayloadAction<{ row: number; col: number; value: string }>
    ) => {
      const { row, col, value } = action.payload;
      state.letterCells[row][col] = value;
    },
    setSingleEmojiCell: (
      state,
      action: PayloadAction<{ row: number; col: number; value: string }>
    ) => {
      const { row, col, value } = action.payload;
      state.emojiCells[row][col] = value;
    },
    resetState: (state) => {
      const newRandomSeed = Wordle.getRandomSeed()
      const newInitialState = {
        ...initialState,
        randomSeed: newRandomSeed,
        correctWord: Wordle.getRandomFiveLetterWord(newRandomSeed) // make this a util function
      }
      return newInitialState;
    },
    setSingleLetterKeyboardStatus: (
      state,
      action: PayloadAction<{ key: string; className: string }>
    ) => {
      //fixthis
      const { key, className } = action.payload;
      const currStatus = state.keyboardStatus[key];
      if (className === "bg-hit" && currStatus === "bg-perfect") {
      } else {
        state.keyboardStatus[key] = className;
      }
    },
  },
});

export const {
  setCurrentRow,
  setPlayerGuesses,
  setGameWinState,
  setSingleLetterKeyboardStatus,
  setSingleLetterCell,
  setSingleEmojiCell,
  resetState,
} = wordleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer;
