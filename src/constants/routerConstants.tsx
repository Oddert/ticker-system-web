import { createBrowserRouter } from 'react-router-dom'

import CategoryIcon from '@mui/icons-material/Category'
import AllDataIcon from '@mui/icons-material/WaterfallChart'
import TransactionsIcon from '@mui/icons-material/ReceiptLong'

import Layout from '../components/Layout'

import Home from '../pages/Home'

export const ROUTES = Object.freeze({
    HOME: '/',
})

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
])

export const navigation = [
    {
        label: 'Transactions',
        Icon: TransactionsIcon,
        location: ROUTES.HOME,
    },
    {
        label: 'Categories',
        Icon: CategoryIcon,
        location: ROUTES.HOME,
    },
    {
        label: 'All Data',
        Icon: AllDataIcon,
        location: ROUTES.HOME,
    },
]

export default router
