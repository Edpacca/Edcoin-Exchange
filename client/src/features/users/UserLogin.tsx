import { ChangeEvent } from 'react';
import logo from '../../logo.svg';
import { UserAccount } from '../../models/userAccount';
import { DropDownSelect } from '../common/DropdownSelect';

export function UserLogin(props: {users: UserAccount[], changeUserDispatch: (user: UserAccount) => void}) {
    
    // TODO map users by ID:Name KVP dictionary pass in as props
    const handleDropDownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const userName = event.target.value;
        const user = props.users.find(u => u.name === userName);
        if (user) props.changeUserDispatch(user);
    }

    return (
        <div className='App-login'>
            <br/>
            <div>
                <br/>
                <img src={logo} className='App-logo login-logo' alt='logo' />
                <div className='user-login'>
                <br/>
                    <DropDownSelect
                        values={['Select User'].concat(props.users.map(user => user.name))}
                        id={'selectUser'}
                        onChange={handleDropDownChange}
                    />
                </div>
                <br/>
            </div>
            <br/>
        </div>
    )
}
