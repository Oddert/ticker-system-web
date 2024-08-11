import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// import categoryReducer from '../slices/categorySlice'
// import transactionRouter from '../slices/transactionsSlice'
import promptSlice from '../slices/prompt/prompt.slice'

import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        // transaction: transactionRouter,
        // category: categoryReducer,
        prompt: promptSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch