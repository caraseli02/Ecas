<template>
    <div class="min-h-screen md:flex">
        <SignupSteps :current-step="currentStep" :selected-type="selectedType" />
        <SignupSelectMenu
            v-if="currentStep === 0"
            :selected-type="selectedType"
            @set-type="($event) => (selectedType = $event)"
            @set-business-type="($event) => (selectedBusinessType = $event)"
            @continue="currentStep++"
        />
        <SignupBusinessDetails
            v-if="currentStep === 1 && (selectedType === 'business' || selectedType === 'sole-trader')"
            v-model="vatPayer"
            :selected-type="selectedType === 'sole-trader' ? '' : selectedBusinessType"
            @back="backToSelectMenu()"
            @continue="handleBusinessDetailsContinue"
        />
        <SignupPersonalDetails
            v-else-if="currentStep === 1 && selectedType === 'personal'"
            @back="backToSelectMenu()"
            @continue="handlePersonalDetailsContinue"
        />
        <SignupContactDetails v-if="currentStep === 2" @back="currentStep--" @continue="handleContactDetailsContinue" />
        <SignupProfileDetails v-if="currentStep === 3" @back="currentStep--" @continue="handleSubmit" />
        <SignupFinish v-if="currentStep === 4" />
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store/authStore';
import {
    AccountType,
    FirebaseBusinessAccount as SignupBusinessPayload,
    FirebasePersonalAccount as SignupPersonalPayload,
    InputObject,
    SignupAccountType,
    SignupBusinessDetails as SignupBusinessDetailsType,
    SignupContactDetails as SignupContactDetailsType,
    SignupPersonalDetails as SignupPersonalDetailsType,
    SignupProfileDetails as SignupProfileDetailsType,
} from '~~/types';
import { useToast } from '@/components/ui/toast/use-toast';

const { $api } = useNuxtApp();

const { checkForInputErrors, checkContactConfirmationEmail, checkProfileConfirmationEmail } = useError();

const currentStep = ref(0);

const authStore = useAuthStore();

const { toast } = useToast();

const { logout } = useFirebaseAuth();

const firebaseToken = authStore.token.value;
const userInfo = authStore.loggedInUser;

const selectedType = useState<SignupAccountType | ''>('signup-account-type', () => '');
const selectedBusinessType = ref('');

const businessDetails = useState<SignupBusinessDetailsType>('signup-business-details', () => {
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

const handleBusinessDetailsContinue = async () => {
    let hasError = false;
    if (selectedType.value === 'business') {
        hasError = checkForInputErrors([
            businessDetails.value.fullCompanyName,
            businessDetails.value.companyRegistrationNumber,
            businessDetails.value.country.value,
            businessDetails.value.region.value,
            businessDetails.value.city,
            businessDetails.value.postcode,
            businessDetails.value.addressLine1,
        ]);
        if (selectedBusinessType.value !== 'agent') {
            if (vatPayer.value) {
                hasError = checkForInputErrors([businessDetails.value.vatNumber]);
            }
        }
    } else if (selectedType.value === 'sole-trader') {
        hasError = checkForInputErrors([
            businessDetails.value.fullCompanyName,
            businessDetails.value.companyRegistrationNumber,
            businessDetails.value.country.value,
            businessDetails.value.region.value,
            businessDetails.value.city,
            businessDetails.value.postcode,
            businessDetails.value.addressLine1,
        ]);
    }

    const result = await $api.orders.validateAddress({
        country: businessDetails.value.country.value.value.value,
        region: businessDetails.value.region.value.value.value,
        city: businessDetails.value.city.value,
        postcode: businessDetails.value.postcode.value,
        name1: businessDetails.value.addressLine1.value,
        name2: businessDetails.value.addressLine2.value,
        default: false,
    });

    if (!result.data.valid) {
        hasError = true;
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Invalid address',
        });
        return;
    }

    if (!hasError) {
        currentStep.value++;
    }
};

const personalDetails = useState<SignupPersonalDetailsType>('signup-personal-details', () => {
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

const handlePersonalDetailsContinue = async () => {
    let hasError = checkForInputErrors([
        personalDetails.value.firstName,
        personalDetails.value.lastName,
        personalDetails.value.country,
        personalDetails.value.region,
        personalDetails.value.city,
        personalDetails.value.postcode,
        personalDetails.value.addressLine1,
    ]);

    const result = await $api.orders.validateAddress({
        country: personalDetails.value.country.value.value,
        region: personalDetails.value.region.value.value,
        city: personalDetails.value.city.value,
        postcode: personalDetails.value.postcode.value,
        name1: personalDetails.value.addressLine1.value,
        name2: personalDetails.value.addressLine2.value,
        default: false,
    });

    if (!result.data.valid) {
        hasError = true;
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Invalid address',
        });
        return;
    }

    if (!hasError) {
        currentStep.value++;
    }
};

