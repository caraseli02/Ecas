export interface UserDetails {
    _id: string
    accountType: number
    role: number
    firebaseId: string
    active: boolean
    contactDetails: ContactDetails
    profileDetails: ProfileDetails
    companyDetails: CompanyDetails
    createdAt: string
    updatedAt: string
    __v: number
}

interface ContactDetails {
    firstName: string
    lastName: string
    phone: number
    email: string
    _id: string
}

interface ProfileDetails {
    email: string
    _id: string
}

interface CompanyDetails {
    name: string
    registrationNumber: string
    vat: string
    country: string
    city: string
    postcode: string
    address1: string
    _id: string
}