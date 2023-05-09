<template>
  <div class="min-h-screen md:flex">
    <SignupSteps :currentStep="currentStep" :selectedType="selectedType" />
    <SignupSelectMenu
      v-if="currentStep === 0"
      :selectedType="selectedType"
      @set-type="($event) => (selectedType = $event)"
      @set-business-type="($event) => (selectedBusinessType = $event)"
      @continue="currentStep++"
    />
    <SignupBusinessDetails
      v-if="
        currentStep === 1 &&
        (selectedType === 'business' || selectedType === 'sole-trader')
      "
      :selectedType="selectedType === 'sole-trader' ? '' : selectedBusinessType"
      @back="backToSelectMenu()"
      @continue="handleBusinessDetailsContinue"
    />
    <SignupPersonalDetails
      v-else-if="currentStep === 1 && selectedType === 'personal'"
      @back="backToSelectMenu()"
      @continue="handlePersonalDetailsContinue"
    />
    <SignupContactDetails
      v-if="currentStep === 2"
      @back="currentStep--"
      @continue="handleContactDetailsContinue"
    />
    <SignupProfileDetails
      v-if="currentStep === 3"
      @back="currentStep--"
      @continue="handleSubmit"
    />
    <SignupFinish v-if="currentStep === 4" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/store/authStore";
import {
  SignupBusinessDetails as SignupBusinessDetailsType,
  SignupContactDetails as SignupContactDetailsType,
  SignupPersonalDetails as SignupPersonalDetailsType,
  SignupProfileDetails as SignupProfileDetailsType,
  FirebasePersonalAccount as SignupPersonalPayload,
  FirebaseBusinessAccount as SignupBusinessPayload,
  UserInfoJWT,
  AccountType,
  SignupAccountType,
  InputObject,
} from "~~/types";

const {
  checkForInputErrors,
  checkContactConfirmationEmail,
  checkProfileConfirmationEmail,
} = useError();

const currentStep = ref(0);

const authStore = useAuthStore();

const { logout } = useFirebaseAuth();

const firebaseToken = authStore.firebaseTempToken;
const UserInfo = authStore.loggedInUser;

const selectedType = useState<SignupAccountType | "">(
  "signup-account-type",
  () => ""
);
const selectedBusinessType = ref("");

const businessDetails = useState<SignupBusinessDetailsType>(
  "signup-business-details",
  () => {
    return {
      fullCompanyName: {
        value: "",
        error: "",
      },
      companyRegistrationNumber: {
        value: "",
        error: "",
      },
      vatNumber: {
        value: "",
        error: "",
      },
      country: {
        value: {
          value: "",
          error: "",
        },
        label: "",
        icon: "",
      },
      city: {
        value: "",
        error: "",
      },
      postcode: {
        value: "",
        error: "",
      },
      addressLine1: {
        value: "",
        error: "",
      },
      addressLine2: {
        value: "",
        error: "",
      },
    };
  }
);

const handleBusinessDetailsContinue = () => {
  let hasError = false;
  if (selectedType.value === "business") {
    hasError = checkForInputErrors([
      businessDetails.value.fullCompanyName,
      businessDetails.value.companyRegistrationNumber,
      businessDetails.value.vatNumber,
      businessDetails.value.country.value,
      businessDetails.value.city,
      businessDetails.value.postcode,
      businessDetails.value.addressLine1,
    ]);
  } else if (selectedType.value === "sole-trader") {
    hasError = checkForInputErrors([
      businessDetails.value.fullCompanyName,
      businessDetails.value.companyRegistrationNumber,
      businessDetails.value.country.value,
      businessDetails.value.city,
      businessDetails.value.postcode,
      businessDetails.value.addressLine1,
    ]);
  }

  if (!hasError) {
    currentStep.value++;
  }
};

const personalDetails = useState<SignupPersonalDetailsType>(
  "signup-personal-details",
  () => {
    return {
      firstName: {
        value: "",
        error: "",
      },
      lastName: {
        value: "",
        error: "",
      },
      country: {
        value: undefined,
        error: "",
      },
      city: {
        value: "",
        error: "",
      },
      postcode: {
        value: "",
        error: "",
      },
      addressLine1: {
        value: "",
        error: "",
      },
      addressLine2: {
        value: "",
        error: "",
      },
    };
  }
);

const handlePersonalDetailsContinue = () => {
  const hasError = checkForInputErrors([
    personalDetails.value.firstName,
    personalDetails.value.lastName,
    personalDetails.value.country,
    personalDetails.value.city,
    personalDetails.value.postcode,
    personalDetails.value.addressLine1,
  ]);

  if (!hasError) {
    currentStep.value++;
  }
};

const contactDetails = useState<SignupContactDetailsType>(
  "signup-contact-details",
  () => {
    return {
      firstName: {
        value: "",
        error: "",
      },
      lastName: {
        value: "",
        error: "",
      },
      phone: {
        value: "",
        error: "",
      },
      mobile: {
        value: "",
        error: "",
      },
      companyEmail: {
        value: "",
        error: "",
        type: "email",
      },
      confirmCompanyEmail: {
        value: "",
        error: "",
        type: "email",
      },
      email: {
        value: "",
        error: "",
        type: "email",
      },
      confirmEmail: {
        value: "",
        error: "",
        type: "email",
      },
    };
  }
);