const contactDetails = useState<SignupContactDetailsType>('signup-contact-details', () => {
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

const handleContactDetailsContinue = () => {
    let inputsToCheck = [contactDetails.value.phone];

    if (selectedType.value === 'personal') {
        inputsToCheck.push(contactDetails.value.email, contactDetails.value.confirmEmail);
    } else if (selectedType.value === 'business' || selectedType.value === 'sole-trader') {
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

const profileDetails = useState<SignupProfileDetailsType>('signup-profile-details', () => {
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

function mapType(selected: string): AccountType {
    switch (selected) {
        case 'personal':
            return AccountType.Personal;
        case 'sole-trader':
            return AccountType.SoleTrader;
        case 'business':
            if (selectedBusinessType.value === 'executive') {
                return AccountType.Business;
            } else if (selectedBusinessType.value === 'agent') {
                return AccountType.Agent;
            }
            break;
        default:
            break;
    }
    // Return a general default or handle error, if no cases match
    throw new Error('Invalid account type selection');
}

const backToSelectMenu = async () => {
    const personal = useState<SignupPersonalDetailsType>('signup-personal-details');
    const business = useState<SignupBusinessDetailsType>('signup-business-details');

    for (const p in personal.value) {
        personal.value[p].error = '';
    }
    for (const p in business.value) {
        business.value[p].error = '';
    }
    currentStep.value--;
};

const registerClassicSignup = async (payload: SignupPersonalPayload | SignupBusinessPayload): Promise<any> => {
    payload.isAlreadyRegisteredWithFirebase = false;
    payload.account.profileDetails.password = profileDetails.value.password.value;

    return await $api.auth.registerClassic(payload);
};

const registerFirebaseSignup = async (payload: SignupPersonalPayload | SignupBusinessPayload): Promise<any> => {
    delete payload.account.profileDetails.password;
    payload.account.firebaseId = userInfo?.user_id;
    payload.isAlreadyRegisteredWithFirebase = true;

    return await $api.auth.registerFirebase(payload);
};

const handleSubmit = async () => {
    let inputsToCheck: InputObject[] = [];

    if (firebaseToken) {
        inputsToCheck = [profileDetails.value.accountEmail, profileDetails.value.confirmAccountEmail];
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

        if (selectedType.value === 'personal') {
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
                    personalDetails: {
                        firstName: personalDetails.value.firstName.value,
                        lastName: personalDetails.value.lastName.value,
                        address: {
                            name1: personalDetails.value.addressLine1.value,
                            name2: personalDetails.value.addressLine2.value,
                            country: personalDetails.value.country.value.value,
                            region: personalDetails.value.region.value.value,
                            city: personalDetails.value.city.value,
                            postcode: personalDetails.value.postcode.value,
                        },
                        shippingAddress: [
                            {
                                name1: personalDetails.value.addressLine1.value,
                                name2: personalDetails.value.addressLine2.value,
                                country: personalDetails.value.country.value.value,
                                region: personalDetails.value.region.value.value,
                                city: personalDetails.value.city.value,
                                postcode: personalDetails.value.postcode.value,
                                default: true,
                            },
                        ],
                        billingAddress: [
                            {
                                name1: personalDetails.value.addressLine1.value,
                                name2: personalDetails.value.addressLine2.value,
                                country: personalDetails.value.country.value.value,
                                region: personalDetails.value.region.value.value,
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
                        registrationNumber: businessDetails.value.companyRegistrationNumber.value,
                        vat: businessDetails.value.vatNumber.value,
                        address: {
                            name1: businessDetails.value.addressLine1.value,
                            name2: businessDetails.value.addressLine2.value,
                            country: businessDetails.value.country.value.value.value,
                            region: businessDetails.value.region.value.value.value,
                            city: businessDetails.value.city.value,
                            postcode: businessDetails.value.postcode.value,
                        },
                        shippingAddress: [
                            {
                                name1: businessDetails.value.addressLine1.value,
                                name2: businessDetails.value.addressLine2.value,
                                country: businessDetails.value.country.value.value.value,
                                region: businessDetails.value.region.value.value.value,
                                city: businessDetails.value.city.value,
                                postcode: businessDetails.value.postcode.value,
                                default: true,
                            },
                        ],
                        billingAddress: [
                            {
                                name1: businessDetails.value.addressLine1.value,
                                name2: businessDetails.value.addressLine2.value,
                                country: businessDetails.value.country.value.value.value,
                                region: businessDetails.value.region.value.value.value,
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
            payload = Object.assign({}, businessPayload);
        }

        try {
            firebaseToken ? await registerFirebaseSignup(payload) : await registerClassicSignup(payload);

            toast({
                variant: 'success',
                title: 'Success',
                description: 'Account created successfully',
            });

            await logout();
            // TODO: Notification banner
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while creating your account',
            });
            return;
        } finally {
            clearFormData();
        }

        currentStep.value++;
    }
};

definePageMeta({
    layout: 'empty',
});

useHead({
    title: 'Signup',
});

const vatPayer = ref(false);

const clearFormData = () => {
    // Clear personal details
    for (const key in personalDetails.value) {
        personalDetails.value[key].value = '';
        personalDetails.value[key].error = '';
    }
    // Clear business details
    for (const key in businessDetails.value) {
        businessDetails.value[key].value = '';
        businessDetails.value[key].error = '';
    }
    // Clear contact details
    for (const key in contactDetails.value) {
        contactDetails.value[key].value = '';
        contactDetails.value[key].error = '';
    }
    // Clear profile details
    for (const key in profileDetails.value) {
        profileDetails.value[key].value = '';
        profileDetails.value[key].error = '';
    }
};

const isSubmitDisabled = computed(() => !profileDetails.value.agreeToTerms);
</script>
