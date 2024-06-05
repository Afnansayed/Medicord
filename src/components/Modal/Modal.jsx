import  PropTypes from 'prop-types'
import { useForm } from "react-hook-form"
import { MdCancelPresentation } from "react-icons/md";
import { FaArrowRightLong  } from "react-icons/fa6";

const Modal = ({ showModal, handleClose, handleJoinCamp,campData}) => {
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
            name: data.name,
            email: data.email,
        };
        handleJoinCamp(participantData);
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const participantData = {
    //         name: formData.get("name"),
    //         email: formData.get("email"),
    //     };
    //     handleJoinCamp(participantData);
    // };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 md:w-[600px] shadow-lg rounded-md bg-gray-50">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Join Camp</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    {...register('name')}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    disabled
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={campData?.date}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    {...register('email',{required:true})}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
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
Modal.propTypes ={
    campData:PropTypes.object,
    handleClose:PropTypes.func,
    handleJoinCamp:PropTypes.func,
    showModal:PropTypes.bool,
}
export default Modal;
