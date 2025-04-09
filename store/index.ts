import { configureStore } from '@reduxjs/toolkit';
import borrowReducer from './borrowingSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as the default storage

// Persist configuration
const persistConfig = {
    key: 'root', // Key for the persisted state
    storage, // Use localStorage to persist the state
};

// Wrap the borrowReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, borrowReducer);

export const store = configureStore({
    reducer: {
        borrow: persistedReducer, // Use the persisted reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store); // Create the persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;