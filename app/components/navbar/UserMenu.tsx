"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItems";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface USerMenuProps {}

function UserMenu() {
  const registerModal = userRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-black-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <FaUser size={20} color="black" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
       absolute
       rounded-xl
       shadow-md
       w-[260px] md:w-[320px]  
       bg-white
       overflow-hidden
       right-0
       top-12
       text-sm
     "
        >
          <div className="flex flex-col cursor-pointer w-full text-black">
            <>
              <MenuItems onClick={loginModal.onOpen} label="Login" />
              <MenuItems onClick={registerModal.onOpen} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
