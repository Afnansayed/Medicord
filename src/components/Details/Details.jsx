import { useLoaderData } from "react-router-dom";
import { BsChevronDoubleRight } from "react-icons/bs";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Details = () => {
    const camp = useLoaderData();
    const campData = camp.data;
   // console.log(camp.data)
    const {
        campName, campFees,
        date,
        description, healthcareProfessional,
        location, participantCount, image,} = campData;

        const [showModal, setShowModal] = useState(false);

        const handleJoinCamp = (participantData) => {
            // Handle the join camp logic here
            console.log("Participant Data:", participantData);
            setShowModal(false);
        };
    return (
        <section className="dark:bg-[#daebfb] dark:text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl">{campName}
                    </h1>
                    <p className="mt-6 text-lg mb-5">
                        {description}
                    </p>
                    <div className="mb-5 text-lg font-semibold">
                       <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><BsChevronDoubleRight /></span>Camp Fees : {healthcareProfessional}</p>
                       <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><BsChevronDoubleRight /></span>Camp Fees : {campFees}</p>
                       <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><BsChevronDoubleRight /></span>Location : {location}</p>
                       <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><BsChevronDoubleRight /></span>Date : {date}</p>
                       <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><BsChevronDoubleRight /></span>Total participant : {participantCount}</p>
                    </div>

                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <p  onClick={() => setShowModal(true)} className="px-8 py-3 text-lg font-semibold rounded dark:bg-[#181ed5] dark:text-gray-50">Join Camp</p>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={image} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
            </div>
            <Modal
                campData={campData}
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                handleJoinCamp={handleJoinCamp}
            />
        </section>
    );
};

export default Details;