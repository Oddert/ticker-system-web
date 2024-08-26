import { FC, Fragment } from 'react';

import { Button, Divider, Typography } from '@mui/material';

import { TextField } from '../../Login.styles';

interface IProps {
    setIsExistingUser: (val: boolean) => void;
}

const NewUser: FC<IProps> = ({ setIsExistingUser }) => {
    return (
        <Fragment>
            <Typography variant='h2'>Sign Up</Typography>
            <TextField label='Username' variant='outlined' />
            <TextField label='Password' variant='outlined' />
            <TextField label='Confirm Password' variant='outlined' />
            <Button
                color='primary'
                sx={{
                    mt: '16px',
                    minWidth: '350px',
                }}
                variant='contained'
            >
                Sign Up
            </Button>
            <Divider sx={{ height: '2px', width: '100%', mt: 3 }} />
            <Typography sx={{ mt: 3 }}>
                Already a user?{' '}
                <Button onClick={() => setIsExistingUser(true)} variant='text'>
                    Login
                </Button>
            </Typography>
        </Fragment>
    );
};

export default NewUser;
