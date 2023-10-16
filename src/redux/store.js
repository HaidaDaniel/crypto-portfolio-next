import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cryptoApi } from './crypto.api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: { [cryptoApi.reducerPath]: cryptoApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware),
});

setupListeners(store.dispatch)