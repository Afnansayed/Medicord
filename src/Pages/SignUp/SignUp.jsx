import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const {createUser,updateUser} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
   // console.log(createUser)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
       
       // console.log(data)
       //*** hear I  work in for found image   */
        //console.log(data.image)
        const image = data.image[0]
       // console.log(image)
        const formData = new FormData()
        formData.append('image', image)
       // console.log(formData)
       //** after found the image i simply host in imageBB **/
        axios.post(image_hosting_api, formData)
        .then(res => {
            if (res.data.success) {
                console.log(res.data.data.display_url)
                const image = res.data.data.display_url;
                //create user
                console.log(data?.email,data?.password)
                createUser(data?.email,data.password)
                .then(res => {
                    console.log(res.user);
                    // here I update user name and image as displayName,and photoURL.
                    updateUser(data?.name,image)
                    .then( () => {
                        //console.log('user updated successfully');
                        const userInfo ={
                            name:data?.name,
                            email:data?.email,
                            image: image,
                        }
                        console.log(userInfo)
                        //send the user info in the database
                        axiosSecure.post('/users',userInfo)
                        .then(res => {
                            if(res.data.insertedId){
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: "User updated successfully",
                                  showConfirmButton: false,
                                  timer: 1500
                                }); 
                                reset();
                            }
                        })
                    })
                })
                .catch(error => {
                    console.error(error);
                })
                } 
        })
    };

    return (
        <div className="dark:text-[#ffff] dark:bg-gray-50 min-h-screen flex items-center">
            <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center dark:bg-[#122738] dark:text-[#ffff] mx-auto">
                <h1 className="text-3xl font-semibold">Create your account</h1>
                <a className="text-sm dark:text-[#ffff]" href="/">And start your journey with us</a>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col justify-start space-y-2">
                            <label>Name</label>
                            <input {...register("name")} type="text" placeholder="Enter Your Name .." className="rounded-sm dark:border-gray-400 dark:bg-gray-50 dark:text-gray-800 focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2 p-2" />
                        </div>
                        <div className="flex flex-col justify-start space-y-2">
                            <label>Email address</label>
                            <input {...register("email")} type="email" placeholder="Email address" className="rounded-sm dark:border-gray-400 dark:bg-gray-50 dark:text-gray-800 focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2 p-2" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password">Password</label>
                            <input {...register("password")} type="password" placeholder="Password" className="-mt-1 rounded-sm p-2 dark:border-gray-400 dark:bg-gray-50 dark:text-gray-800 focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="image">Upload Image</label>
                            <input {...register("image")} type="file" className="file-input file-input-bordered w-full text-gray-400 font-semibold" />
                        </div>
                    </div>
                    <button type="submit" className="px-8 py-3 space-x-2 font-semibold rounded border-2 hover:bg-[#181dc6] dark:text-gray-50">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
