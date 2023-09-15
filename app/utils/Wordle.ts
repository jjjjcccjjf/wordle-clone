import { GameWinStateType, LetterStatus } from "./types";
import fiveLetterWordList from "@/app/utils/words.json";
import validWordList from "@/app/utils/validWords.json";

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
      default:
        return missColor;
    }
  }

  static getEmojiByLetterStatus(status: LetterStatus): string {
    const missEmoji = "⬛️";
    const hitEmoji = "🟨";
    const perfectEmoji = "🟩";

    switch (status) {
      case "PERFECT":
        return perfectEmoji;
      case "HIT":
        return hitEmoji;
      case "MISS":
      default:
        return missEmoji;
    }
  }

  static getGuessWordResult(
    guessWord: string,
    correctWord: string
  ): GameWinStateType {
    const capsGuessWord = guessWord.toUpperCase();
    const capsCorrectWord = correctWord.toUpperCase();

    return capsCorrectWord === capsGuessWord ? "WIN" : "LOSE";
  }

  static getRandomFiveLetterWord(seed?: number) {
    let randomIndex = seed ?? this.getRandomSeed();

    return fiveLetterWordList[randomIndex];
  }

  static checkWordValidity(word: string) : boolean {
    return validWordList.includes(word.toUpperCase());
  }

  static getRandomSeed(): number {
    return Math.floor(Math.random() * fiveLetterWordList.length);
  }
}
