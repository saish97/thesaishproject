interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: () => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  defaultValue,
  placeholder,
  required,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dim">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="field-input mt-1 w-full"
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onChange?: () => void;
}

export function FormTextarea({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  rows = 4,
  onChange,
}: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dim">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onChange={onChange}
        className="field-input mt-1 w-full"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  name,
  options,
  defaultValue,
  required,
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dim">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="field-input mt-1 w-full"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
