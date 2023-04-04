export interface FirebasePersonalAccount {
    "account": PersonalAccount
    "isAlreadyRegisteredWithFirebase": boolean
}

export interface FirebaseBusinessAccount {
    "account": BusinessAccount
    "isAlreadyRegisteredWithFirebase": boolean
}

interface BusinessAccount extends PersonalAccount {
    "companyDetails": CompanyDetails
}

interface PersonalAccount {
    "accountType": number,
    "role": number,
    "firebaseId"?: string
    "profileDetails": ProfileDetails
    "contactDetails": ContactDetails
}

interface CompanyDetails {
    "name": string,
    "registrationNumber": number,
    "vat": string,
    "country": string,
    "city": string,
    "postcode": number,
    "address1": string
}

interface ProfileDetails {
    "email": string
}

interface ContactDetails {
    "firstName": string,
    "lastName": string,
    "phone": number,
    "email": string
}