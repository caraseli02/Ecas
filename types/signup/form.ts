import { InputObject } from "../global";

export type SignupAccountType = "personal" | "sale-trader" | "business";

export interface SignupBusinessDetails {
  fullCompanyName: InputObject;
  companyRegistrationNumber: InputObject;
  vatNumber: InputObject;
  country: InputObject;
  city: InputObject;
  postcode: InputObject;
  addressLine1: InputObject;
  addressLine2: InputObject;
}

export interface SignupPersonalDetails {
  firstName: InputObject;
  lastName: InputObject;
  country: InputObject;
  city: InputObject;
  postcode: InputObject;
  addressLine1: InputObject;
  addressLine2: InputObject;
}

export interface SignupContactDetails {
  firstName: InputObject;
  lastName: InputObject;
  phone: InputObject;
  mobile: InputObject;
  companyEmail: InputObject;
  email: InputObject;
  confirmCompanyEmail: InputObject;
  confirmEmail: InputObject;
}

export interface SignupProfileDetails {
  useContactEmail: boolean;
  accountEmail: InputObject;
  confirmAccountEmail: InputObject;
  password: InputObject;
  repeatPassword: InputObject;
  subscribeToNewsletter: boolean;
  agreeToTerms: boolean;
}
