import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`sm:mx-auto sm:w-full sm:max-w-sm mt-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
