import { Fragment } from "react";
import { ChevronRightSmall } from "@/components/icons";

type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

type Props = {
  items: BreadcrumbItem[];
  current: string;
  wrap?: boolean;
};

export default function Breadcrumb({ items, current, wrap = false }: Props) {
  return (
    <div
      className={`flex items-center gap-1.5 px-4 sm:px-6 py-2.5 text-xs text-gray-500 ${wrap ? "flex-wrap" : ""}`}
    >
      {items.map((item) => (
        <Fragment key={item.label}>
          <span className="hover:text-gray-700 cursor-pointer" onClick={item.onClick}>
            {item.label}
          </span>
          <ChevronRightSmall />
        </Fragment>
      ))}
      <span className="text-gray-700">{current}</span>
    </div>
  );
}
