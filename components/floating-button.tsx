import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed right-auto flex items-center justify-center text-white transition-colors bg-orange-400 border-0 border-transparent rounded-full shadow-xl cursor-pointer ml-[480px] hover:bg-orange-500 aspect-square w-14 bottom-28">
        {children}
      </a>
    </Link>
  );
}
