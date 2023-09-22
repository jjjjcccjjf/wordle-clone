import { resetState, setToast } from "@/app/redux/slices/wordleSlice";
import { RootState } from "@/app/redux/store";
import { resetCellColor } from "@/app/utils";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

type GameControlsProps = {
  inputRefs: any; // fix this later
  tryAgain?: boolean;
  shareButton?: boolean;
};

export default function GameControls({
  inputRefs,
  tryAgain,
  shareButton,
}: GameControlsProps) {
  const map = inputRefs.current;

  return (
    <aside className="flex gap-4">
      {tryAgain && <TryAgainButton map={map} />}
      {shareButton && <ShareButton />}
    </aside>
  );
}

export function TryAgainButton({ map }) {
  const dispatch = useDispatch();

  const handleTryAgainClick = () => {
    dispatch(resetState());
    map.forEach((value, key) => {
      resetCellColor(value);
    });
  };
  return (
    <button
      className="h-9 bg-[wheat] p-4 rounded-full flex items-center justify-center"
      onClick={handleTryAgainClick}
    >
      Reset & Get New Word
    </button>
  );
}

export function ShareButton() {
  const emojiCells = useSelector((state: RootState) => state.wordle.emojiCells);
  const randomSeed = useSelector((state: RootState) => state.wordle.randomSeed);
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);
  const dispatch = useDispatch();

  const handleShareClick = () => {
    let resultString = `Wordle Clone by endan: Seed #${randomSeed} ${currentRow}/6 \n\n`;

    for (let i = 0; i < emojiCells.length; i++) {
      const row = emojiCells[i];

      // Concatenate each item in the row
      const rowString = row.join("");

      // Append the row to the result string
      resultString += rowString;

      // Add a newline character after each row (except the last one)
      if (i < emojiCells.length - 1) {
        resultString += "\n";
      }

      dispatch(
        setToast({ message: "Copied to clipboard!", additionalClass: "flex" })
      );
    }

    resultString = resultString.trim();
    // console.log(resultString)

    navigator.clipboard
      .writeText(resultString)
      .then(() => {
        console.log("Text copied to clipboard successfully");
      })
      .catch((error) => {
        console.error("Unable to copy text to clipboard:", error);
      });
  };

  return (
    <button
      className="h-9 bg-[wheat] p-4 rounded-full flex items-center justify-center"
      onClick={handleShareClick}
    >
      Share
    </button>
  );
}
