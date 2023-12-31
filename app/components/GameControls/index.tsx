import { resetState, setToast } from "@/app/redux/slices/wordleSlice";
import { RootState } from "@/app/redux/store";
import { resetCellColor } from "@/app/utils";
import { BsShare } from "react-icons/bs";
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
    <aside className="flex gap-4 items-center justify-center">
      {tryAgain && <TryAgainButton map={map} />}
      {shareButton && <ShareButton />}
    </aside>
  );
}

export function TryAgainButton({ map }: { map: Map<any, any> }) {
  const dispatch = useDispatch();

  const handleTryAgainClick = () => {
    dispatch(resetState());
    map.forEach((value, key) => {
      resetCellColor(value);
    });
  };
  return (
    <button
      className="md:h-9 h-7 md:py-4 lg:px-8 md:px-4 px-3 rounded-full flex items-center justify-center border border-white text-white text-sm tracking-wide"
      onClick={handleTryAgainClick}
    >
      <span className="md:block hidden">Reset & Get New Word</span>
      <span className="md:hidden block">Reset</span>
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

    resultString += "\n\nhttps://wordle-clone-endan.vercel.app/";

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
      className="md:h-9 h-7 bg-[#538d4e] text-white text-sm md:py-4 lg:px-8 md:px-4 px-3 rounded-full flex items-center justify-center font-bold gap-3 tracking-wide"
      onClick={handleShareClick}
    >
      Share <BsShare />
    </button>
  );
}