const handleContactDetailsContinue = () => {
  let inputsToCheck = [contactDetails.value.phone, contactDetails.value.mobile];

  if (selectedType.value === "personal") {
    inputsToCheck.push(
      contactDetails.value.email,
      contactDetails.value.confirmEmail
    );
  } else if (
    selectedType.value === "business" ||
    selectedType.value === "sole-trader"
  ) {
    inputsToCheck.push(
      contactDetails.value.firstName,
      contactDetails.value.lastName,
      contactDetails.value.companyEmail,
      contactDetails.value.confirmCompanyEmail
    );
  }

  const hasError =
    checkForInputErrors(inputsToCheck) ||
    checkContactConfirmationEmail({
      email: contactDetails.value.email,
      confirmEmail: contactDetails.value.confirmEmail,
    });

  if (!hasError) {
    currentStep.value++;
    inputsToCheck = [];
  }
};

const profileDetails = useState<SignupProfileDetailsType>(
  "signup-profile-details",
  () => {
    return {
      useContactEmail: false,
      accountEmail: {
        value: "",
        error: "",
        type: "email",
      },
      confirmAccountEmail: {
        value: "",
        error: "",
        type: "email",
      },
      password: {
        value: "",
        error: "",
      },
      repeatPassword: {
        value: "",
        error: "",
      },
      subscribeToNewsletter: true,
      agreeToTerms: false,
    };
  }
);

function mapType(selected: string): AccountType {
  switch (selected) {
    case "personal":
      return AccountType.Personal;
    case "sole-trader":
      return AccountType.SoleTrader;
    case "business":
      return AccountType.Business;
    default:
      return AccountType.Agent;
  }
}

const backToSelectMenu = async () => {
  let personal = useState<SignupPersonalDetailsType>("signup-personal-details");
  const business = useState<SignupBusinessDetailsType>(
    "signup-business-details"
  );

  for (let p in personal.value) {
    personal.value[p].error = "";
  }
  for (let p in business.value) {
    business.value[p].error = "";
  }
  currentStep.value--;
};

const registerClassicSignup = async (
  payload: SignupPersonalPayload | SignupBusinessPayload
): Promise<any> => {
  payload.isAlreadyRegisteredWithFirebase = false;
  payload.account.profileDetails.password = profileDetails.value.password.value;

  const { data, error } = await useFetchAPI<UserInfoJWT, Error>(
    "auth/register",
    {
      method: "POST",
      body: payload,
    }
  );

  return { data, error };
};

const registerFirebaseSignup = async (
  payload: SignupPersonalPayload | SignupBusinessPayload
): Promise<any> => {
  delete payload.account.profileDetails.password;
  payload.account.firebaseId = UserInfo?.user_id;
  payload.isAlreadyRegisteredWithFirebase = true;
  const { data, error } = await useFetchAPI<UserInfoJWT>(
    "auth/firebase/register",
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
      },
      method: "POST",
      body: payload,
    }
  );

  return { data, error };
};

const handleSubmit = async () => {
  let inputsToCheck: InputObject[] = [];

  if (firebaseToken) {
    inputsToCheck = [
      profileDetails.value.accountEmail,
      profileDetails.value.confirmAccountEmail,
    ];
  } else {
    inputsToCheck = [
      profileDetails.value.accountEmail,
      profileDetails.value.confirmAccountEmail,
      profileDetails.value.password,
      profileDetails.value.repeatPassword,
    ];
  }

  const hasError =
    checkForInputErrors(inputsToCheck) ||
    checkProfileConfirmationEmail({
      accountEmail: profileDetails.value.accountEmail,
      confirmAccountEmail: profileDetails.value.confirmAccountEmail,
    });

  if (!hasError) {
    let payload: SignupBusinessPayload | SignupPersonalPayload | null = null;
    if (selectedType.value === "personal") {
      const personalPayload: SignupPersonalPayload = {
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
        },
      };

      payload = Object.assign({}, personalPayload);
    } else {
      const businessPayload: SignupBusinessPayload = {
        account: {
          accountType: mapType(selectedType.value),
          role: 2,
          profileDetails: {
            email: profileDetails.value.accountEmail.value,
            password: profileDetails.value.password.value,
          },
          companyDetails: {
            name: businessDetails.value.fullCompanyName.value,
            registrationNumber:
              businessDetails.value.companyRegistrationNumber.value,
            vat: businessDetails.value.vatNumber.value,
            country: businessDetails.value.country.value.value.value,
            city: businessDetails.value.city.value,
            postcode: businessDetails.value.postcode.value,
            address1: businessDetails.value.addressLine1.value,
          },
          contactDetails: {
            firstName: contactDetails.value.firstName.value,
            lastName: contactDetails.value.lastName.value,
            phone: contactDetails.value.phone.value,
            email: contactDetails.value.companyEmail.value,
          },
        },
      };
      payload = Object.assign({}, businessPayload);
    }

    try {
      const request = firebaseToken
        ? await registerFirebaseSignup(payload)
        : await registerClassicSignup(payload);

      const { data, error } = request;

      if (error.value != null) {
        throw error.value.response;
      }
      const { message, status } = data.value;
      await logout();
      // TODO: Notification banner
    } catch (error) {
      console.log(error);
      return;
    }

    currentStep.value++;
  }
};

definePageMeta({
  layout: "empty",
});

useHead({
  title: "Signup",
});
</script>
