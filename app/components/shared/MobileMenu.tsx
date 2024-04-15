import { CgMenuGridO, CgClose } from "react-icons/cg";
import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareSnapchat,
  FaSquareInstagram,
} from "react-icons/fa6";
// import { FaFacebookSquare } from "react-icons/fa";
import Button from "../ui/Button";
import { navLinks } from "@/app/constants";
import Link from "next/link";
import Route from "../ui/Route";
import { useState } from "react";
import useMenuActive from "@/app/hooks/useMenuActive";
import Logo from "../ui/Logo";

type Props = {};

export default function MobileMenu({}: Props) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
  return (
    <>
      <div className="md:hidden" onClick={mobileMenuHandler}>
        {openMobileMenu ? <CgClose size={25} /> : <CgMenuGridO size={25} />}
      </div>

      {openMobileMenu ? (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white z-[999] px-5 border-r overflow-hidden flex flex-col gap-10"
          >
            <div className="border-b py-5 ">
              <Logo />
              <div className="flex gap-5 text-secondary flex-1 justify-center text-xl mt-5">
                <FaSquareFacebook />
                <FaSquareInstagram />
                <FaSquareXTwitter />
                <FaSquareSnapchat />
              </div>
            </div>
            <ul className="flex items-center justify-center gap-10 flex-col mt-5 flex-1 py-5 border-b">
              {navLinks.map((link, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const isActive = useMenuActive(link.route);
                return (
                  <li key={index}>
                    <Route
                      route={link.route}
                      label={link.label}
                      isActive={isActive}
                    />
                  </li>
                );
              })}
            </ul>

            {/* <div className="flex gap-5 flex-1 flex-col py-5">
              <Button text="Log In" onClick={() => null} aria="Log in button" />

              <Button
                text="Sign Up"
                onClick={() => null}
                aria="Sign up button"
              />
            </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
