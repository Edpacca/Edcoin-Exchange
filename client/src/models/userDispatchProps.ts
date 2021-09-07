import { UserAccount } from './userAccount';
export interface UserDispatchProps {
    changeUser: (user: UserAccount) => void;
    logOut: () => void;
}