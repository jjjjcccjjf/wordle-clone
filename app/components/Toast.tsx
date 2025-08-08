import "@fontsource/roboto";
import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "../redux/slices/wordleSlice";
import { RootState } from "../redux/store";

export default function Toast() {
  const toast = useSelector((state: RootState) => state.wordle.toast);
  const dispatch = useDispatch();

  const classes = clsx(
    "fixed top-16 w-full pointer-events-none items-center justify-center gap-4 flex-col z-20",
    toast.additionalClass
  );

  useEffect(() => {
    if (toast.additionalClass === "flex") {
      setTimeout(() => {
        dispatch(resetToast());
      }, 2000);
    }
  }, [toast.additionalClass]);

  return (
    <div className={classes}>
      <p
        role="alert"
        className="bg-white font-roboto p-3 font-bold text-sm rounded-md"
      >
        {toast.message}
      </p>
    </div>
  );
}
