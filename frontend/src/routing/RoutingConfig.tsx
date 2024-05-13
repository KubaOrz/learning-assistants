import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { RoutingConstants } from './RoutingConstants';
import UnauthenticatedOverlay from '../components/shared/unauthenticated-overlay/UnauthenticatedOverlay.component';
import LoginPage from '../pages/login/LoginPage.component';
import RegisterPage from '../pages/register/RegisterPage.component';
import StartingPage from '../pages/starting/StartingPage.component';
import AuthenticatedOverlay from '../components/shared/authenticated-overlay/AuthenticatedOverlay.component';
import Dashboard from '../pages/dashboard/Dashboard.component';
import CourseListPage from '../pages/course-list/CourseListPage.component';

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
    },
    {
        path: RoutingConstants.AUTHENTICATED_ROOT,
        element: (
            <AuthenticatedOverlay>
                <Outlet />
            </AuthenticatedOverlay>
        ),
        children: [
            {
                path: RoutingConstants.DASHBOARD,
                element: <Dashboard />
            },
            {
                path: RoutingConstants.COURSE_LIST,
                element: <CourseListPage />
            }
        ]
    }
])