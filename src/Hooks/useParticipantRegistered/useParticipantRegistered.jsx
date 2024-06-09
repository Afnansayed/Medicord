import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useParticipantRegistered = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: myRegisteredCamp = [],refetch}= useQuery({
         queryKey: ['myRegisteredCamp', user?.email],
         queryFn: async () => {
             const res = await axiosSecure.get(`/participantCamps?email=${user?.email}`)
             return res.data;
         }
    })
    return [myRegisteredCamp,refetch];
};

export default useParticipantRegistered;