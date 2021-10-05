import './styles/topBar.css';
import { LogOutButton } from "./LogOutButton";
import logo from '../../logo.svg';

export function TopBar(props: {hasActiveUser: boolean, activeUserName: string | undefined, logOut: () => void}) {
    return (
        <div>
            <div className="top-bar">
                <img src={logo} className='top-logo' alt='logo' />
                <div className="top-settings">
                    <LogOutButton
                        hasActiveUser={props.hasActiveUser}
                        logOut={props.logOut}/>
                </div>
                <p className="top-user">{props.hasActiveUser ? "Logged in as" : undefined} <br/> {props.activeUserName}</p>
                <div className="circuit"/>
            </div>
        </div>
    )
}