"use client";

import { forwardRef, useEffect, useRef } from "react";

import "@fontsource/roboto";

const Input = forwardRef(function Input(props, ref) {
  const { row, col, inputRefs } = props;
  const map = inputRefs.current;
  return (
    <input
      maxLength={1}
      className="h-14 w-14 border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent"
      ref={(node) => {
        if (node) {
          map.set(`cell-${row}-${col}`, node);
        } else {
          map.delete(`cell-${row}-${col}`);
        }
      }}
      onChange={() => {
        const nextCell = map.get(`cell-${row}-${col + 1}`);
        if (nextCell) {
          nextCell.focus();
        }
      }}
      onKeyDown={(e) => {
        const thisCell = map.get(`cell-${row}-${col}`);
        const prevCell = map.get(`cell-${row}-${col - 1}`);
        
        if (e.key === "Backspace" && thisCell.value === "" && prevCell) {
          prevCell.focus();
          prevCell.value = "";
        }
      }}
    ></input>
  );
});

function RowInput(props) {
  const { inputRefs, row } = props;
  return (
    <>
      <div className="flex flex-row gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Input key={index} inputRefs={inputRefs} col={index} row={row} />
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const inputRefs = useRef(new Map());
  const activeRow = 0;

  const handleClick = () => {
    const map = inputRefs.current;
    if (map) {
      for (const [key, node] of map.entries()) {
        if (node && node.value.length === 0) {
          node.focus();
          break; // Focus the first empty input and stop iterating
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <main className="h-screen w-screen bg-black/90 flex items-center justify-center">
        <section className="grid gap-1">
          {Array.from({ length: 6 }, (_, index) => (
            <RowInput key={index} inputRefs={inputRefs} row={index} />
          ))}
        </section>
      </main>
    </>
  );
}
