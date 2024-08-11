import React from 'react'

import { Box } from '@mui/material'

import Header from '../Header/Header'

const Layout = ({ children }) => (
    <Box>
        <Header />
        <Box sx={{ pt: '64px' }}>
            {children}
        </Box>
    </Box>
)

export default Layout
