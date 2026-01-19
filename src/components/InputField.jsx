export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  hint,
  as = 'input',
  options
}) {
  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    required,
    className: as === 'select' ? 'select' : as === 'textarea' ? 'textarea' : 'input'
  };

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
        {required ? ' *' : ''}
      </label>

      {as === 'textarea' ? (
        <textarea {...commonProps} />
      ) : as === 'select' ? (
        <select {...commonProps}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...commonProps} type={type} />
      )}

      {hint ? <div className="hint">{hint}</div> : null}
      {error ? <div className="errorText">{error}</div> : null}
    </div>
  );
}

