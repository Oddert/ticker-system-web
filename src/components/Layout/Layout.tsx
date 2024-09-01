import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router';

import { Box } from '@mui/material';

import { ROUTES } from '../../constants/routerConstants';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';

import { getIsAuthenticated } from '../../redux/slices/authentication/authentication.selector';

import Header from '../Header/Header';

interface IProps {
    children: ReactElement;
    requiresAuth?: boolean;
}

const Layout: FC<IProps> = ({ children, requiresAuth = false }) => {
    const isAuth = useAppSelector(getIsAuthenticated);

    if (requiresAuth && !isAuth) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return (
        <Box>
            <Header />
            <Box sx={{ pt: '64px', pl: '80px' }}>{children}</Box>
        </Box>
    );
};

export default Layout;
