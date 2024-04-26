"use client";

import ClipboardJS from "clipboard";
import React, { useEffect, useRef } from "react";

const Clipboard = React.forwardRef(
  (
    {
      value,
      children,
      className,
      style,
      onSuccess
    }: {
      value: string;
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      onSuccess?: () => void;
    },
    ref
  ) => {
    const copyRef = useRef<any>(ref);
    let clipboard: any;
    useEffect(() => {
      if (copyRef.current) {
        clipboard = new ClipboardJS(copyRef.current, {
          text: () => value,
          container: document.body
        });
        clipboard.on("success", function () {
          onSuccess && onSuccess();
        });
      }
      return () => clipboard?.destroy && clipboard.destroy();
    }, [copyRef, value]);

    return (
      <>
        <button className={`p-0 m-0 cursor-pointer ${className}`} style={style} ref={copyRef} data-clipboard-text={value}>
          {children}
        </button>
      </>
    );
  }
);
Clipboard.displayName = "Clipboard";
export { Clipboard };
