import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

type Props = React.ComponentProps<typeof HeadlessButton> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[#00B073] text-white hover:bg-[#009962] disabled:bg-[#EDEDED] disabled:text-gray-400",
  secondary:
    "border border-[#00B073] bg-transparent text-[#00B073] hover:bg-[#00B073]/10 disabled:border-[#EDEDED] disabled:text-gray-400",
  tertiary:
    "border-0 bg-transparent text-[#00B073] hover:bg-[#00B073]/10 disabled:text-gray-400",
};

export function getButtonClassName(variant: ButtonVariant = "primary", className = "") {
  return `rounded-md font-semibold transition disabled:cursor-not-allowed active:scale-[.98] ${variantClasses[variant]} ${className}`;
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <HeadlessButton
      {...props}
      className={getButtonClassName(variant, className)}
    />
  );
}
