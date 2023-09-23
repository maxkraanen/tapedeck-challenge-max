export const PaginationButton: React.FC<
  React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button {...props} className="w-10 cursor-pointer">
      {children}
    </button>
  );
};
