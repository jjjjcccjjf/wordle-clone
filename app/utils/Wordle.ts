import { GameWinStateType, LetterStatus } from "./types";


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
    const missColor = "bg-[#3a3a3c]";
    const hitColor = "bg-[#b59f3b]";
    const perfectColor = "bg-[#538d4e]";

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
}
