"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";

import { signOut } from "next-auth/react";

import { Session } from "next-auth";

type Props = {
  session: Session;
};

export default function MyNavbarUserMenu({ session }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="email"
          size="sm"
          alt="profile picture"
          src={session.user?.image!}
          fallback={
            <>
              <span className="sr-only">{session.user?.email}</span>
              <AvatarIcon />
            </>
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile">
          <p className="font-semibold w-[200px] truncate text-sm">{session.user?.email}</p>
        </DropdownItem>

        <DropdownItem key="settings">My Settings</DropdownItem>

        <DropdownItem
          key="logout"
          aria-label="logout"
          color="danger"
          onClick={(event) => {
            event.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
        >
          Wyloguj się
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
