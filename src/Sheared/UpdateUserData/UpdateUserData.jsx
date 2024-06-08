import { useForm } from "react-hook-form"
import useUser from "../../Hooks/useUser/useUser";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateUserData = () => {
    const [userData,refetch] = useUser();
    const axiosSecure = UseAxiosSecure();
    const { updateUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
      //  console.log(data)
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);

        axios.post(image_hosting_api, formData)
            .then(res => {
                if (res.data.success) {
                    //console.log(res.data.data.display_url);
                    const updatedInfo = {
                        name: data.name,
                        image: res.data.data.display_url
                    }
                    //console.log(updatedInfo);
                    //firebase update
                    // setEmail(data?.email)
                    // .then(() => {
                    //     console.log('email updated successfully')
                    // })
                    updateUser(data?.name, res.data.data.display_url)
                        .then(() => {
                                //update user info
                                axiosSecure.patch(`users/${userData?._id}`,updatedInfo)
                                .then(res => {
                                    if(res.data.modifiedCount > 0){                    
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "User information updated successfully",
                                            showConfirmButton: false,
                                            timer: 3000
                                          });
                                          refetch()
                                    }
                                })
                        

                        })
                        .catch(error => console.error(error))
                }
            })
    }
    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#e1e7ee]">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <h2 className="text-center text-2xl font-semibold">Update</h2>
                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input defaultValue={userData?.email} {...register('email',{required:true})} type="email" placeholder="email" className="input input-bordered" />
                    {errors.email && <span className="text-red-500">This field is required</span>}
                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input defaultValue={userData?.name} {...register('name', { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="form-control">
                    <input onSubmit={handleSubmit(onSubmit)}  {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    {errors.image && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserData;