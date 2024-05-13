import { FC, ReactNode, useEffect } from "react";
import AuthenticationNavbar from "../navbar/AuthenticationNavbar.component";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";

const AuthenticatedOverlay: FC<{ children: ReactNode }> = ({ children }) => {
    const authData = useSelector((state: RootState) => state.authentication.authData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authData) {
            if (!sessionStorage.getItem('las_auth')) {
                navigate(RoutingConstants.LOGIN);
            }
        }
    }, [authData])

    return (
        <div className={'h-full w-full flex flex-col bg-base-100'}>
			<AuthenticationNavbar />
			<div className={'w-full px-64 pt-8'}>
                {children}
            </div>
		</div>
    )
}

export default AuthenticatedOverlay;