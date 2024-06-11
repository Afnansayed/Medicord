import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import { RiAdminFill, RiChatHistoryFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosHome, IoMdAnalytics } from "react-icons/io";
import { MdAddCard, MdAdminPanelSettings, MdEventAvailable } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";

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
                        <li className="text-[#ffff]"><NavLink to='/dashboard/organizerProfile'><CgProfile />Organizer Profile</NavLink></li>
                        {/* 2 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/addCamp'><MdAddCard /> Add A Camp</NavLink></li>
                        {/* 3 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/manageCamps'><MdAdminPanelSettings />Manage Camps</NavLink></li>
                        <li className="text-[#ffff]"><NavLink to='/dashboard/manageUsers'><GrUserAdmin />Manage Users</NavLink></li>
                        <li className="text-[#ffff]"><NavLink to='/dashboard/manageRegisteredCamps'><RiAdminFill />Manage Register Camps</NavLink></li>
                            </>: <>
                        {/* Participant Route */}
                        {/* 01 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/analytics'><IoMdAnalytics /> Analytics</NavLink></li>
                        {/* 02 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/participantProfile'><CgProfile /> Participant Profile</NavLink></li>
                        {/* 03 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/registeredCamps'><FaAddressBook /> Registered Camp</NavLink></li>
                        {/* 04 */}
                        <li className="text-[#ffff]"><NavLink to='/dashboard/history'> <RiChatHistoryFill /> Payment History</NavLink></li>
                            </>
                        }
                        {/* user Route */}
                        {/*  */}
                        <div className="divider divider-info"></div>
                        {/* Sheared routes */}
                        <li className="text-[#ffff]"><NavLink to='/'><IoIosHome /> Home</NavLink></li>
                        <li className="text-[#ffff]"><NavLink to='/avail'><MdEventAvailable />Available Page</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;