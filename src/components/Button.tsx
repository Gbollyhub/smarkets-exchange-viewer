import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import { getButtonClassName, type ButtonVariant } from "@/components/buttonStyles";

type Props = React.ComponentProps<typeof HeadlessButton> & {
  variant?: ButtonVariant;
};

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
