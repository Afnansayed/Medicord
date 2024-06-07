import { useForm } from "react-hook-form"
import useUser from "../../Hooks/useUser/useUser";
const UpdateUserData = () => {
    const [userData] = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)
    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <h2 className="text-center text-2xl font-semibold">Update</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input defaultValue={userData?.email} {...register('email')} type="email" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input defaultValue={userData?.name} {...register('name')} type="text" placeholder="Name" className="input input-bordered"/>
                </div>
                <div className="form-control">
                <input onSubmit={handleSubmit(onSubmit)}  {...register('image')} type="file" className="file-input w-full max-w-xs" />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserData;