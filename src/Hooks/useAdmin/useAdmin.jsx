import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const {data: isAdmin , isPending: isAdminLoading } = useQuery({
          queryKey: ['isAdmin', user?.email],
          queryFn: async () => {
               const res = await axiosSecure.get(`/users/admin/${user?.email}`);
               return res.data?.admin;
          }
    })
    return [isAdmin ,isAdminLoading]
};

export default useAdmin;