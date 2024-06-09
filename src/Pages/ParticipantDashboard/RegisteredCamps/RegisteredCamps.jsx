import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";


const RegisteredCamps = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: myRegisteredCamp = [],refetch}= useQuery({
         queryKey: ['myRegisteredCamp', user?.email],
         queryFn: async () => {
             const res = await axiosSecure.get(`/participantCamps?email=${user?.email}`)
             return res.data;
         }
    })
    return (
        <div className="container mx-auto p-6 mt-12 md:mt-0">
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-[#181ca3] text-[#ffff]">
                    <tr>
                        <th className="py-2 px-4 border-b">Participant Name</th>
                        <th className="py-2 px-4 border-b">Camp Name</th>
                        <th className="py-2 px-4 border-b">Camp Fees</th>
                        <th className="py-2 px-4 border-b">Payment Status</th>
                        <th className="py-2 px-4 border-b">Confirmation Status</th>
                        <th className="py-2 px-4 border-b">Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myRegisteredCamp.map(myRegisterCamp => <tr key={myRegisterCamp?._id}>
                            <td className="py-2 px-4 border-b">{myRegisterCamp?.participantName}</td>
                            <td className="py-2 px-4 border-b">{myRegisterCamp?.campName}</td>
                            <td className="py-2 px-4 border-b">{myRegisterCamp?.campFees} $</td>
                            <td className="py-2 px-4 border-b">
                                {
                                myRegisterCamp?.paymentStatus === 'Unpaid' ?<p className="px-3 btn btn-sm  bg-[#181ca3] text-[#ffff]">Pay</p> : <p>{myRegisterCamp?.paymentStatus}</p>
                                } 

                                </td>
                            <td className="py-2 px-4 border-b">
                                {
                                    myRegisterCamp?.paymentStatus === 'Unpaid' ? <p>{myRegisterCamp?.confirmationStatus}</p> : <p className="px-3 btn btn-sm  bg-[#181ca3] text-[#ffff]">{myRegisterCamp?.confirmationStatus}</p>
                                }
                            </td>
                            <td className="py-2 px-4 border-b">
                                {
                                    myRegisterCamp?.confirmationStatus === "Confirmed" && myRegisterCamp?.paymentStatus === 'Paid' ? <p disabled className="px-3 btn btn-sm text-lg bg-green-600  text-[#ffff]"><GiConfirmed /></p> : <p  className="px-3 btn btn-sm text-lg bg-red-600 text-[#ffff]"><MdCancel /></p>
                                }
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default RegisteredCamps;