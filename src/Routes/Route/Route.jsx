import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import SignUp from "../../Pages/SignUp/SignUp";
import LogIn from "../../Pages/LogIn/LogIn";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },{
                path: '/signUp',
                element: <SignUp/>
            },{
                path: '/logIn',
                element: <LogIn/>
            }
        ]
    }
])