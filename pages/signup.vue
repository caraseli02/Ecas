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
                (selectedType === 'business' || selectedType === 'sale-trader')
            "
            :selectedType="
                selectedType === 'sale-trader' ? '' : selectedBusinessType
            "
            @back="currentStep--"
            @continue="handleBusinessDetailsContinue"
        />
        <SignupPersonalDetails
            v-else-if="currentStep === 1 && selectedType === 'personal'"
            @back="currentStep--"
            @continue="handlePersonalDetailsContinue"
        />
        <SignupContactDetails
            v-if="currentStep === 2"
            @back="currentStep--"
            @continue="handleContactDetailsContinue"
        />
        <SignupProfileDetails
            v-if="currentStep === 3"
            @contactEmailCheckbox="handleUseContactEmail"
            @back="currentStep--"
            @continue="handleSubmit"
        />
        <SignupFinish v-if="currentStep === 4" />
    </div>
</template>

<script setup lang="ts">
import {
    SignupAccountType,
    SignupBusinessDetails as SignupBusinessDetailsType,
    SignupContactDetails as SignupContactDetailsType,
    SignupPersonalDetails as SignupPersonalDetailsType,
    SignupProfileDetails as SignupProfileDetailsType,
    FirebaseUser as SignupPayload,
} from "~~/types";

const route = useRoute();
const { checkForInputErrors, checkConfirmEmail } = useError();

const currentStep = ref(0);

const selectedType = useState<SignupAccountType>(
    "signup-account-type",
    () => "business"
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

const handleBusinessDetailsContinue = () => {
    const hasError = checkForInputErrors([
        businessDetails.value.fullCompanyName,
        businessDetails.value.companyRegistrationNumber,
        businessDetails.value.vatNumber,
        businessDetails.value.country,
        businessDetails.value.city,
        businessDetails.value.postcode,
        businessDetails.value.addressLine1,
    ]);

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
            },
            confirmCompanyEmail: {
                value: "",
                error: "",
            },
            email: {
                value: "",
                error: "",
            },
            confirmEmail: {
                value: "",
                error: "",
            },
        };
    }
);

const handleContactDetailsContinue = () => {
    const inputsToCheck = [
        contactDetails.value.phone,
        contactDetails.value.mobile,
    ];

    if (selectedType.value === "personal") {
        inputsToCheck.push(
            contactDetails.value.email,
            contactDetails.value.confirmEmail
        );
    } else {
        inputsToCheck.push(
            contactDetails.value.firstName,
            contactDetails.value.lastName,
            contactDetails.value.companyEmail,
            contactDetails.value.confirmCompanyEmail
        );
    }

    const hasError =
        checkForInputErrors(inputsToCheck) ||
        checkConfirmEmail({
            email: contactDetails.value.email,
            confirmEmail: contactDetails.value.confirmEmail,
        });

    if (!hasError) {
        currentStep.value++;
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
            },
            confirmAccountEmail: {
                value: "",
                error: "",
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

const handleSubmit = async () => {
    const inputsToCheck = [
        profileDetails.value.accountEmail,
        profileDetails.value.confirmAccountEmail,
        profileDetails.value.password,
        profileDetails.value.repeatPassword,
    ];

    const hasError = checkForInputErrors(inputsToCheck);

    if (!hasError) {
        // TODO: SIGNUP REQUEST
        const payload: SignupPayload = {};
        await useFetchAPI("auth/login", { method: "POST" });
        currentStep.value++;
    }
};

const handleUseContactEmail = () => {
    if (profileDetails.value.useContactEmail) {
        profileDetails.value.accountEmail.value =
            contactDetails.value.email.value;
        profileDetails.value.confirmAccountEmail.value =
            contactDetails.value.confirmEmail.value;
    } else {
        profileDetails.value.accountEmail.value = "";
        profileDetails.value.confirmAccountEmail.value = "";
    }
};

definePageMeta({
    layout: "empty",
});

useHead({
    title: "Signup",
});
</script>
