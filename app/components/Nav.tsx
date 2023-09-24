import React, { ReactNode } from "react";
import "@fontsource/roboto";
import "@fontsource/ibm-plex-serif";
import "@fontsource/patua-one";
import "@fontsource-variable/noto-serif";

type NavProps = {
  children: ReactNode;
};

export default function Nav({ children }: NavProps) {
  return (
    <nav className="h-[66px] fixed top-0 left-0 w-full grid items-center border-b border-b-[#3a3a3c] bg-[#121213]">
      <ul className="grid grid-flow-col grid-cols-3  items-center">
        <li className="px-8"></li>
        <li className="place-self-center flex items-center justify-center flex-col ">
          <p className="font-['Patua_One']  text-white text-4xl">Wordle</p>
          <p className="text-white font-[Roboto] text-[0.70rem] tracking-wider">clone by endan</p>
        </li>
        <li className="self-center place-self-end px-2 md:px-8">{children}</li>
      </ul>
    </nav>
  );
}
