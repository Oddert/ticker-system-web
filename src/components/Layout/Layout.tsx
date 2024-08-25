import { FC, ReactElement } from 'react';

import { Box } from '@mui/material';

import Header from '../Header/Header';

interface IProps {
    children: ReactElement;
}

const Layout: FC<IProps> = ({ children }) => (
    <Box>
        <Header />
        <Box sx={{ pt: '64px', pl: '80px' }}>{children}</Box>
    </Box>
);

export default Layout;
