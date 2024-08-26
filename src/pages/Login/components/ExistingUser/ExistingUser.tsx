import { FC, Fragment } from 'react';

import { Button, Divider, Typography } from '@mui/material';

import { TextField } from '../../Login.styles';

interface IProps {
    setIsExistingUser: (val: boolean) => void;
}

const ExistingUser: FC<IProps> = ({ setIsExistingUser }) => {
    return (
        <Fragment>
            <Typography variant='h2'>Login</Typography>
            <TextField label='Username' variant='outlined' />
            <TextField label='Password' variant='outlined' />
            <Button
                color='primary'
                sx={{
                    mt: '16px',
                    minWidth: '350px',
                }}
                variant='contained'
            >
                Login
            </Button>
            <Divider sx={{ height: '2px', width: '100%', mt: 3 }} />
            <Typography sx={{ mt: 3 }}>
                Need an account?{' '}
                <Button onClick={() => setIsExistingUser(false)} variant='text'>
                    Sign Up
                </Button>
            </Typography>
        </Fragment>
    );
};

export default ExistingUser;
