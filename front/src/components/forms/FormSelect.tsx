import type { SelectHTMLAttributes } from 'react';

export interface Option {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  hasError?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = props => {
  const { options, hasError = false, className = '', ...rest } = props;

  return (
    <select
      className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-100 ${
        hasError
          ? 'border-red-400 focus:border-red-400'
          : 'border-gray-200 focus:border-blue-500'
      } ${className}`}
      {...rest}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
