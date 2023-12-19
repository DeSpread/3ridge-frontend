import Logo from "./logo";
import Nav from "./nav";

export default function Header() {
  return (
    <nav className="flex h-16 items-center justify-between border-0 border-b border-solid border-b-neutral-700 bg-neutral-900 pl-4 pr-6">
      <Logo />
      <Nav />
    </nav>
  );
}
