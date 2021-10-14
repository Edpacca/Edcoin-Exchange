import './styles/userLogin.css';
import { Button, TextField } from '@material-ui/core';
import logo from '../../logo.svg';
import { AuthenticationRequest } from '../../models/authenticationRequest';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Status } from '../../models/status';

export function UserLogin(props: { loginDispatch: (authenticationRequest: AuthenticationRequest) => void,
    createUserDispatch: (authenticationRequest: AuthenticationRequest) => void,
    loginStatus: Status}) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [isCreatingNewUser, setIsCreatingNewUser] = useState<boolean>(false);
    const [errorRequired, setErrorRequired] = useState<boolean>(false);
    const [errorNoMatch, setErrorNoMatch] = useState<boolean>(false);
    
    const attemptLogin = () => {
        if (validate()) {
            const authReq: AuthenticationRequest = {
                username: username as string,
                password: password as string
            }
            const dispatch = isCreatingNewUser ? props.createUserDispatch : props.loginDispatch;
            dispatch(authReq);
        }
    }

    const validate = (): boolean => {
        if (!isCreatingNewUser) {
            if (!username || !password) {
                setErrorRequired(true);
                return false;
            }
        } else {
            if (!username || !password || !repeatPassword) {
                setErrorRequired(true);
                return false;
            }   
            if (password !== repeatPassword) {
                setErrorNoMatch(true);
                return false;
            }
        }
        return true;
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setValue: (value: string) => void) => {
        setErrorRequired(false);
        setErrorNoMatch(false);
        setValue(event.target.value);
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, key: string) => {
        if (event.key === key) {
            attemptLogin();
        }
    }
    
    return (
        <div className='login-panel'>
            <div>
                <img src={logo} className={`login-${props.loginStatus}`} alt='logo' />
                <div 
                    className='login-input' 
                    onKeyPress={(e) => handleKeyPress(e, 'Enter')}>
                    <TextField
                        placeholder="Username"
                        color="secondary"
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                        required={true}
                        error={errorRequired}
                        label={props.loginStatus === "failed" ? "Invalid username or password" : errorRequired ? "Required" : ""}
                        id={ errorRequired || props.loginStatus === "failed" ? "outlined-error" : ""}
                    />
                    <TextField
                        placeholder="Password"
                        color="secondary"
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        required={true}
                        error={errorRequired}
                        label={props.loginStatus === "failed" ? "Invalid username or password" : errorRequired ? "Required" : ""}
                        id={ errorRequired || props.loginStatus === "failed" ? "outlined-error" : ""}
                    />
                    {   isCreatingNewUser &&
                        <TextField
                        placeholder="Repeat Password"
                        color="secondary"
                        value={repeatPassword}
                        onChange={(e) => handleInputChange(e, setRepeatPassword)}
                        required={true}
                        error={errorRequired || errorNoMatch}
                        label={errorRequired ? "Required" : errorNoMatch ? "Passwords don't match" : ""}
                        id={ errorRequired ? "outlined-error" : ""}
                        />
                    }
                    <Button
                        onClick={attemptLogin}
                        color='primary'
                        variant='contained'
                        >{isCreatingNewUser ? 'Create Account' : 'Log in'}
                    </Button>
                    <Button 
                        onClick={() => setIsCreatingNewUser(!isCreatingNewUser)}
                        color='secondary'
                        variant='contained'
                        >{isCreatingNewUser ? 'Cancel' : 'Create new account'}
                    </Button>
                </div>
            </div>
        </div>
    )
}