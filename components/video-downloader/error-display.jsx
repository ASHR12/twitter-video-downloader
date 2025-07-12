export function ErrorDisplay({ errors, message }) {
  if (!errors && !message) return null;

  const errorMessages = [];
  
  if (errors && typeof errors === 'object') {
    Object.values(errors).forEach(errorArray => {
      if (Array.isArray(errorArray)) {
        errorMessages.push(...errorArray);
      } else if (typeof errorArray === 'string') {
        errorMessages.push(errorArray);
      }
    });
  } else if (Array.isArray(errors)) {
    errorMessages.push(...errors);
  } else if (typeof errors === 'string') {
    errorMessages.push(errors);
  }

  if (message && typeof message === 'string') {
    errorMessages.push(message);
  }

  if (errorMessages.length === 0) return null;

  return (
    <div 
      className="space-y-2" 
      role="alert" 
      aria-live="polite"
    >
      {errorMessages.map((error, index) => (
        <p key={index} className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-800">
          {error}
        </p>
      ))}
    </div>
  );
}