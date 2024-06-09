import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import useAdmin from "../../Hooks/useAdmin/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    //console.log(isAdmin)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center relative">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute top-5 right-5 text-3xl font-bold text-[#ffffff]"><HiOutlineMenuAlt1 /></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-[#181ca3] text-base-content  text-xl md:space-y-2 ">
                        {/* Sidebar content here */}
                        {
                            isAdmin ? <>
                        {/* Organizers  route */}
                        {/* 01 */}
                        <NavLink to='/dashboard/organizerProfile'><li className="text-[#ffff]">Organizer Profile</li></NavLink>
                        {/* 2 */}
                        <NavLink to='/dashboard/addCamp'><li className="text-[#ffff]"> Add A Camp</li></NavLink>
                        {/* 3 */}
                        <NavLink to='/dashboard/manageCamps'><li className="text-[#ffff]">Manage Camps</li></NavLink>
                        <NavLink to='/dashboard/manageUsers'><li className="text-[#ffff]">Manage Users</li></NavLink>
                        <NavLink to='/dashboard/manageRegisteredCamps'><li className="text-[#ffff]">Manage Register Camps</li></NavLink>
                            </>: <>
                        {/* Participant Route */}
                        {/* 01 */}
                        <NavLink to='/dashboard/participantProfile'><li className="text-[#ffff]">Participant Profile</li></NavLink>
                            </>
                        }
                        {/* user Route */}
                        {/*  */}
                        <div className="divider divider-info"></div>
                        {/* Sheared routes */}
                            <NavLink to='/'><li className="text-[#ffff]">Home</li></NavLink>
                            <NavLink to='/avail'><li className="text-[#ffff]">Available Page</li></NavLink>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;