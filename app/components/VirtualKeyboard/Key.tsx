import React, { ReactNode } from "react";
import clsx from "clsx";
import "@fontsource/roboto";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Wordle } from "@/app/utils/Wordle";
import { LetterStatus } from "@/app/utils/types";

type KeyProps = {
  bigKey?: boolean;
  children: ReactNode;
};

export default function Key({ bigKey, children }: KeyProps) {

  const correctWord = useSelector((state: RootState) => state.wordle.correctWord)

  

  const classes = clsx(
    "bg-key-default w-[43px] h-[58px] flex items-center justify-center font-bold font-[Roboto] rounded-md text-white text-xl",
    { "w-[65.41px] h-[58px] text-[12px] font-normal tracking-widest": bigKey }
  );
  return <button className={classes}>{children}</button>;
}
