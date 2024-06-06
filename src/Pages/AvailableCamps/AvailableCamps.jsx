import { useQuery } from "@tanstack/react-query";
import DynamicTittle from "../../Sheared/DynamicTittle/DynamicTittle";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { FaArrowRight } from "react-icons/fa6";
import banner from '../../assets/allCampBanner.jpg'
const AvailableCamps = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: totalCamp = [] } = useQuery({
        queryKey: ['totalCamp'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCamps`);
            return res.data;
        }
    })
    return (
        <div className="">
            <div>
                <DynamicTittle heading={'Our Camps those are Stand For Humanity'} subHeading={'WE ARE TRYING OUR BEST TO SERVE THE NATION'}></DynamicTittle>
            </div>
            <div>

                <section className="dark:bg-gary-50 md:py-10 dark:text-gray-800">
                    <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:h-96 h-48  dark:bg-gray-50 bg-cover bg-no-repeat " style={{ backgroundImage: `url(${banner})` }}>
                            <div className="p-6 space-y-2 bg-gradient-to-r from-[#879ca4] to-[#e5eef72B]   w-full h-full flex justify-center items-center flex-col" >
                                <h2 className="md:text-3xl text-lg font-bold lg:w-1/2 text-center text-[#0c0c44] lg:mb-6">We are organize most prestigious camp in all over the world</h2>
                                <div className="join ml-24 lg:ml-0">
                                    <div className="w-1/4 lg:w-full">
                                        <div>
                                            <input className="input input-bordered join-item" placeholder="Search" />
                                        </div>
                                    </div>
                                    <select className="select select-bordered join-item w-1/4 lg:w-full">
                                        <option disabled selected>Filter</option>
                                        <option>Sci-fi</option>
                                        <option>Drama</option>
                                        <option>Action</option>
                                    </select>
                                    <div className="indicator w-1/4 lg:w-full">
                                        <button className="btn join-item">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                totalCamp.map(tent => <div key={tent?._id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                    <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={tent?.image} />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl text-[#181ecf] font-semibold group-hover:underline group-focus:underline">{tent?.campName}</h3>
                                        <span className="text-xs dark:text-gray-600">{tent?.date}</span>
                                        <p>{tent?.description}</p>
                                        <div className="mb-5 text-lg font-semibold">
                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Camp Fees : {tent?.campFees}</p>
                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Location : {tent?.location}</p>

                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Total participant : {tent?.participantCount}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="flex justify-center">
                            <button type="button" className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600">Load more posts...</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AvailableCamps;