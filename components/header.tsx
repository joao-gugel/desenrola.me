import { ModeToggle } from "./mode-toggle";
import { HeaderLink } from "./header-link";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between py-5 bg-[#fffefb] dark:bg-[#000000]">
      <nav className="text-zinc-500 flex gap-3 md:gap-5 text-base md:text-base">
        <HeaderLink href="/">Príncipal</HeaderLink>
        <HeaderLink href="/recentes">Recentes</HeaderLink>
        <HeaderLink href="/favoritos">Favoritos</HeaderLink>
      </nav>
      <ModeToggle />
    </header>
  );
}
