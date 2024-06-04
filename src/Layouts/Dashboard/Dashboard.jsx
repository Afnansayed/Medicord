import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-[#181ca3] text-base-content  text-xl md:space-y-2 ">
                        {/* Sidebar content here */}
                        {/* Organizers  route */}
                        <NavLink to='/dashboard/organizerHome'><li className="text-[#ffff]">Organizer Home</li></NavLink>
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