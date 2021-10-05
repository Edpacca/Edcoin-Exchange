import './styles/topBar.css';
import { LogOutButton } from "./LogOutButton";
import logo from '../../logo.svg';
import { UserAccount } from '../../models/userAccount';

export function TopBar(props: {activeUser: UserAccount | undefined, logOut: () => void}) {
    const hasActiveUser = props.activeUser !== undefined;
    return (
        <div>
            <div className="top-bar">
                <img src={logo} className='top-logo' alt='logo' />
                <div className="top-settings">
                    <LogOutButton
                        hasActiveUser={hasActiveUser}
                        logOut={props.logOut}/>
                </div>
                <p className="top-user">{hasActiveUser ? "Logged in as" : undefined} <br/> {props.activeUser?.name}</p>
                <div className="circuit"/>
            </div>
        </div>
    )
}