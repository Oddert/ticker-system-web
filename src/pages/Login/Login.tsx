import { FC, useState } from 'react';

import { Box, Container, Paper } from '@mui/material';

import ExistingUser from './components/ExistingUser';
import Header from './components/Header';
import NewUser from './components/NewUser';
import SwitchMode from './components/SwitchMode';

const Login: FC = () => {
    const [isExistingUser, setIsExistingUser] = useState(true);

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
