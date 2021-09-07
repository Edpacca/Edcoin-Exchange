import { Button } from '@material-ui/core';

export function LogOutButton(props: {hasActiveUser: boolean, logOut: (user: undefined) => void}) {
    return (
        <div className='logout-button'>
        {
            props.hasActiveUser ?
               <Button 
                    onClick={() => props.logOut(undefined)}
                    color='primary'
                    variant='contained'
                    >LOG OUT
                </Button> 
            : undefined
        }
        </div>
    )
}