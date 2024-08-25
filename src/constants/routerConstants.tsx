import { createBrowserRouter } from 'react-router-dom';

import CategoryIcon from '@mui/icons-material/Category';
import AllDataIcon from '@mui/icons-material/WaterfallChart';
import TransactionsIcon from '@mui/icons-material/ReceiptLong';

import Layout from '../components/Layout';

import AllPrompts from '../pages/AllPrompts';
import Home from '../pages/Home';
import LookAhead from '../pages/LookAhead';

export const ROUTES = Object.freeze({
    HOME: '/',
    LOOK_AHEAD: '/look-ahead',
    ALL_PROMPTS: '/all-prompts',
});

// export const GO = Object.freeze({
//     HOME: () => push(ROUTES.HOME)
// })

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
    {
        path: ROUTES.LOOK_AHEAD,
        element: (
            <Layout>
                <LookAhead />
            </Layout>
        ),
    },
    {
        path: ROUTES.ALL_PROMPTS,
        element: (
            <Layout>
                <AllPrompts />
            </Layout>
        ),
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
