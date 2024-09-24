'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react';
import { setSession } from '@/lib/features/sessionSlice';

const SessionManager = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            dispatch(setSession(session));
        };
        fetchSession();
    }, [dispatch]);

    return <>{children}</>;
};

export default SessionManager;
