import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";


const ManageCamp = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const {data: addedOrganizer = []} = useQuery({
        queryKey:['addedOrganizer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCamps?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(addedOrganizer)
    return (
        <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-[#181ca3] text-[#ffff]">
                    <tr>
                        <th className="py-2 px-4 border-b">Camp Name</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Healthcare Professional</th>
                        <th className="py-2 px-4 border-b">Location</th>
                        <th className="py-2 px-4 border-b">Action</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        addedOrganizer.map((data ,idx) => <tr key={idx}>
                            <td className="py-2 px-4 border-b">{data?.campName}</td>
                            <td className="py-2 px-4 border-b">{data?.date}</td>
                            <td className="py-2 px-4 border-b">{data?.healthcareProfessional}</td>
                            <td className="py-2 px-4 border-b">{data?.location}</td>
                            <td className="py-2 px-4 border-b">
                                <p className="px-3 btn btn-sm text-xl bg-[#181ca3] text-[#ffff]"><MdOutlineModeEditOutline /></p>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="px-3 btn btn-sm text-xl bg-red-600 text-[#ffff]"><MdOutlineDelete /></p>
                            </td>
                        
                        </tr>)
                     }
                        
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ManageCamp;