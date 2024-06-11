import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateCampsData = () => {
    const singleCampData = useLoaderData();
    const previousData = singleCampData?.data;
    const axiosSecure = UseAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        //console.log(data)
        //how to host image in image bb
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image',image)
        

        axios.post(image_hosting_api,formData)
        .then(res => {
            if(res.data.success){
                const campInfo = {
                    campName: data?.campName,
                    campFees: parseInt(data?.campFees),
                    date: data?.date,
                    description: data?.description,
                    healthcareProfessional: data?.healthcareProfessional,
                    location: data?.location,
                    organizer: data?.organizer,
                    organizerEmail: data?.organizerEmail,
                    participantCount:parseInt(data?.participantCount),
                    image: res?.data?.data?.display_url
                }
               //console.log(campInfo)
                //update
                axiosSecure.put(`/allCamps/${previousData?._id}`,campInfo)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Camp Information updated successfully",
                          showConfirmButton: false,
                          timer: 2500
                        });
                    }
                })
            }
        })
    }
   // console.log(singleCampData.data)
    return (
        <div className="w-[80%] mt-24 md:mt-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate="" className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="md:col-span-3">
                <label htmlFor="name" className="text-sm">Camp name</label>
                <input defaultValue={previousData?.campName} {...register("campName",{required:true})} id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-100" />
                {errors.campName && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="md:col-span-2">
                <label htmlFor="date" className="text-sm">Date</label>
                <input defaultValue={previousData?.date} {...register("date",{required:true})} id="date" type="date" className="w-full p-3 rounded dark:bg-gray-100" />
                {errors.date && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <label htmlFor="fee" className="text-sm">Camp fee</label>
                <input defaultValue={previousData?.campFees} {...register("campFees",{required:true})} id="fee" type="number" className="w-full p-3 rounded dark:bg-gray-100" />
                {errors.campFees && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <label htmlFor="location" className="text-sm">Location</label>
                <input defaultValue={previousData?.location} {...register("location",{required:true})} id="location" type="text" className="w-full p-3 rounded dark:bg-gray-100" />
                {errors.location && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <label htmlFor="healthcare professional name" className="text-sm">Healthcare professional name</label>
                <input defaultValue={previousData?.healthcareProfessional} {...register("healthcareProfessional",{required:true})} id="health-care" type="text" className="w-full p-3 rounded dark:bg-gray-100" />
                {errors.healthcareProfessional && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <label htmlFor="Participant Count" className="text-sm">Participant Count</label>
                <input defaultValue={previousData?.participantCount} {...register("participantCount",{required:true})} id="Participant-Count" type="number" className="w-full p-3 rounded dark:bg-gray-100"  />
                {errors.participantCount && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="md:col-span-2">
                <label htmlFor="Participant Count" className="text-sm">Organizer Name</label>
                <input defaultValue={previousData?.organizer} {...register("organizer",{required:true})} id="Participant-Count" type="text" className="w-full p-3 rounded dark:bg-gray-100"  />
                {errors.organizer && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <label htmlFor="Participant Count" className="text-sm">Organizer Email</label>
                <input defaultValue={previousData?.organizerEmail} {...register("organizerEmail",{required:true})} id="Participant-Count" type="email" className="w-full p-3 rounded dark:bg-gray-100"  />
                {errors.organizerEmail && <span className="text-red-600">This field is required</span>}
            </div>
            
            <div className="md:col-span-3">
                <label htmlFor="description" className="text-sm">Description</label>
                <textarea defaultValue={previousData?.description} {...register("description",{required:true})} id="message" rows="3" className="w-full p-3 rounded dark:bg-gray-100"></textarea>
                {errors.description && <span className="text-red-600">This field is required</span>}
            </div>
            <div>
                <input  {...register("image",{required:true})} type="file" className="file-input w-full max-w-xs" />
                {errors.image && <span className="text-red-600">This field is required</span>}
            </div>
            <button  type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-[#181ca3] dark:text-gray-50 md:col-span-3">Update</button>
        </form>
    </div>
    );
};

export default UpdateCampsData;