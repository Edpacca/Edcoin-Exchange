import { AuthenticationRequest } from './authenticationRequest';
export interface UserDispatchProps {
    login: (authenticationRequest: AuthenticationRequest) => void;
    logOut: () => void;
    createUserAccount: (authenticationRequest: AuthenticationRequest) => void;
}