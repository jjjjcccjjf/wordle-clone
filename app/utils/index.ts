export const triggerInputChange = (
  node: HTMLInputElement,
  inputValue: string
) => {
  const descriptor = Object.getOwnPropertyDescriptor(node, "value");

  node.value = `${inputValue}#`;
  if (descriptor && descriptor.configurable) {
    delete node.value;
  }
  node.value = inputValue;

  const e = document.createEvent("HTMLEvents");
  e.initEvent("change", true, false);
  node.dispatchEvent(e);

  if (descriptor) {
    Object.defineProperty(node, "value", descriptor);
  }
};

export const resetCellColor = (node: HTMLInputElement) => {
  node.classList.add("bg-transparent");
  node.classList.add("border-2");
  node.classList.add("border-white/20");
  node.classList.remove("border-white/40");
  node.classList.remove("animate-pop");
  node.classList.remove("animate-flip-0");
  node.classList.remove("animate-flip-1");
  node.classList.remove("animate-flip-2");
  node.classList.remove("animate-flip-3");
  node.classList.remove("animate-flip-4");

  node.classList.remove("bg-perfect", "bg-miss", "bg-hit");
};

export function animatePopToggle(node: HTMLInputElement, toggleOn = true) {
  if (toggleOn) {
    node.classList.add("border-white/40");
    node.classList.add("animate-pop");
    node.classList.remove("border-white/20");
  } else {
    node.classList.remove("border-white/40");
    node.classList.remove("animate-pop");
    node.classList.add("border-white/20");
  }
}

export function animateShake(item: any) {
  item.parentNode.classList.add("animate-shake");

  setTimeout(() => {
    item.parentNode.classList.remove("animate-shake");
  }, 400);
}

export const generateRegexFocusOnEmpty = (row: number) =>
  new RegExp(`^cell-${row}-[0-4]$`);

export const generateRegexFocusOnLast = (row: number) =>
  new RegExp(`^cell-${row}-4$`);

export const getRowColFromKey = (key: string) => {
  const row = Number(key.substring(5, 6)); // optimize this later
  const col = Number(key.substring(7, 8));

  return { row, col };
};
