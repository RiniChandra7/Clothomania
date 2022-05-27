import {createContext, useState, useEffect} from 'react';
import { createUserDocFromAuth, onAuthStateChangedListener } from '../../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const val = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsub;
    }, []);

    return <UserContext.Provider value={val}>{children}</UserContext.Provider>
}