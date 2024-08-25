import React from 'react';
import { Link } from 'react-router-dom';

import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    styled,
} from '@mui/material';

import { navigation } from '../../constants/routerConstants';

interface Props {
    drawerWidth: number;
    handleDrawerClose: (args: any) => void;
    open: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Sidebar: React.FC<Props> = ({ drawerWidth, handleDrawerClose, open }) => {
    const theme = useTheme();
    return (
        <Drawer
            onClose={handleDrawerClose}
            open={open}
            sx={{ width: drawerWidth }}
            variant="permanent"
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl'}
                </IconButton>
            </DrawerHeader>
            <List>
                {navigation.map(({ label, Icon, location }, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        title={label}
                        sx={{ display: 'block' }}
                    >
                        <Link to={location}>
                            <ListItemButton
                                onClick={handleDrawerClose}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    borderRadius: '8px',
                                    margin: '8px',
                                    ...(location === window.location.pathname
                                        ? {
                                              background:
                                                  theme.palette.secondary.dark,
                                          }
                                        : {}),
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon />
                                </ListItemIcon>
                                {open && <ListItemText primary={label} />}
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

Sidebar.defaultProps = {
    handleDrawerClose: () => {},
    open: false,
};

export default Sidebar;
