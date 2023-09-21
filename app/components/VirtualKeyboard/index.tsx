import React, { ReactNode, RefObject } from "react";
import Key from "./Key";
import BigKey from "./BigKey";

type VirtualKeyboardProps = {
  inputRefs: RefObject<Map<any, any>>;
};

export default function VirtualKeyboard({ inputRefs }: VirtualKeyboardProps) {
  return (
    <>
      <div className="flex flex-col gap-[6px] items-center justify-center">
        <VirtualKeyboardRow>
          <Key inputRefs={inputRefs}>Q</Key>
          <Key inputRefs={inputRefs}>W</Key>
          <Key inputRefs={inputRefs}>E</Key>
          <Key inputRefs={inputRefs}>R</Key>
          <Key inputRefs={inputRefs}>T</Key>
          <Key inputRefs={inputRefs}>Y</Key>
          <Key inputRefs={inputRefs}>U</Key>
          <Key inputRefs={inputRefs}>I</Key>
          <Key inputRefs={inputRefs}>O</Key>
          <Key inputRefs={inputRefs}>P</Key>
        </VirtualKeyboardRow>
        <VirtualKeyboardRow>
          <Key inputRefs={inputRefs}>A</Key>
          <Key inputRefs={inputRefs}>S</Key>
          <Key inputRefs={inputRefs}>D</Key>
          <Key inputRefs={inputRefs}>F</Key>
          <Key inputRefs={inputRefs}>G</Key>
          <Key inputRefs={inputRefs}>H</Key>
          <Key inputRefs={inputRefs}>J</Key>
          <Key inputRefs={inputRefs}>K</Key>
          <Key inputRefs={inputRefs}>L</Key>
        </VirtualKeyboardRow>
        <VirtualKeyboardRow>
          <BigKey bigKeyType="Enter" inputRefs={inputRefs}>ENTER</BigKey>
          <Key inputRefs={inputRefs}>Z</Key>
          <Key inputRefs={inputRefs}>X</Key>
          <Key inputRefs={inputRefs}>C</Key>
          <Key inputRefs={inputRefs}>V</Key>
          <Key inputRefs={inputRefs}>B</Key>
          <Key inputRefs={inputRefs}>N</Key>
          <Key inputRefs={inputRefs}>M</Key>
          <BigKey bigKeyType="Backspace" inputRefs={inputRefs}>
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
          </BigKey>
        </VirtualKeyboardRow>
      </div>
    </>
  );
}

function VirtualKeyboardRow({ children }: { children: ReactNode }) {
  return <div className="flex gap-[6px]">{children}</div>;
}
