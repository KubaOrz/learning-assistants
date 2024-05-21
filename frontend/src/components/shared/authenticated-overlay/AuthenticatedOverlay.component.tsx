import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";
import AuthenticatedNavbar from "../navbar/Navbar.component";
import { setAuthenticationData } from "../../../redux/authentication/Authentication.slice";

const AuthenticatedOverlay: FC<{ children: ReactNode }> = ({ children }) => {
    const authData = useSelector((state: RootState) => state.authentication.authData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authData) {
            const storageAuth = sessionStorage.getItem('las_auth');
            if (!storageAuth) {
                navigate(RoutingConstants.LOGIN);
            } else {
                dispatch(setAuthenticationData(JSON.parse(storageAuth)));
            }
        }
    }, [authData])

    return (
        <div className={'min-h-screen w-full flex flex-col bg-base-100'}>
			<AuthenticatedNavbar />
			<div className={'w-full px-64 pt-8'}>
                {children}
            </div>
		</div>
    )
}

export default AuthenticatedOverlay;