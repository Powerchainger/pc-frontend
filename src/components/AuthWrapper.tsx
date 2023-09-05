import {ReactNode, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}
export default function AuthWrapper({ children }: LayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [location]);

    return <>{children}</>;
}
