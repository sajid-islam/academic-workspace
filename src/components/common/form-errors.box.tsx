type FormErrorsBoxProps = {
  errors: string | string[];
};

export default function FormErrorsBox({ errors }: FormErrorsBoxProps) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return null;
  }

  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive"
    >
      {Array.isArray(errors) ? (
        <ul className="list-disc space-y-1 pl-4">
          {errorList.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <p>{errors}</p>
      )}
    </div>
  );
}
