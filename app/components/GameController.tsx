import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../redux/slices/wordleSlice";
import { RootState } from "../redux/store";
import GameControls from "./GameControls";

export default function GameController({
  inputRefs,
}: {
  inputRefs: React.RefObject<Map<any, any>>;
}) {
  const gameWinState = useSelector(
    (state: RootState) => state.wordle.gameWinState
  );
  const correctWord = useSelector(
    (state: RootState) => state.wordle.correctWord
  );
  const dispatch = useDispatch();

  const gameControllerRef = useRef(null);

  const classes = clsx(
    "h-screen w-screen top-0 left-0 bg-black/50 flex items-center justify-center z-20 hidden"
  );

  useEffect(() => {
    if (gameWinState === "WIN") {
      setTimeout(() => {
        if (gameControllerRef && gameControllerRef.current) {
          const gameControllerNode = gameControllerRef.current as HTMLElement;
          gameControllerNode.classList.add("absolute");
          gameControllerNode.classList.remove("hidden");
          dispatch(setToast({ message: "Splendid!", additionalClass: "flex" }));
        }
      }, 4 * 400 + 400);
    } else if (gameWinState === "LOSE") {
      setTimeout(() => {
        if (gameControllerRef && gameControllerRef.current) {
          dispatch(
            setToast({
              message: "Too bad! Correct answer: " + correctWord,
              additionalClass: "flex",
            })
          );
        }
      }, 4 * 400 + 400);
    } else {
      if (gameControllerRef && gameControllerRef.current) {
        const gameControllerNode = gameControllerRef.current as HTMLElement;
        gameControllerNode.classList.remove("absolute");
        gameControllerNode.classList.add("hidden");
      }
    }
  }, [gameWinState]);

  return (
    <>
      <aside className={classes} ref={gameControllerRef}>
        <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-60  bg-[#121213] md:rounded-xl border border-white/5 font-[Roboto] flex items-center justify-center flex-col gap-8">
          <p className="md:text-4xl text-3xl text-white font-bold">
            Nice one! 🎉
          </p>
          <div className="">
            <GameControls inputRefs={inputRefs} tryAgain shareButton />
          </div>
        </div>
      </aside>
    </>
  );
}
