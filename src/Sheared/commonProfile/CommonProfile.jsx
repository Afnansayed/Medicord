import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const CommonProfile = ({data}) => {
    return (
        <div className="flex flex-col justify-center w-96 h-96 md:h-auto p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800 items-center mt-48 md:mt-0">
        <img src={data?.image} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
            <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">{data?.name}</h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-600">{data?.email}</p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
                <Link to='/dashboard/updateProfile'><p className="btn px-5 bg-[#181ed8] text-[#fff]">Edit Profile <MdModeEditOutline /></p></Link>
            </div>
        </div>
    </div>
    );
};
CommonProfile.propTypes={
    data:PropTypes.array
}
export default CommonProfile;