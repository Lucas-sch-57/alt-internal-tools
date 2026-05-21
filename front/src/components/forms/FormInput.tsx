import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputProps = {
  as?: 'input' | 'textarea';
  hasError?: boolean;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

const FormInput: React.FC<InputProps> = props => {
  const { as = 'input', hasError = false, className = '', ...rest } = props;

  const styles = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-100 ${
    hasError
      ? 'border-red-400 focus:border-red-400'
      : 'border-gray-200 focus:border-blue-500'
  } ${className}`;

  if (as === 'textarea') {
    return (
      <textarea
        rows={1}
        className={styles}
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      className={styles}
      {...(rest as InputHTMLAttributes<HTMLInputElement>)}
    />
  );
};

export default FormInput;
