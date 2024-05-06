import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SingUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/About";

const  router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><CheckOut/></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)

            },
            {
                path: 'bookings',
                element: <PrivateRoute><Bookings/></PrivateRoute>
            },
            {
                path: '/about',
                element: <About/>
            }
        ]
    }
])

export default  router;