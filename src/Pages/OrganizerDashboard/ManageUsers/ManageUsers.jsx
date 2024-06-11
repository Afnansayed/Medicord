import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { MdOutlineDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import DynamicTittle from "../../../Sheared/DynamicTittle/DynamicTittle";


const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleUserStatus = id => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
               if(res.data.modifiedCount > 0){
                  refetch()
               }
               
            })
    }
    const handleUserDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                              refetch()
                        }
                    })

            }
        });
    }
    return (

        <div className="container mx-auto p-6 mt-12 md:mt-0">
            <DynamicTittle heading={'Manage Users'} subHeading={'Make sure first before make admin'}></DynamicTittle>
            <div className="overflow-x-auto">
                <table className="min-w-full text-center bg-white border border-gray-200">
                    <thead className="bg-[#181ca3] text-[#ffff]">
                        <tr>
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((data, idx) => <tr key={idx}>
                                <td className="py-2 px-4 border-b">{idx + 1}</td>
                                <td className="py-2 px-4 border-b">{data?.name}</td>
                                <td className="py-2 px-4 border-b">{data?.email}</td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        data?.role === 'admin' ? 'Admin' : <p onClick={() => handleUserStatus(data?._id)} className="px-3 btn btn-sm text-xl bg-[#181ca3] text-[#ffff]"><FaUsers /></p>
                                    }
                                </td>

                                <td className="py-2 px-4 border-b">
                                    <p onClick={() => handleUserDelete(data?._id)} className="px-3 btn btn-sm text-xl bg-red-600 text-[#ffff]"><MdOutlineDelete /></p>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;