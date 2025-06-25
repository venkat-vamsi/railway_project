import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/apiService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const { token } = await api.login({ email, password });
        const fullUser = await api.getUserByEmail(email);
        setUser({ ...fullUser, token });
    };

    const register = async (name, email, password) => {
        await api.register({ name, email, password });
        await login(email, password);
    };

    const logout = () => {
        setUser(null);
        api.logout();
    };

    useEffect(() => { setLoading(false); }, []);

    const value = { user, login, logout, register, isAuthenticated: !!user, loading, isAdmin: user?.roles?.includes('ROLE_ADMIN') };
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
