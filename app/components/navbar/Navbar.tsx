"use client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-5
        border-b-[1px]"
      >
        <Container>
          <div
            className="
        flex
        flex-row
        items-center
        justify-between
        gap-3
        md:gap-0
        "
          >
            <Logo />

            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
