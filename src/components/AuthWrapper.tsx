import {ReactNode, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}
export default function AuthWrapper({ children }: LayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const allowedPaths = ['/login', '/register'];
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== "true" && allowedPaths.indexOf(location.pathname) === -1 ) {
            navigate('/login');
        }
    }, [location]);

    return <>{children}</>;
}
