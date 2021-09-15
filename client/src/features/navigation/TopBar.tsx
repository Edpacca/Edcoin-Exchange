import './styles/topBar.css';
import { LogOutButton } from "./LogOutButton";
import logo from '../../logo.svg';

export function TopBar(props: {hasActiveUser: boolean, logOut: () => void}) {
    return (
        <div>
            <div className="top-bar">
                <img src={logo} className='top-logo' alt='logo' />
                <div className="top-settings">
                    <LogOutButton
                        hasActiveUser={props.hasActiveUser}
                        logOut={props.logOut}/>
                </div>
                <div className="circuit"/>
            </div>
        </div>
    )
}