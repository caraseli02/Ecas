import { useSignupState } from './useSignupState';
import { useToast } from '@/components/ui/toast/use-toast';
import { AccountType, type SignupAccountType } from '@/types';

const { $api } = useNuxtApp();

export const useSignupHandlers = () => {
  const { currentStep, selectedType, selectedBusinessType, vatPayer, businessDetails, personalDetails, contactDetails, profileDetails }
        = useSignupState();

  const { toast } = useToast();
  const { validateAddress } = $api.orders;
  const { registerClassic, registerFirebase } = $api.auth;
  const { checkForInputErrors, checkContactConfirmationEmail, checkProfileConfirmationEmail } = useFormValidation();
  const { logout } = useFirebaseAuth();
  const firebaseToken = null; // Implement retrieval of Firebase token
  const _userInfo = null; // Implement retrieval of user info

  const nextStep = () => currentStep.value++;
  const previousStep = () => currentStep.value--;

  const setType = (type: SignupAccountType) => {
    selectedType.value = type;
  };

  const setBusinessType = (type: string) => {
    selectedBusinessType.value = type;
  };

  const mapType = (selected: string): AccountType => {
    switch (selected) {
      case 'personal':
        return AccountType.Personal;
      case 'sole-trader':
        return AccountType.SoleTrader;
      case 'business':
        return selectedBusinessType.value === 'agent' ? AccountType.Agent : AccountType.Business;
      default:
        throw new Error('Invalid account type selection');
    }
  };

  const handleBusinessDetailsContinue = async () => {
    let hasError = false;

    // Validate business details fields
    const fieldsToValidate = [
      businessDetails.value.fullCompanyName,
      businessDetails.value.companyRegistrationNumber,
      businessDetails.value.country,
      businessDetails.value.region,
      businessDetails.value.city,
      businessDetails.value.postcode,
      businessDetails.value.addressLine1,
    ];

    if (vatPayer.value) {
      fieldsToValidate.push(businessDetails.value.vatNumber);
    }

    hasError = checkForInputErrors(fieldsToValidate);

    const addressResult = await $api.orders.validateAddress({
      country: businessDetails.value.country.value.value.value,
      region: businessDetails.value.region.value.value.value,
      city: businessDetails.value.city.value,
      postcode: businessDetails.value.postcode.value,
      name1: businessDetails.value.addressLine1.value,
      name2: businessDetails.value.addressLine2.value,
      default: false,
    });

    if (!addressResult.data.valid) {
      hasError = true;
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid address' });
    }

    if (!hasError) {
      nextStep();
    }
  };

  const handlePersonalDetailsContinue = async () => {
    let hasError = false;

    // Validate personal details fields
    const fieldsToValidate = [
      personalDetails.value.firstName,
      personalDetails.value.lastName,
      personalDetails.value.country,
      personalDetails.value.region,
      personalDetails.value.city,
      personalDetails.value.postcode,
      personalDetails.value.addressLine1,
    ];

    hasError = checkForInputErrors(fieldsToValidate);

    const addressResult = await validateAddress({
      country: personalDetails.value.country.value.value,
      region: personalDetails.value.region.value.value,
      city: personalDetails.value.city.value,
      postcode: personalDetails.value.postcode.value,
      name1: personalDetails.value.addressLine1.value,
      name2: personalDetails.value.addressLine2.value,
      default: false,
    });

    if (!addressResult.data.valid) {
      hasError = true;
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid address' });
    }

    if (!hasError) {
      nextStep();
    }
  };

  const handleContactDetailsContinue = () => {
    let hasError = false;

    // Validate contact details fields
    const fieldsToValidate = [contactDetails.value.phone];

    if (selectedType.value === 'personal') {
      fieldsToValidate.push(contactDetails.value.email, contactDetails.value.confirmEmail);
      hasError = checkContactConfirmationEmail({
        email: contactDetails.value.email,
        confirmEmail: contactDetails.value.confirmEmail,
      });
    }
    else {
      fieldsToValidate.push(
        contactDetails.value.firstName,
        contactDetails.value.lastName,
        contactDetails.value.companyEmail,
        contactDetails.value.confirmCompanyEmail,
      );
      hasError = checkContactConfirmationEmail({
        email: contactDetails.value.companyEmail,
        confirmEmail: contactDetails.value.confirmCompanyEmail,
      });
    }

    hasError = hasError || checkForInputErrors(fieldsToValidate);

    if (!hasError) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    // Validate profile details fields
    const fieldsToValidate = [profileDetails.value.accountEmail, profileDetails.value.confirmAccountEmail];

    if (!firebaseToken) {
      fieldsToValidate.push(profileDetails.value.password, profileDetails.value.repeatPassword);
    }

    hasError = checkProfileConfirmationEmail({
      accountEmail: profileDetails.value.accountEmail,
      confirmAccountEmail: profileDetails.value.confirmAccountEmail,
    });

    hasError = hasError || checkForInputErrors(fieldsToValidate);

    if (!hasError) {
      let payload = null;

      if (selectedType.value === 'personal') {
        payload = {
          account: {
            accountType: mapType(selectedType.value),
            role: 2,
            profileDetails: {
              email: profileDetails.value.accountEmail.value,
              password: profileDetails.value.password.value,
            },
            contactDetails: {
              firstName: personalDetails.value.firstName.value,
              lastName: personalDetails.value.lastName.value,
              phone: contactDetails.value.phone.value,
              email: contactDetails.value.email.value,
            },
            personalDetails: {
              firstName: personalDetails.value.firstName.value,
              lastName: personalDetails.value.lastName.value,
              address: {
                name1: personalDetails.value.addressLine1.value,
                name2: personalDetails.value.addressLine2.value,
                country: personalDetails.value.country.value,
                region: personalDetails.value.region.value,
                city: personalDetails.value.city.value,
                postcode: personalDetails.value.postcode.value,
              },
              shippingAddress: [
                {
                  name1: personalDetails.value.addressLine1.value,
                  name2: personalDetails.value.addressLine2.value,
                  country: personalDetails.value.country.value,
                  region: personalDetails.value.region.value,
                  city: personalDetails.value.city.value,
                  postcode: personalDetails.value.postcode.value,
                  default: true,
                },
              ],
              billingAddress: [
                {
                  name1: personalDetails.value.addressLine1.value,
                  name2: personalDetails.value.addressLine2.value,
                  country: personalDetails.value.country.value,
                  region: personalDetails.value.region.value,
                  city: personalDetails.value.city.value,
                  postcode: personalDetails.value.postcode.value,
                  default: true,
                },
              ],
            },
            adminSettings: {
              marketingPreferences: {
                newsletter: { email: profileDetails.value.subscribeToNewsletter },
                cookiesPolicy: { email: profileDetails.value.agreeToTerms },
              },
            },
          },
        };
      }
      else {
        payload = {
          account: {
            accountType: mapType(selectedType.value),
            role: 2,
            profileDetails: {
              email: profileDetails.value.accountEmail.value,
              password: profileDetails.value.password.value,
            },
            companyDetails: {
              name: businessDetails.value.fullCompanyName.value,
              registrationNumber: businessDetails.value.companyRegistrationNumber.value,
              vat: businessDetails.value.vatNumber?.value,
              address: {
                name1: businessDetails.value.addressLine1.value,
                name2: businessDetails.value.addressLine2.value,
                country: businessDetails.value.country.value,
                region: businessDetails.value.region.value,
                city: businessDetails.value.city.value,
                postcode: businessDetails.value.postcode.value,
              },
              shippingAddress: [
                {
                  name1: businessDetails.value.addressLine1.value,
                  name2: businessDetails.value.addressLine2.value,
                  country: businessDetails.value.country.value,
                  region: businessDetails.value.region.value,
                  city: businessDetails.value.city.value,
                  postcode: businessDetails.value.postcode.value,
                  default: true,
                },
              ],
              billingAddress: [
                {
                  name1: businessDetails.value.addressLine1.value,
                  name2: businessDetails.value.addressLine2.value,
                  country: businessDetails.value.country.value,
                  region: businessDetails.value.region.value,
                  city: businessDetails.value.city.value,
                  postcode: businessDetails.value.postcode.value,
                  default: true,
                },
              ],
            },
            contactDetails: {
              firstName: contactDetails.value.firstName.value,
              lastName: contactDetails.value.lastName.value,
              phone: contactDetails.value.phone.value,
              email: contactDetails.value.companyEmail.value,
            },
            adminSettings: {
              marketingPreferences: {
                newsletter: { email: profileDetails.value.subscribeToNewsletter },
                cookiesPolicy: { email: profileDetails.value.agreeToTerms },
              },
            },
          },
        };
      }

      try {
        if (firebaseToken) {
          await registerFirebase(payload);
        }
        else {
          await registerClassic(payload);
        }

        toast({ variant: 'success', title: 'Success', description: 'Account created successfully' });

        await logout();
        nextStep();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch (_error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Registration failed' });
      }
      finally {
        clearFormData();
      }
    }
  };

  const clearFormData = () => {
    // Clear all form data
    Object.values(personalDetails.value).forEach((field) => {
      field.value = '';
      field.error = '';
    });

    Object.values(businessDetails.value).forEach((field) => {
      field.value = '';
      field.error = '';
    });

    Object.values(contactDetails.value).forEach((field) => {
      field.value = '';
      field.error = '';
    });

    Object.entries(profileDetails.value).forEach(([key, field]) => {
      if (typeof field === 'object') {
        field.value = '';
        field.error = '';
      }
      else {
        profileDetails.value[key] = false;
      }
    });
  };

  return {
    setType,
    setBusinessType,
    nextStep,
    previousStep,
    handleBusinessDetailsContinue,
    handlePersonalDetailsContinue,
    handleContactDetailsContinue,
    handleSubmit,
  };
};
