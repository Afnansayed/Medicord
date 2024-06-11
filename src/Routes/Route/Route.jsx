import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import SignUp from "../../Pages/SignUp/SignUp";
import LogIn from "../../Pages/LogIn/LogIn";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import OrganizerHome from "../../Pages/OrganizerDashboard/OrganizerHome/OrganizerHome";
import AddCamp from "../../Pages/OrganizerDashboard/AddCamp/AddCamp";
import Details from "../../components/Details/Details";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import AvailableCamps from "../../Pages/AvailableCamps/AvailableCamps";
import UpdateUserData from "../../Sheared/UpdateUserData/UpdateUserData";
import ParticipantProfile from "../../Pages/ParticipantDashboard/ParticipantProfile/ParticipantProfile";
import ManageCamp from "../../Pages/OrganizerDashboard/ManageCamp/ManageCamp";
import UpdateCampsData from "../../Pages/OrganizerDashboard/UpdateCampsData/UpdateCampsData";
import PrivateRoutes from "../PrivateRoute/PrivateRoutes";
import ManageUsers from "../../Pages/OrganizerDashboard/ManageUsers/ManageUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import ManageRegisteredCamps from "../../Pages/OrganizerDashboard/ManageRegisteredCamps/ManageRegisteredCamps";
import RegisteredCamps from "../../Pages/ParticipantDashboard/RegisteredCamps/RegisteredCamps";
import Analytics from "../../Pages/ParticipantDashboard/Analytics/Analytics";
import Review from "../../Pages/ParticipantDashboard/Review/Review";
import Payment from "../../Pages/ParticipantDashboard/Payment/Payment";
import PaymentHistory from "../../Pages/ParticipantDashboard/PaymentHistory/PaymentHistory";

const axiosSecure = UseAxiosSecure();
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },{
                path: '/avail',
                element: <AvailableCamps/>
            },{
                path: '/signUp',
                element: <SignUp/>
            },{
                path: '/logIn',
                element: <LogIn/>
            },{
                path: '/detail/:id',
                element: <PrivateRoutes><Details/></PrivateRoutes>,
                loader: ({params}) => axiosSecure.get(`/allCamps/${params.id}`)
            }
        ]
    },{
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
        children:[
            //Organizer Routes
            {
                path:'organizerProfile',
                element:<AdminRoute><OrganizerHome/></AdminRoute>
            },{
                path: 'addCamp',
                element: <AdminRoute><AddCamp/></AdminRoute>
            },{
                path: 'manageCamps',
                element: <AdminRoute><ManageCamp></ManageCamp></AdminRoute>
            },{
                path: 'manageCamps/update/:id',
                element: <AdminRoute><UpdateCampsData></UpdateCampsData></AdminRoute>,
                loader:  ({params}) => axiosSecure.get(`/allCamps/${params.id}`)
            },{
                path: 'manageRegisteredCamps',
                element: <AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute>,
                loader: () => axiosSecure.get('/participantCampsCount')
            },{
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            // common route
            {
                path:'updateProfile',
                element: <UpdateUserData></UpdateUserData>,
            },
            //Participant route
            {
                path:'participantProfile',
                element: <ParticipantProfile></ParticipantProfile>
            },{
                path:'analytics',
                element: <Analytics></Analytics>
            },{
                path: 'registeredCamps',
                element: <RegisteredCamps></RegisteredCamps>
            },{
                path: 'feedback',
                element: <Review></Review>
            },{
                path: 'registeredCamps/payment/:id',
                element: <Payment/>,
                loader: ({params}) => axiosSecure.get(`/participantCamps/${params.id}`)
            },{
                path: 'history',
                element:<PaymentHistory></PaymentHistory>
            }
        ]
    }
])