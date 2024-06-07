import { useQuery } from "@tanstack/react-query";
import DynamicTittle from "../../Sheared/DynamicTittle/DynamicTittle";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { FaArrowRight } from "react-icons/fa6";
import banner from '../../assets/allCampBanner.jpg'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const AvailableCamps = () => {
    const axiosSecure = UseAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [order, setOrder] = useState('');
    const [layout, setLayout] = useState(false);
    const { data: totalCamp = [], refetch } = useQuery({
        queryKey: ['totalCamp'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCamps?search=${search}&sortBy=${filter}&order=${order}`);
            return res.data;
        }
    })

    useEffect(() => {
        refetch();
    }, [search, refetch,filter,order])
    const handleLayoutChange = (e) => {
        e.preventDefault();
        //setLayout(!layout); its also ok 
       // best practice
        setLayout(prevLayout => !prevLayout);
    };
 console.log(layout);
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
                                <form className="join ml-24 lg:ml-0">
                                    <div className="w-1/4 lg:w-full">
                                        <div onChange={e => setSearch(e.target.value)}>
                                            <input className="input input-bordered join-item" placeholder="Search" />
                                        </div>
                                    </div>
                                    <select onChange={e => setFilter(e.target.value)} className="select select-bordered join-item w-1/4 lg:w-full">
                                        <option value="">Filter</option>
                                        <option value="mostRegistered">Most Registered</option>
                                        <option value="campFees">Camp Fees</option>
                                        <option value="campName">Camp Name</option>
                                    </select>
                                    <select onChange={e => setOrder(e.target.value)} className="select select-bordered join-item w-1/4 lg:w-full">
                                        <option value="">Order</option>
                                        <option value="asc">Ascending</option>
                                        <option value="dsc">Descending</option>
                                    </select>
                                    <button onClick={handleLayoutChange} className="hidden md:inline-block px-5 btn join-item select-bordered  bg-[#181ed8] text-[#fff]">Change Layout</button>
                                </form>
                            </div>
                        </div>
                        <div  className={`grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 ${!layout? "lg:grid-cols-3": "lg:grid-cols-2" } `}>
                            {
                                totalCamp.map(tent => <div key={tent?._id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hover:scale-110">
                                    <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={tent?.image} />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl text-[#181ecf] font-semibold group-hover:underline group-focus:underline">{tent?.campName}</h3>
                                        <span className="text-xs dark:text-gray-600">{tent?.date}</span>
                                        <p>{tent?.description}</p>
                                        <div className="mb-5 text-lg font-semibold">
                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Camp Fees : {tent?.campFees}</p>
                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Location : {tent?.location}</p>
                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Doctor : {tent?.healthcareProfessional}</p>

                                            <p className="flex items-center gap-5 "><span className="text-[#181ed2]"><FaArrowRight /></span>Total participant : {tent?.participantCount}</p>
                                            <Link to={`/detail/${tent?._id}`}><p className="btn px-6 py-2 bg-[#181ed2] text-gray-50 mt-5">
                                                Details
                                            </p></Link>
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