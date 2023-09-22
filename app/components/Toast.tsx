import React, { useEffect } from "react";
import "@fontsource/roboto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import clsx from "clsx";
import { resetToast } from "../redux/slices/wordleSlice";

export default function Toast() {
  const toast = useSelector((state: RootState) => state.wordle.toast);
  const dispatch = useDispatch();

  const classes = clsx(
    "fixed top-16 w-full pointer-events-none items-center justify-center gap-4 flex-col",
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
        className="bg-white font-[Roboto] p-3 font-bold text-sm rounded-md"
      >
        {toast.message}
      </p>
    </div>
  );
}
