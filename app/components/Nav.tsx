import "@fontsource/patua-one";
import "@fontsource/roboto";
import { ReactNode } from "react";

type NavProps = {
  children: ReactNode;
};

export default function Nav({ children }: NavProps) {
  return (
    <nav className="md:h-[66px] h-[41px] fixed top-0 left-0 w-full grid items-center border-b border-b-[#3a3a3c] bg-[#121213]">
      <ul className="grid grid-flow-col grid-cols-3  items-center">
        <li className="px-8"></li>
        <li className="md:place-self-center place-self-end flex items-center justify-center md:flex-col flex-row md:gap-0">
          <p className="font-['Patua_One']  text-white md:text-4xl text-2xl">Wordle</p>
          <p className="text-white font-[Roboto] text-[0.70rem] tracking-wider w-32  pl-3">
            clone by endan
          </p>
        </li>
        <li className="self-center place-self-end px-2 md:px-8">{children}</li>
      </ul>
    </nav>
  );
}
