import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: Props) => {
  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
