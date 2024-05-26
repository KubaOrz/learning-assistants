import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RoutingConstants } from './RoutingConstants';
import UnauthenticatedOverlay from '../components/shared/unauthenticated-overlay/UnauthenticatedOverlay.component';
import LoginPage from '../pages/login/LoginPage.component';
import RegisterPage from '../pages/register/RegisterPage.component';
import StartingPage from '../pages/starting/StartingPage.component';
import AuthenticatedOverlay from '../components/shared/authenticated-overlay/AuthenticatedOverlay.component';
import Dashboard from '../pages/dashboard/Dashboard.component';
import CourseListPage from '../pages/course-list/CourseListPage.component';
import CourseManagementPage from '../pages/course-management/CourseManagementPage.component';
import CourseCreationDetails from '../pages/course-creation-details/CourseCreationDetails.component';
import EditLessonPage from '../pages/edit-lesson-page/EditLessonPage.component';
import LessonView from '../components/features/lesson-view/LessonView.component';
import CoursePage from '../pages/course/CoursePage.component';

export const routes = createBrowserRouter([
    {
        path: '/',
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
            },
            {
                path: RoutingConstants.COURSE_MANAGEMENT,
                element: <CourseManagementPage />
            },
            {
                path: RoutingConstants.COURSE_CREATION_DETAILS,
                element: <CourseCreationDetails />
            },
            {
                path: RoutingConstants.LESSON_EDITION,
                element: <EditLessonPage />
            },
            {
                path: RoutingConstants.COURSE_PAGE,
                element: <CoursePage />
            }
        ]
    }
])