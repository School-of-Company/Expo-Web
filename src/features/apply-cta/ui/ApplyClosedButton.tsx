"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import Button from "@/shared/ui/Button";
import ApplyClosedDialog from "./ApplyClosedDialog";

type ApplyClosedButtonProps = Pick<ComponentProps<typeof Button>, "size" | "variant" | "fullWidth" | "className"> & { children: ReactNode };

export default function ApplyClosedButton(props: ApplyClosedButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button {...props} onClick={() => dialogRef.current?.showModal()} />
      <ApplyClosedDialog ref={dialogRef} />
    </>
  );
}
