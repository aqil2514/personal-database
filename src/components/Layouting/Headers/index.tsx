"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { List } from "react-bootstrap-icons";
import NavMobile from "../NavMobile";

const NAV_STYLE = "bg-cyan-900 p-nav py-2 flex justify-between text-white";
const H1_STYLE = "mt-1 font-bold text-2xl font-playfair";
const SIGN_STYLE = "sm:inline-block hidden font-bold font-roboto bg-amber-500 hover:bg-amber-200 hover:text-amber-950 px-4 py-2 rounded-lg";
const MENU_STYLE = "sm:hidden inline-block cursor-pointer hover:text-amber-500 mt-2 text-xl";

export default function Headers() {
  const [isMobile, setIsMobile] = useState(false);

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <nav className={NAV_STYLE}>
          <Link href={"/"}>
            <h1 className={H1_STYLE}>Personal Databases</h1>
          </Link>
          <div>
            <List className={MENU_STYLE} onClick={() => setIsMobile(!isMobile)}></List>
            <span className="sm:inline-block hidden pr-3 font-roboto font-semibold">{`Halo ${session?.user?.name}`}</span>
            <button className={SIGN_STYLE} onClick={() => signOut({ callbackUrl: "/" })}>
              SignOut
            </button>
          </div>
        </nav>
        <NavMobile isMobile={isMobile} />
      </>
    );
  }

  return (
    <>
      <nav className={NAV_STYLE}>
        <Link href={"/"}>
          <h1 className={H1_STYLE}>Personal Databases</h1>
        </Link>
        <div>
          <List className={MENU_STYLE} onClick={() => setIsMobile(!isMobile)}></List>
          <button className={SIGN_STYLE} onClick={() => signIn("github", { callbackUrl: "/admin" })}>
            SignIn
          </button>
        </div>
      </nav>
      <NavMobile isMobile={isMobile} />
    </>
  );
}
