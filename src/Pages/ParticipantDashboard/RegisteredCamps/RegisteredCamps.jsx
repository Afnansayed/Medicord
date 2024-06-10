import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import useParticipantRegistered from "../../../Hooks/useParticipantRegistered/useParticipantRegistered";
import { Link } from "react-router-dom";


const RegisteredCamps = () => {
    const [myRegisteredCamp,refetch] = useParticipantRegistered();
    const axiosSecure = UseAxiosSecure();
    const handleMyRegisterDelete = id => {
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
                        <th className="py-2 px-4 border-b">Feedback</th>
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
                                myRegisterCamp?.paymentStatus === 'Unpaid' ? <Link to={`payment/${myRegisterCamp?._id}`}><p className="px-3 btn btn-sm  bg-[#181ca3] text-[#ffff]">Pay</p> </Link> : <p>{myRegisterCamp?.paymentStatus}</p>
                                } 

                                </td>
                            <td className="py-2 px-4 border-b">
                                    <p className="text-lg">{myRegisterCamp?.confirmationStatus}</p> 
                            </td>
                            <td className="py-2 px-4 border-b">
                                {
                                     myRegisterCamp?.paymentStatus === 'Paid' ? <p disabled className="px-3 btn btn-sm text-lg bg-green-600  text-[#ffff]"><GiConfirmed /></p> : <p onClick={() => handleMyRegisterDelete(myRegisterCamp?._id)} className="px-3 btn btn-sm text-lg bg-red-600 text-[#ffff]"><MdCancel /></p>
                                }
                            </td>
                            <td className="py-2 px-4 border-b">
                                {
                                   myRegisterCamp?.confirmationStatus === "Confirmed" && myRegisterCamp?.paymentStatus === 'Paid' ? <p className="px-3 btn btn-sm text-lg bg-[#181ca3]  text-[#ffff]">Feedback</p> : <p  >N/A</p>
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