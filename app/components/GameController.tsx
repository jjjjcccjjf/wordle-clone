import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
        <div className="w-1/2  h-60  bg-[#121213] rounded-xl border border-white/5 font-[Roboto] flex items-center justify-center flex-col gap-8">
          <p className="text-4xl text-white font-bold">YOU WIN</p>
          <div className="">
            <GameControls inputRefs={inputRefs} tryAgain shareButton />
          </div>
        </div>
      </aside>
    </>
  );
}
