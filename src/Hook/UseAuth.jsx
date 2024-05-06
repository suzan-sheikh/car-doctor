import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const UseAuth = () => {
    const all = useContext(AuthContext);
    return all;
};

export default UseAuth;