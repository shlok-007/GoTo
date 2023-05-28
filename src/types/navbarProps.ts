import Profile_interface from "./profile_interface";

export default interface NavbarProps {
    isLogged: boolean;
    profile: Profile_interface;
    siteName: string;
    onLogout: () => void;
}