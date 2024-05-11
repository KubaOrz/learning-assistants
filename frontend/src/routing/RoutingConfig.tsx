import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { RoutingConstants } from './RoutingConstants';
import UnauthenticatedOverlay from '../components/shared/unauthenticated-overlay/UnauthenticatedOverlay.component';
import LoginPage from '../pages/login/LoginPage.component';
import RegisterPage from '../pages/register/RegisterPage.component';
import StartingPage from '../pages/starting/StartingPage.component';

export const routes = createBrowserRouter([
    {
        path: RoutingConstants.STARTING,
        element: (
            <UnauthenticatedOverlay>
                <Outlet />
            </UnauthenticatedOverlay>
        ),
        children: [
            {
                path: RoutingConstants.LOGIN,
                element: <LoginPage />
            },
            {
                path: RoutingConstants.REGISTER,
                element: <RegisterPage />
            },
            {
                path: RoutingConstants.STARTING,
                element: <StartingPage />
            }
        ]
    }
])