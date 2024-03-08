import { createContext } from "react";
import { User, AuthPayload } from './UserInterfaces';

interface UserContextType {
    user: User | null;
    loginUser: (body: AuthPayload) => Promise<void | any>;
    logoutUser: () => Promise<void>;
    registerUser: (body: AuthPayload) => Promise<void | any>;
    getUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;