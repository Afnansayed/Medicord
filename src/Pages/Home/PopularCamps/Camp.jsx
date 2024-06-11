import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Camp = ({ camp }) => {
    const {
        campName, campFees,
        date,
         healthcareProfessional,
        location, participantCount, image,_id } = camp;
    return (
        <div>
            <div className="dark:bg-gray-100 dark:text-gray-900">
                <div className="container grid grid-cols-12 mx-auto dark:bg-gray-50">
                    <div className="bg-no-repeat bg-cover dark:bg-gray-300 col-span-full lg:col-span-4" style={{ backgroundImage: `url(${image})`, backgroundPosition: "center center", backgroundBlendMode: "multiply", backgroundSize: "cover" }}></div>
                    <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                        <div className="flex justify-start">
                            <span className="px-2 py-1 text-xs rounded-full dark:bg-[#181ED5] dark:text-gray-50">Label</span>
                        </div>
                        <h1 className="text-3xl font-semibold">{campName}</h1>
                        <p>Participate People: {participantCount}</p>
                         <div className='flex gap-10'>
                            <p>Camp Fees : {campFees} $</p>
                            <p>Location: {location}</p>
                         </div>
                        <div className="flex items-center gap-10 pt-2">
                            <div className="flex space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 dark:text-[#181ED5]">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                                <span className="self-center text-sm">{healthcareProfessional}</span>
                            </div>
                            <span className="text-xs">Post-Date : {date}</span>
                        </div>
                        <div className='flex mt-3 gap-6'>
                            <Link to={`/detail/${_id}`}><p className='px-3 bg-[#181ED5] text-[#ffff] btn btn-sm'>View Details</p></Link>
                            
                            <Link to='/avail'><p className='px-3 bg-[#181ED5] text-[#ffff] btn btn-sm'>Available Camp</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Camp.propTypes = {
    camp: PropTypes.object,
}
export default Camp;