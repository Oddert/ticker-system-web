import { ChangeEvent, FC, Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Divider, Typography } from '@mui/material';

import { ROUTES } from '../../../../constants/routerConstants';

import routes from '../../../../services/routes';

import { TextField } from '../../Login.styles';

import SubmitButton from '../SubmitButton';

export interface IProps {
    /**
     * @param isExistingUser True if the user is on the login page, false for sign up.
     */
    setIsExistingUser: (isExistingUser: boolean) => void;
}

/**
 * The "Login" page allowing a user to sign in.
 *
 * Links to the "Sign Up" page.
 */
const ExistingUser: FC<IProps> = ({ setIsExistingUser }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loadingState, setLoadingState] = useState<
        'idle' | 'loading' | 'success'
    >('idle');

    const loading = Boolean(loadingState === 'loading');
    const success = Boolean(loadingState === 'success');

    /**
     * Change handler for the username field.
     */
    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    /**
     * Change handler for the password field.
     */
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        setLoadingState('loading');
        try {
            const loginUser = async () => {
                await routes.loginUser(username, password);
                setLoadingState('success');
                navigate(ROUTES.HOME);
            };
            loginUser();
        } catch (error) {
            setLoadingState('idle');
            console.error(error);
        }
    };

    /**
     * Disables the submit button on a number of conditions.
     */
    const submitDisabled = useMemo(
        () => Boolean(!password.length || !username.length || loading),
        [password, username, loading],
    );

    return (
        <Fragment>
            <Typography variant='h2'>Login</Typography>
            <TextField
                label='Username'
                onChange={handleChangeUsername}
                value={username}
                variant='outlined'
            />
            <TextField
                label='Password'
                onChange={handleChangePassword}
                value={password}
                variant='outlined'
            />
            <SubmitButton
                loading={loading}
                onSubmit={handleSubmit}
                submitDisabled={submitDisabled}
                success={success}
                text='Login'
            />
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
