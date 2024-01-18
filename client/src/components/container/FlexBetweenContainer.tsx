import React from "react";

interface Props {
  children: React.ReactNode;
}

const FlexBetweenContainer = ({ children }: Props) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

export default FlexBetweenContainer;
