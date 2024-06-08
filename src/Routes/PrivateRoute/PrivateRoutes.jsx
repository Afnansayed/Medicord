import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;
    }
    if(user){
    return children;
    }
    return <Navigate to='/logIn' state={location?.pathname}></Navigate>
};
PrivateRoutes.propTypes={
    children: PropTypes.node
}
export default PrivateRoutes;