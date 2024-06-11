import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import DynamicTittle from "../../../Sheared/DynamicTittle/DynamicTittle";


const ManageRegisteredCamps = () => {
    const axiosSecure = UseAxiosSecure();
    const participantCampCount = useLoaderData();
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [currentPage,setCurrentPerPage] = useState(0);
    const  count = participantCampCount?.data?.count;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    console.log(count,numberOfPages,pages)

    
    const { data: registeredCamps = [], refetch } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participantCamps?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })
    useEffect(() => {
        refetch() ;
    },[currentPage,itemsPerPage,refetch])
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
    const handleItemsPerPage = (e) => {
           const val = parseInt(e.target.value);
           setItemsPerPage(val)
           setCurrentPerPage(0);
    }
    const handleCurrentPage = page => {
        setCurrentPerPage(page);

    }
    const handlePrev = () => {
        if(currentPage > 0){
            setCurrentPerPage(currentPage - 1);
            
        }
    }
    const handleNext = () => {
        if(currentPage < pages.length -1){
            setCurrentPerPage(currentPage + 1);
        }
    }
    return (
        <div className="container mx-auto p-6 mt-12 md:mt-0">
            <DynamicTittle heading={'Camp Registrations Management'}
            subHeading={'Organize and Control Your Camp Participant Data'}
            ></DynamicTittle>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 text-center">
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
            <div className="flex justify-center mt-5 items-center">
                <button className="btn btn-sm bg-[#181ca3] px-4 text-[#ffff]" onClick={handlePrev}><ImPrevious2 className="text-lg" />Prev</button>
                {
                    pages.map(page => <button
                         key={page}
                         onClick={() => handleCurrentPage(page)}
                         className={currentPage === page ? "btn btn-sm m-2  text-[#ffff] bg-red-500": "btn btn-sm m-2 bg-[#181ca3] text-[#ffff]"}
                         >{page}</button>)
                }
                <button className="btn btn-sm bg-[#181ca3] px-4 text-[#ffff]" onClick={handleNext}>Next<ImNext2 className="text-lg" /></button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} className="bg-[#181ca3] ml-5 px-6 p-1 rounded-lg text-[#fff] text-center">
                       <option value="5">5</option>
                       <option value="10">10</option>
                       <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;