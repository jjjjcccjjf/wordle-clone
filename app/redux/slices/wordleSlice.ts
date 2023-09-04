import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameWinStateType } from "@/app/utils/types";

type WordleState = {
  playerGuesses: Array<string>;
  currentRow: number;
  testWord: string;
  correctWord: string;
  gameWinState: GameWinStateType;
};

// Define the initial state using that type
const initialState: WordleState = {
  playerGuesses: [],
  currentRow: 0,
  testWord: "THROE",
  correctWord: "THROE",
  gameWinState: null,
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
  },
});

export const { setCurrentRow, setPlayerGuesses, setGameWinState } = wordleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer;
