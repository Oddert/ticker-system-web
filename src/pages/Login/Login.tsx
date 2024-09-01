import { FC, useState } from 'react';
import { Navigate } from 'react-router';

import { Box, Container, Paper } from '@mui/material';

import { ROUTES } from '../../constants/routerConstants';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';

import { getIsAuthenticated } from '../../redux/slices/authentication/authentication.selector';

import ExistingUser from './components/ExistingUser';
import Header from './components/Header';
import NewUser from './components/NewUser';
import SwitchMode from './components/SwitchMode';

const Login: FC = () => {
    const [isExistingUser, setIsExistingUser] = useState(true);

    const isAuth = useAppSelector(getIsAuthenticated);

    if (isAuth) {
        return <Navigate to={ROUTES.HOME} />;
    }

    return (
        <Container>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 8,
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 6,
                        py: 3,
                        mt: 8,
                    }}
                >
                    {isExistingUser ? <ExistingUser /> : <NewUser />}
                    <SwitchMode
                        isExisting={isExistingUser}
                        setIsExistingUser={setIsExistingUser}
                    />
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
