import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Check for existing session on load
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (password: string) => {
        if (password === 'pass123') { // Simple check for guest
            const basicAuth = 'Basic ' + btoa('guest:pass123'); // Encoding credentials
            setToken(basicAuth);
            setIsAuthenticated(true);
            localStorage.setItem('auth_token', basicAuth);
            return true;
        }
        return false;
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('auth_token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
