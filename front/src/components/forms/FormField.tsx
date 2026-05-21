import {
  type FieldValues,
  type Path,
  useFormContext,
  get,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  required?: boolean;
  children: React.ReactNode;
}

const FormField = <T extends FieldValues>({
  label,
  name,
  required = false,
  children,
}: FormFieldProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error?.message && (
        <span className="text-xs text-red-500">{String(error.message)}</span>
      )}
    </div>
  );
};

export default FormField;
