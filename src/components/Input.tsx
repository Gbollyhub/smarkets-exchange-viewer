import React from 'react'

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  children,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#00211F] placeholder-gray-400 outline-none focus:border-[#00B073] focus:ring-1 focus:ring-[#00B073] transition"
      />
      {children && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {children}
        </span>
      )}
    </div>
  );
}

export default Input