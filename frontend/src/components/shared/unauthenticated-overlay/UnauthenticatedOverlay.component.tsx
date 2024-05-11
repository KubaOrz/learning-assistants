import { FC, ReactNode } from "react";
import AuthenticationNavbar from "../navbar/AuthenticationNavbar.component";

const UnauthenticatedOverlay: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={'h-screen w-full flex flex-col bg-base-100'}>
			<AuthenticationNavbar />
			<div className={'w-full px-64 pt-8'}>
                {children}
            </div>
		</div>
    )
}

export default UnauthenticatedOverlay;