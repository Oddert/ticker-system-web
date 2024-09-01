import { ChangeEvent, FC, Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { debounce, FormControl, Typography } from '@mui/material';

import { ROUTES } from '../../../../constants/routerConstants';

import routes from '../../../../services/routes';

import {
    comparePasswords,
    passwordStrength,
} from '../../../../utils/signupUtils';

import { TextField } from '../../Login.styles';

import SubmitButton from '../SubmitButton';

import { IValidationMap, IValidationSet } from './NewUser.types';

/**
 * The "Sign Up" page allowing a user to make a new account.
 *
 * Links to the "Login" page.
 */
const NewUser: FC = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordError, setPasswordError] = useState<null | string>(null);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState<null | string>(null);

    const [usernameTaken] = useState<null | boolean>(null);
    const [loadingState, setLoadingState] = useState<
        'idle' | 'loading' | 'success'
    >('idle');

    const loading = Boolean(loadingState === 'loading');
    const success = Boolean(loadingState === 'success');

    const validationMap = useMemo<IValidationMap>(
        () => ({
            password: [
                setPasswordError,
                [
                    () => comparePasswords(password, confPassword),
                    () => passwordStrength(password),
                ],
            ],
            // username: [
            //     setUsernameError,
            //     [() => checkUsernameAvailable(usernameTaken)],
            // ],
        }),
        [
            confPassword,
            password,
            setPasswordError,
            setUsernameError,
            usernameTaken,
            username,
        ],
    );

    /**
     * Validates across the entire validation set defined above.
     * @returns True if any validation failed.
     */
    const performCompleteValidation = () => {
        let anyResult = false;
        Object.values(validationMap).forEach((validationSet) => {
            const response = validationSet[1].reduce(
                (acc: null | string, validator) => {
                    const result = validator();
                    if (result) {
                        return result;
                    }
                    return acc;
                },
                null,
            );
            if (response) {
                anyResult = true;
            }
            validationSet[0](response);
        });
        return anyResult;
    };

    /**
     * Checks a single validation set.
     * @param validationSet The validation set to check.
     */
    const validateSingle = (validationSet: IValidationSet) => {
        const response = validationSet[1].reduce(
            (acc: null | string, validator) => {
                const result = validator();
                if (result) {
                    return result;
                }
                return acc;
            },
            null,
        );
        validationSet[0](response);
    };

    // TODO: passwords to update on type but only if both have length
    // Use second validator set to perform a full.

    /**
     * Performs password validation triggered by the "confirm password" field.
     */
    const validateConfPassword = () => {
        validateSingle(validationMap.password);
    };

    /**
     * Performs password validation on the "password" field (not the confirm field).
     */
    const validatePassword = () => {
        if (password.length && confPassword.length) {
            validateSingle(validationMap.password);
        }
    };

    /**
     * Submits the input, performing a validation first
     */
    const handleSubmit = () => {
        setLoadingState('loading');
        const validation = performCompleteValidation();
        if (validation) {
            return null;
        }
        try {
            const createUser = async () => {
                await routes.createNewUser(username, password);
                setLoadingState('success');
                navigate(ROUTES.HOME);
            };
            createUser();
        } catch (error) {
            setLoadingState('idle');
            // TODO: error boundary
            console.error(error);
        }
    };

    /**
     * Debounced function to check if a username is taken while typing.
     *
     * Used in place of the validation set pattern in order to deal with the async nature of the requests.
     */
    const debounceCheck = debounce((changeValue: string) => {
        routes
            .checkUserExists(changeValue)
            .then((exists) => {
                if (exists) {
                    setUsernameError(
                        'A user with this username already exists',
                    );
                } else {
                    setUsernameError(null);
                }
            })
            .catch((err) => console.error(err));
    }, 500);

    /**
     * Handles change events for the username input.
     * @param event The change event.
     */
    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        debounceCheck(event.target.value);
    };

    /**
     * Disables the submit button on a number of conditions.
     */
    const submitDisabled = useMemo(
        () =>
            Boolean(
                !password.length ||
                    !username.length ||
                    passwordError ||
                    usernameError ||
                    loading,
            ),
        [password, username, passwordError, usernameError, loading],
    );

    return (
        <Fragment>
            <FormControl onSubmit={handleSubmit}>
                <Typography variant='h2'>Sign Up</Typography>
                <TextField
                    disabled={loading || success}
                    error={Boolean(usernameError)}
                    label='Username'
                    onChange={handleChangeUsername}
                    value={username}
                    variant='outlined'
                />
                {usernameError && (
                    <Typography color='error'>{usernameError}</Typography>
                )}
                <TextField
                    disabled={loading || success}
                    error={Boolean(passwordError)}
                    label='Password'
                    onBlur={validatePassword}
                    onChange={(event) => setPassword(event.target.value)}
                    type='password'
                    value={password}
                    variant='outlined'
                />
                <TextField
                    disabled={loading || success}
                    error={Boolean(passwordError)}
                    label='Confirm Password'
                    onBlur={validateConfPassword}
                    onChange={(event) => setConfPassword(event.target.value)}
                    type='password'
                    value={confPassword}
                    variant='outlined'
                />
                {passwordError && (
                    <Typography color='error'>{passwordError}</Typography>
                )}
                <SubmitButton
                    loading={loading}
                    onSubmit={handleSubmit}
                    submitDisabled={submitDisabled}
                    success={success}
                    text='Sign Up'
                />
            </FormControl>
        </Fragment>
    );
};

export default NewUser;
