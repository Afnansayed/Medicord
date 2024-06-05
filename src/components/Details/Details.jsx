import { useLoaderData } from "react-router-dom";


const Details = () => {
    const camp = useLoaderData();
    console.log(camp.data)
    const {
        campName, campFees,
        date,
        description, healthcareProfessional,
        location, participantCount, image,_id } = camp.data;
    return (
        <div>
            {campName}
        </div>
    );
};

export default Details;