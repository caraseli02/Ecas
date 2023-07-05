import { UserDetails } from '~~/types/auth/user-details';

export interface UserDetailsResponse {
    data: UserDetails;
    status: string;
}
