import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";

const useUser = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: userData =[],refetch} = useQuery({
        queryKey: ['userData' , user?.email],
         queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
         }
    })
    return [userData,refetch];
};

export default useUser;