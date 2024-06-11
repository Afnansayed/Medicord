import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import DynamicTittle from "../../../Sheared/DynamicTittle/DynamicTittle";


const PaymentHistory = () => {
      const axiosSecure = UseAxiosSecure();
      const {user} = useContext(AuthContext);
      const {data: paymentHistory = []} = useQuery({
        queryKey: ['paymentHistory'] ,
        queryFn:  async () => {
            const res = await axiosSecure.get(`/histories?email=${user?.email}`);
            return res.data;
        }
      })

    return (
        <div className="container mx-auto p-6 mt-12 md:mt-0">
            <DynamicTittle heading={'My Payment Records'} subHeading={'Review Your Past and Current Camp Transactions'}></DynamicTittle>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-[#181ca3] text-[#ffff]">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Camp Name</th>
                        <th className="py-2 px-4 border-b">Paid Amount</th>
                        <th className="py-2 px-4 border-b">Payment Status</th>
                        <th className="py-2 px-4 border-b">Transaction Id</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map(history =><tr key={history?._id} className="text-center">
                            <td className="py-2 px-4 border-b">{history?.name}</td>
                            <td className="py-2 px-4 border-b">{history?.campName}</td>
                            <td className="py-2 px-4 border-b">{history?.campFees} $</td>
                            <td className="py-2 px-4 border-b">
                                {history?.paymentStatus ? history?.paymentStatus : 'Paid' }</td>
                            <td className="py-2 px-4 border-b">
                                 {history?.trancejectionId} 
                            </td>
                        </tr> )}
                     
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default PaymentHistory;