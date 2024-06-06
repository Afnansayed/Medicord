import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import Camp from "./Camp";
import DynamicTittle from "../../../Sheared/DynamicTittle/DynamicTittle";



const PopularCamps = () => {
    const axiosPublic = useAxiosPublic();
    const { data: popularCamps = [] } = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allCamps?popular=${true}&limit=${6}`)
            return res.data;
        }
    })
    return (
        <div>
            <DynamicTittle heading={"Popular Camps"} subHeading={"Our most join camp"}></DynamicTittle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    popularCamps.map(camp => <Camp key={camp._id}
                        camp={camp}
                    ></Camp>)
                }
            </div>

        </div>
    );
};

export default PopularCamps;