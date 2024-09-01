import { createBrowserRouter } from 'react-router-dom';

import CategoryIcon from '@mui/icons-material/Category';
import AllDataIcon from '@mui/icons-material/WaterfallChart';
import TransactionsIcon from '@mui/icons-material/ReceiptLong';

import Layout from '../components/Layout';

import AllPrompts from '../pages/AllPrompts';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LookAhead from '../pages/LookAhead';

export const ROUTES = Object.freeze({
    ALL_PROMPTS: '/all-prompts',
    HOME: '/',
    LOGIN: '/login',
    LOOK_AHEAD: '/look-ahead',
});

// export const GO = Object.freeze({
//     HOME: () => push(ROUTES.HOME)
// })

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: (
            <Layout requiresAuth={true}>
                <Home />
            </Layout>
        ),
    },
    {
        path: ROUTES.LOOK_AHEAD,
        element: (
            <Layout requiresAuth={true}>
                <LookAhead />
            </Layout>
        ),
    },
    {
        path: ROUTES.ALL_PROMPTS,
        element: (
            <Layout requiresAuth={true}>
                <AllPrompts />
            </Layout>
        ),
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
    },
]);

export const navigation = [
    {
        label: 'Home',
        Icon: TransactionsIcon,
        location: ROUTES.HOME,
    },
    {
        label: 'Look Ahead',
        Icon: CategoryIcon,
        location: ROUTES.LOOK_AHEAD,
    },
    {
        label: 'All Data',
        Icon: AllDataIcon,
        location: ROUTES.ALL_PROMPTS,
    },
];

export default router;
