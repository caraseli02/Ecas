import { ref } from 'vue';
import { useState } from '#app';
import type {
  SignupAccountType,
  SignupBusinessDetails,
  SignupContactDetails,
  SignupPersonalDetails,
  SignupProfileDetails,
} from '@/types';

export const useSignupState = () => {
  const currentStep = ref(0);
  const selectedType = useState<SignupAccountType | ''>('signup-account-type', () => '');
  const selectedBusinessType = ref('');
  const vatPayer = ref(false);

  const businessDetails = useState<SignupBusinessDetails>('signup-business-details', () => {
    return {
        fullCompanyName: {
            value: '',
            error: '',
        },
        companyRegistrationNumber: {
            value: '',
            error: '',
        },
        vatNumber: {
            value: '',
            error: '',
        },
        country: {
            value: {
                value: '',
                error: '',
            },
            label: '',
            icon: '',
        },
        region: {
            value: {
                value: '',
                error: '',
            },
            label: '',
            icon: '',
        },
        city: {
            value: '',
            error: '',
        },
        postcode: {
            value: '',
            error: '',
        },
        addressLine1: {
            value: '',
            error: '',
        },
        addressLine2: {
            value: '',
            error: '',
        },
    };
});

const personalDetails = useState<SignupPersonalDetails>('signup-personal-details', () => {
  return {
      firstName: {
          value: '',
          error: '',
      },
      lastName: {
          value: '',
          error: '',
      },
      country: {
          value: undefined,
          error: '',
      },
      region: {
          value: undefined,
          error: '',
      },
      city: {
          value: '',
          error: '',
      },
      postcode: {
          value: '',
          error: '',
      },
      addressLine1: {
          value: '',
          error: '',
      },
      addressLine2: {
          value: '',
          error: '',
      },
  };
});

const contactDetails = useState<SignupContactDetails>('signup-contact-details', () => {
  return {
      firstName: {
          value: '',
          error: '',
      },
      lastName: {
          value: '',
          error: '',
      },
      phone: {
          value: '',
          error: '',
      },
      mobile: {
          value: '',
          error: '',
      },
      companyEmail: {
          value: '',
          error: '',
          type: 'email',
      },
      confirmCompanyEmail: {
          value: '',
          error: '',
          type: 'email',
      },
      email: {
          value: '',
          error: '',
          type: 'email',
      },
      confirmEmail: {
          value: '',
          error: '',
          type: 'email',
      },
  };
});

const profileDetails = useState<SignupProfileDetails>('signup-profile-details', () => {
  return {
      useContactEmail: false,
      accountEmail: {
          value: '',
          error: '',
          type: 'email',
      },
      confirmAccountEmail: {
          value: '',
          error: '',
          type: 'email',
      },
      password: {
          value: '',
          error: '',
      },
      repeatPassword: {
          value: '',
          error: '',
      },
      subscribeToNewsletter: true,
      agreeToTerms: false,
  };
});

  return {
    currentStep,
    selectedType,
    selectedBusinessType,
    vatPayer,
    businessDetails,
    personalDetails,
    contactDetails,
    profileDetails,
  };
};
