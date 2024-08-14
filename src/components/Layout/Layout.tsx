import { FC, ReactElement } from 'react'

import { Box } from '@mui/material'

import Header from '../Header/Header'

interface iProps {
    children: ReactElement
}

const Layout: FC<iProps> = ({ children }) => (
    <Box>
        <Header />
        <Box sx={{ pt: '64px', pl: '80px' }}>
            {children}
        </Box>
    </Box>
)

export default Layout
