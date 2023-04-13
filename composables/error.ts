import { InputObject } from "~~/types";

export const useError = () => {
  const checkForInputErrors = (obj: Array<InputObject>) => {
    let hasError = false;

    obj.forEach((e) => {
      if (!e.value) {
        e.error = "This field is required";
      } else {
        e.error = "";
      }
    });

    if (obj.find((e) => e.error)) {
      hasError = true;
    }

    return hasError;
  };

  const checkContactConfirmationEmail = (obj: { email: InputObject, confirmEmail: InputObject } ) => {
    let hasError = false

    if (obj.email.value != obj.confirmEmail.value) {
      obj.confirmEmail.error = "Confirmation email value should same"
    }

    if (obj.email.error || obj.confirmEmail.error) {
      hasError = true;
    }

    return hasError
  }

  const checkProfileConfirmationEmail = (obj: { accountEmail: InputObject, confirmAccountEmail: InputObject } ) => {
    let hasError = false

    if (obj.accountEmail.value != obj.confirmAccountEmail.value) {
      obj.confirmAccountEmail.error = "Confirmation email value should same"
    }

    if (obj.accountEmail.error || obj.confirmAccountEmail.error) {
      hasError = true;
    }

    return hasError
  }

  return {
    checkForInputErrors,
    checkContactConfirmationEmail,
    checkProfileConfirmationEmail
  };
};
