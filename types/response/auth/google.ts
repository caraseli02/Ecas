import { UserInterface } from '~/types/auth/user-interface';

export interface UserDetailsResponse {
    data: UserInterface;
    status: string;
}
