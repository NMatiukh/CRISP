import {configureStore} from "@reduxjs/toolkit";
import {app, auth, firestore, database} from "../firebase/firebase";
import {combineReducers} from 'redux'
import {
    firebaseReducer, actionTypes,
} from 'react-redux-firebase'

import {createFirestoreInstance, firestoreReducer} from 'redux-firestore'
import firebase from "firebase/compat/app";
import shoppingCartProductsReducer from "./reducers/shoppingCartProductsReducer";


const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    profileParamsToPopulate: [
        {child: 'roles', root: 'roles'}, // populates user's role with matching role object from roles
    ],
    profileFactory: user => {
        const profile = {
            email: user.email || user.providerData[0].email,
            role: 'user',
        }
        if (user.providerData && user.providerData.length) {
            profile.providerData = user.providerData
        }
        return profile
    },
    enableClaims: true,
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
};

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    shoppingCardProducts: shoppingCartProductsReducer
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
        }
    }),
    devTools: process.env.NODE_ENV !== 'production', // Вимикаємо Redux DevTools у продакшн
})
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};