"use client";

import { useState } from 'react';

export const useApi = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [idUsuario, setIdUsuario] = useState<number | null>(
        localStorage.getItem('idUsuario') ? parseInt(localStorage.getItem('idUsuario')!) : null
    );

    const login = (token: string, idUsuario: number) => {
        setToken(token);
        setIdUsuario(idUsuario);
        localStorage.setItem('token', token);
        localStorage.setItem('idUsuario', idUsuario.toString());
    };

    const logout = () => {
        setToken(null);
        setIdUsuario(null);
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
    };

    return { token, idUsuario, login, logout };
};
