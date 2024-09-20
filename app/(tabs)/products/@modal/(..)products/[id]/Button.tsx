"use client";

import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return (
    <button {...props} onClick={() => router.back()}>
      {children}
    </button>
  );
}
