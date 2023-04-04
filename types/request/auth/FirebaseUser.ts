export interface FirebaseUser {
    "account": Account
    "isAlreadyRegisteredWithFirebase": boolean
}

interface Account {
    "accountType": number,
    "role": number,
    "firebaseId": string
    "companyDetails": CompanyDetails
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