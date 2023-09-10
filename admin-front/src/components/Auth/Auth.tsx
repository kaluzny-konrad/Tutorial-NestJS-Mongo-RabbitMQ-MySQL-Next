"use client";

import React, { useState } from "react";
import { Link } from "@nextui-org/react";
import UserAuthForm from "./UserAuthForm";

type Props = {
  initType: "sign-in" | "sign-up";
};

export default function Auth({ initType }: Props) {
  const [type, setType] = useState<"sign-in" | "sign-up">(initType);

  return (
    <>
      <h1 className="">{type == "sign-in" ? "Logowanie" : "Rejestracja"}</h1>
      <div className="items-center">
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
      </div>
    </>
  );
}
