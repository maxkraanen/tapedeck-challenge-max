import React from "react";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

export const DebouncedInput: React.FC<Props> = ({
  value: propValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState<string | number>(
    propValue
  );

  // Synchronize internal state with prop changes
  React.useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(internalValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, internalValue]);

  return (
    <input
      {...props}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};
