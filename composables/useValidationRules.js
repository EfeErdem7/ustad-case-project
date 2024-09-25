export default function useValidationRules(passwordRef) {
  const required = (value) => !!value || "Required.";
  const email = (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.";
  const matchPassword = (value) =>
    value === passwordRef.value || "Passwords do not match.";

  return {
    required,
    email,
    matchPassword,
  };
}
