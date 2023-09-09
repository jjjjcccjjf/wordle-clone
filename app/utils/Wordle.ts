import { GameWinStateType, LetterStatus } from "./types";
import fiveLetterWordList from '@/app/utils/words.json'

export class Wordle {
  static getCorrectLetterStatus(
    guessLetter: string,
    index: number,
    correctWord: string
  ): LetterStatus {
    const capsGuessLetter = guessLetter.toUpperCase();
    const capsCorrectWord = correctWord.toUpperCase();

    let status: "PERFECT" | "HIT" | "MISS" | null = null;

    if (capsGuessLetter === capsCorrectWord[index]) {
      status = "PERFECT";
    } else if (capsCorrectWord.indexOf(capsGuessLetter) > -1) {
      status = "HIT";
    } else {
      status = "MISS";
    }

    return status;
  }

  static getColorByLetterStatus(status: LetterStatus): string {
    const missColor = "bg-miss";
    const hitColor = "bg-hit";
    const perfectColor = "bg-perfect";

    switch (status) {
      case "PERFECT":
        return perfectColor;
      case "HIT":
        return hitColor;
      case "MISS":
        return missColor;
    }
  }

  static getGuessWordResult(guessWord:string, correctWord:string): GameWinStateType {
    const capsGuessWord = guessWord.toUpperCase();
    const capsCorrectWord = correctWord.toUpperCase();

    return capsCorrectWord === capsGuessWord ? "WIN": "LOSE";
  }

  static getRandomFiveLetterWord() {
    const randomIndex = Math.floor(Math.random() * fiveLetterWordList.length);
    return fiveLetterWordList[randomIndex];
  }
}
