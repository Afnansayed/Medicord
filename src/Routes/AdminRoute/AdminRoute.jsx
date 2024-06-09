import { useContext } from "react";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading] = useAdmin();
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(isAdminLoading || loading){
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;
    }
    if(user && isAdmin){
        return children;
    }
    return  <Navigate to='/logIn' state={location?.pathname}></Navigate>
};
AdminRoute.propTypes={
    children: PropTypes.node
}
export default AdminRoute;