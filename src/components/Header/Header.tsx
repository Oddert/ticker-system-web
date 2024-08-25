import React, { useState } from 'react';

import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import HomeIcon from '@mui/icons-material/FolderSpecial';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBar, drawerWidth } from './Header.styles';

import Sidebar from '../Sidebar/Sidebar';

const Header = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const handleClickHome = () => navigate('/');

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: (theme) => (theme.zIndex.drawer || 0) + 2,
            }}
        >
            <AppBar
                // sx={{
                //     position: 'sticky',
                //     top: 0,
                //     zIndex: (theme) => (theme.zIndex.drawer || 0) + 2
                // }}
                position="fixed"
                open={open}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleToggleDrawer}
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="home page"
                        onClick={handleClickHome}
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography
                        sx={(theme) => ({
                            [theme.breakpoints.up('xs')]: {
                                fontSize: '16px',
                            },
                            [theme.breakpoints.up('sm')]: {
                                fontSize: '20px',
                            },
                            [theme.breakpoints.up('md')]: {
                                fontSize: '26px',
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: '32px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                fontSize: '36px',
                            },
                        })}
                        variant="h1"
                    >
                        Tickler Files
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar
                drawerWidth={drawerWidth}
                handleDrawerClose={handleDrawerClose}
                open={open}
            />
        </Box>
    );
};

export default Header;
