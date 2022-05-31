import { For } from "solid-js";
import { useLocalStorage } from "~/hooks/useLocalStorage";

const sentences = ["Developer / Master", "I like making interesting projects."];

const colorIcons = {
  auto: "i-carbon-window-auto",
  light: "i-carbon-sun",
  dark: "i-carbon-moon",
};

type ColorMode = "auto" | "light" | "dark";

export const Title = () => {
  const [color, setColor] = useLocalStorage<ColorMode>("color-scheme", "auto");

  const switchColor = () => {
    const colors = Object.keys(colorIcons);
    const index = colors.indexOf(color());
    const nextColor = colors[(index + 1) % colors.length] as ColorMode;
    setColor(nextColor);
    setClass(nextColor);
  };

  const setClass = (color: string) => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (color === "dark" || (prefersDark && color !== "light"))
      document.documentElement.classList.toggle("dark", true);
    else {
      document.documentElement.classList.toggle("dark", false);
    }
  };

  return (
    <div>
      <div display="flex">
        <div text="4xl" font="bold">
          Hello,
        </div>
        <div
          text="2xl"
          class={colorIcons[color()]}
          cursor="pointer"
          opacity="80"
          hover="opacity-100"
          onClick={switchColor}
        ></div>
      </div>

      <div text="4xl" p="y-1" font="bold">
        I'm Noah Hsu.
      </div>
      <For each={sentences}>{(item) => <p text="md">{item}</p>}</For>
    </div>
  );
};