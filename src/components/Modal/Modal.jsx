import PropTypes from 'prop-types'
import { useForm } from "react-hook-form"
import { MdCancelPresentation } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider'

const Modal = ({ showModal, handleClose, handleJoinCamp, campData,readOnly }) => {
    const { user } = useContext(AuthContext);
    if (!showModal) {
        return null;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
       console.log(data)
        const participantData = {
            campName: data.name,
            healthcareProfessional: data.healthcareProfessional,
            location: data.location,
            campFees: parseInt(data.campFee),
            participantEmail: data.email,
            participantName: data.participantName,
            contactNumber: data.number,
            emergencyContact: data.emergency,
            participantAge: data.age,
            gender: data.gender,
            paymentStatus: "Unpaid",
            confirmationStatus: "pending"
        };
        handleJoinCamp(participantData);
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 md:w-[650px] shadow-lg rounded-md bg-gray-50">
                <div className="mt-3 text-center">
                    <h3 className="text-3xl leading-6 font-semibold text-gray-900">Join Camp</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit(onSubmit)} 
                        className='grid grid-cols-1 md:grid-cols-3 gap-6'
                        >
                            <div className="mb-4 md:col-span-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Camp Name
                                </label>
                                <input
                                    {...register('name')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    readOnly={readOnly}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={campData?.campName}
                                />
                            </div>
                            {/* camp fee */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Camp Fees
                                </label>
                                <input
                                    {...register('campFee')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    readOnly={readOnly}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={campData?.campFees}
                                />
                            </div>
                            {/* location */}
                            <div className="mb-4 md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Location
                                </label>
                                <input
                                    {...register('location')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    readOnly={readOnly}
                                   
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={campData?.location}
                                />
                            </div>
                            {/* HealthcareProfessional */}
                            <div className="mb-4 md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Healthcare Professional
                                </label>
                                <input
                                    {...register('healthcareProfessional')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    readOnly={readOnly}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={campData?.healthcareProfessional}
                                />
                            </div>
                            {/* Participant name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                   Participant Name
                                </label>
                                <input
                                    {...register('participantName',{required:true})}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={user?.displayName}
                                />
                                {errors.participantName && <span className='text-red-500'>This field is required</span>}
                            </div>
                            {/* Email */}
                            <div className="mb-4 md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    {...register('email', { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={user?.email}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            {/* Number */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Number
                                </label>
                                <input
                                    {...register('number', { required: true })}
                                    id="number"
                                    name="number"
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.number && <span className='text-red-500'>This field is required</span>}
                            </div>
                            {/* Number im*/}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                 Emergency Number
                                </label>
                                <input
                                    {...register('emergency', { required: true })}
                                   
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.emergency && <span className='text-red-500'>This field is required</span>}
                            </div>
                            {/* age */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Age
                                </label>
                                <input
                                    {...register('age', { required: true,min: 18, max: 99 })}
                                    id="age"
                                    name="age"
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.age && <span className='text-red-500'>This field is required ** age must be grater than 18</span>}
                            </div>
                            {/* age */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Gender
                                </label>
                                <select {...register("gender")}
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between md:col-span-3">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-6"
                                >
                                    Join <FaArrowRightLong />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
                                >
                                    <MdCancelPresentation /> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
Modal.propTypes = {
    campData: PropTypes.object,
    handleClose: PropTypes.func,
    handleJoinCamp: PropTypes.func,
    showModal: PropTypes.bool,
}
export default Modal;
