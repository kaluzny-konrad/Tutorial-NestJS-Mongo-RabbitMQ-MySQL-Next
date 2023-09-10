"use client";

import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";

import { Session } from "next-auth";
import { useState } from "react";
import MyNavbarUserMenu from "./MyNavbarUserMenu";
import AuthModal from "../Auth/AuthModal";

type Props = {
  session: Session | null;
};

export default function MyNavbar({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent as="div" className="items-center" justify="end">
        {session?.user ? (
          <MyNavbarUserMenu session={session} />
        ) : (
          <>
            <AuthModal initType="sign-in" />
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
