import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import Camp from "./Camp";



const PopularCamps = () => {
    const axiosPublic = useAxiosPublic();
    const { data: popularCamps = [] } = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allCamps')
            return res.data;
        }
    })
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    popularCamps.map(camp => <Camp key={camp._Id}
                        camp={camp}
                    ></Camp>)
                }
            </div>

        </div>
    );
};

export default PopularCamps;