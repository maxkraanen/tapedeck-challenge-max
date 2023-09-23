import React from "react";

export const TableHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className="w-36 flex h-10">{children}</div>;
};
