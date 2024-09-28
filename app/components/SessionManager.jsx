'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { setSession } from '@/lib/features/sessionSlice';

const SessionManager = ({ children }) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch(setSession(session));
        } else if (status === 'unauthenticated') {
            dispatch(setSession(null));
        }
    }, [session, status, dispatch]);

    return <>{children}</>;
};

export default SessionManager;
