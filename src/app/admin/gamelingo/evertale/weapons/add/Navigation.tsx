"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Dash } from "react-bootstrap-icons";

const VISIBLE = "fixed top-20 right-4 px-4 py-2 bg-cyan-800 w-1/5 rounded-xl transition-all duration-500";
const INVISIBLE = "opacity-0 invisible fixed top-20 right-4 px-4 py-2 bg-cyan-800 w-1/5 rounded-xl transition-all duration-500";

const Navigation = () => {
  const [navPan, setNavPan] = React.useState(true);
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setNavPan(!navPan);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navPan]);
  return (
    <div className={navPan ? VISIBLE : INVISIBLE}>
      <div className="relative">
        <h1 className="text-center text-white font-bold font-playfair">Navigation</h1>
        <span className="text-red-400 text-3xl font-extrabold absolute left-0 top-0">
          <Dash />
        </span>
      </div>
      <Link href="#identity" className="text-white font-bold font-playfair block">
        Identity
      </Link>
      <Link href="#no-ascend" className="text-white font-bold font-playfair block">
        No Ascend
      </Link>
      <Link href="#ascend-1" className="text-white font-bold font-playfair block">
        Ascend 1
      </Link>
      <Link href="#full-ascend" className="text-white font-bold font-playfair block">
        Full Ascend
      </Link>
      <Link href="#max-status" className="text-white font-bold font-playfair block">
        Max Status
      </Link>
    </div>
  );
};

export default Navigation;
