import React, { ReactNode } from "react";
import Key from "./Key";

export default function VirtualKeyboard() {
  return (
    <>
      <div className="flex flex-col gap-[6px] items-center justify-center">
        <VirtualKeyboardRow>
          <Key>Q</Key>
          <Key>W</Key>
          <Key>E</Key>
          <Key>R</Key>
          <Key>T</Key>
          <Key>Y</Key>
          <Key>U</Key>
          <Key>I</Key>
          <Key>O</Key>
          <Key>P</Key>
        </VirtualKeyboardRow>
        <VirtualKeyboardRow>
          <Key>A</Key>
          <Key>S</Key>
          <Key>D</Key>
          <Key>F</Key>
          <Key>G</Key>
          <Key>H</Key>
          <Key>J</Key>
          <Key>K</Key>
          <Key>L</Key>
        </VirtualKeyboardRow>
        <VirtualKeyboardRow>
          <Key bigKey>ENTER</Key>
          <Key>Z</Key>
          <Key>X</Key>
          <Key>C</Key>
          <Key>V</Key>
          <Key>B</Key>
          <Key>N</Key>
          <Key>M</Key>
          <Key bigKey>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              data-testid="icon-backspace"
            >
              <path
                fill="white"
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
              ></path>
            </svg>
          </Key>
        </VirtualKeyboardRow>
      </div>
    </>
  );
}

function VirtualKeyboardRow({ children }: { children: ReactNode }) {
  return <div className="flex gap-[6px]">{children}</div>;
}
