import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";


const ManageRegisteredCamps = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: registeredCamps = [], refetch } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/participantCamps');
            return res.data;
        }
    })

    //delete 
    const handleRegisteredCampDelete = id => {
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
                //delete camps registered
                axiosSecure.delete(`/participantCamps/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                              refetch();
                        }
                    })

            }
        });
    }

    const handleStatus = id => {
        
        //
        axiosSecure.patch(`/participantCamps/${id}`,{
            confirmationStatus: "Confirmed"})
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch()
                }
               
            })

    }
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
                            registeredCamps.map(registerCamp => <tr key={registerCamp?._id}>
                                <td className="py-2 px-4 border-b">{registerCamp?.participantName}</td>
                                <td className="py-2 px-4 border-b">{registerCamp?.campName}</td>
                                <td className="py-2 px-4 border-b">{registerCamp?.campFees} $</td>
                                <td className="py-2 px-4 border-b">{registerCamp?.paymentStatus} </td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        registerCamp?.paymentStatus === 'Unpaid' ? <p>{registerCamp?.confirmationStatus}</p> : <p className="px-3 btn btn-sm  bg-[#181ca3] text-[#ffff]"
                                        onClick={() => handleStatus(registerCamp?._id)}
                                        disabled={registerCamp?.confirmationStatus === "Confirmed"}>Confirm</p>
                                    }
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        registerCamp?.confirmationStatus === "Confirmed" && registerCamp?.paymentStatus === 'Paid' ? <p disabled className="px-3 btn btn-sm text-lg bg-green-600  text-[#ffff]"><GiConfirmed /></p> : <p onClick={() => handleRegisteredCampDelete(registerCamp?._id)} className="px-3 btn btn-sm text-lg bg-red-600 text-[#ffff]"><MdCancel /></p>
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

export default ManageRegisteredCamps;