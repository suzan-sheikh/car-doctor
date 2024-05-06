import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import toast from "react-hot-toast";
import axios from "axios";


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // createUser
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signInUser
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logOutUser
    const logout  = () => {
        setLoading(true)
        return signOut(auth)
        .then(() => {
            setUser(null)
            toast.success("Logout Success");          
        })
        .catch((error) => {
            console.error("Error during logout:", error);
            toast.error("Logout failed");
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          
          const userEmail = currentUser?.email || user?.email;

          const loggedUser = {email: userEmail}
          setUser(currentUser);
          console.log("CurrentUser-->", currentUser);
          setLoading(false);
                
        // if user exists then issue a token
        if(currentUser){
            
            axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true})
            .then(res => {
                console.log('token response', res.data);
            })
        }
        else{
            axios.post('http://localhost:5000/logout', loggedUser, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
        }

        });
        return () => {
          return unsubscribe();
        };
      }, []);



     const authInfo =  {
        user,
        loading,
        createUser,
        signInUser,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}            
        </AuthContext.Provider>
    );
};

export default AuthProvider;