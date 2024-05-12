import { CustomFlowbiteTheme } from "flowbite-react";

const theme: CustomFlowbiteTheme = {
    button: {
        color: {
            primary: "bg-primary text-base-100 hover:bg-primary-hover",
            secondary: "bg-secondary text-dark hover:bg-secondary-hover",
            accent: "bg-accent text-base-100 hover:bg-accent-hover",
            neutral: "bg-neutral text-base-100 hover:bg-neutral-hover",
            "base-100": "bg-base-100 text-neutral hover:bg-base-100-hover",
            info: "bg-info text-base-100 hover:bg-info-hover",
            success: "bg-success text-base-100 hover:bg-success-hover",
            warning: "bg-warning text-base-100 hover:bg-warning-hover",
            error: "bg-error text-base-100 hover:bg-error-hover",
        },
    },
};

export default theme;