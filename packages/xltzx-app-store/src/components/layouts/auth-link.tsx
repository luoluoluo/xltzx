"use client";

import { getLoginUrl } from "@/utils/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AuthLink = ({
  children,
  className,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(getLoginUrl());
  }, []);
  return (
    <Link href={url} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};
