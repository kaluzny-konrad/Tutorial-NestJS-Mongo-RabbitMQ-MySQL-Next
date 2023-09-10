"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import UserAuthForm from "./UserAuthForm";

import { TbUserCircle } from "react-icons/tb";

import { UserIcon } from "../icons/UserIcon";

type Props = {
  initType: "sign-in" | "sign-up";
};

export default function AuthModal({ initType }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState<"sign-in" | "sign-up">(initType);

  return (
    <>
      <Button onClick={onOpen} color="primary" variant="ghost" aria-label="Login" size="sm">
        Logowanie
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="pb-4">
          {(onClose) => (
            <>
              <ModalHeader className="">
                {type == "sign-in" ? "Logowanie" : "Rejestracja"}
              </ModalHeader>
              <ModalBody className="items-center">
                <p className="text-sm max-w-xs text-center">
                  Kontynuując zgadzasz się z Umową Użytkownika oraz Polityką
                  Prywatności.
                </p>

                <UserAuthForm />

                <p className="text-center text-sm">
                  {type == "sign-in" ? (
                    <>
                      Nie masz jeszcze konta?{" "}
                      <Link
                        className="text-sm underline underline-offset-4 cursor-pointer"
                        onClick={() => {
                          setType("sign-up");
                        }}
                      >
                        Zarejestruj się
                      </Link>
                    </>
                  ) : (
                    <>
                      Masz już konto?{" "}
                      <Link
                        className="text-sm underline underline-offset-4 cursor-pointer"
                        onClick={() => {
                          setType("sign-in");
                        }}
                      >
                        Zaloguj się
                      </Link>
                    </>
                  )}
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
