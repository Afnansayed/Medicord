import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageCamp = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: addedOrganizer = [], refetch } = useQuery({
        queryKey: ['addedOrganizer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCamps?email=${user?.email}`);
            return res.data;
        }
    })
    //delete camp
    const handleCampDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#181ca3",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //Now delete work after confirmation
                axiosSecure.delete(`/allCamps/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "One Camps is permanently deleted in the database !",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });

    }
    // console.log(addedOrganizer)
    return (
        <div className="container mx-auto p-6 mt-12 md:mt-0">
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
                            addedOrganizer.map((data, idx) => <tr key={idx}>
                                <td className="py-2 px-4 border-b">{data?.campName}</td>
                                <td className="py-2 px-4 border-b">{data?.date}</td>
                                <td className="py-2 px-4 border-b">{data?.healthcareProfessional}</td>
                                <td className="py-2 px-4 border-b">{data?.location}</td>

                                <td className="py-2 px-4 border-b">
                                    <Link to={`update/${data?._id}`}>
                                        <p className="px-3 btn btn-sm text-xl bg-[#181ca3] text-[#ffff]"><MdOutlineModeEditOutline /></p>
                                    </Link>
                                </td>

                                <td className="py-2 px-4 border-b">
                                    <p onClick={() => handleCampDelete(data?._id)} className="px-3 btn btn-sm text-xl bg-red-600 text-[#ffff]"><MdOutlineDelete /></p>
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