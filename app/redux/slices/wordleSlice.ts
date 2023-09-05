import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameWinStateType, KeyboardStatusType } from "@/app/utils/types";

type WordleState = {
  playerGuesses: Array<string>;
  currentRow: number;
  testWord: string;
  correctWord: string;
  gameWinState: GameWinStateType;
  keyboardStatus: KeyboardStatusType;
};

// Define the initial state using that type
const initialState: WordleState = {
  playerGuesses: [],
  currentRow: 0,
  testWord: "THROE",
  correctWord: "GNASH",
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
    setSingleLetterKeyboardStatus: (
      state,
      action: PayloadAction<{ key: string; className: string }>
    ) => {
      //fixthis
      const { key, className } = action.payload;
      const currStatus = state.keyboardStatus[key]
      if (className === 'bg-hit' && currStatus === 'bg-perfect') {
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
} = wordleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer;
