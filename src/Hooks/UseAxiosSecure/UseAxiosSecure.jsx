import axios from "axios";
import { getAuth, signOut } from "firebase/auth";


const firebaseLogout = () => {
    const auth = getAuth();
    return signOut(auth);
}


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const UseAxiosSecure = () => {
    // const navigate = useNavigate();
    // const {logOut} = useContext(AuthContext);
    // axiosSecure.interceptors.request.use(function (config) {
    //     const token = localStorage.getItem('access-token');
    //     console.log("Request intercept by interceptor",token)
    //     // Do something before request is sent
    //     config.headers.authorization = `Bearer ${token}`
    //     return config;
    //   }, function (error) {
    //     // Do something with request error
    //     return Promise.reject(error);
    //   });

    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token');
        //console.log('Request intercept by interceptor' ,token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
   // for response

    axiosSecure.interceptors.response.use(function(response) {
         return response;
    }, async (error) =>  {
       // console.log('Error from interceptor' , error);
        const status = error?.response?.status;
        console.log(status)
        if(status === 401 || status === 403){
            // await logOut();
        //    navigate('/logIn')
         await firebaseLogout();

        console.log('error')
        }

        return Promise.reject(error)
    })

    return  axiosSecure;
};

export default UseAxiosSecure;