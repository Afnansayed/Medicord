import { NavLink } from "react-router-dom";
import logo from '../../../src/assets/cover.png'
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = () => {
    const { user ,logOut} = useContext(AuthContext);
    const navLink = <>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-[#396cf0] mr-3 ' : 'text-[#333333] mr-2 font-semibold'} to='/'><li>Home</li></NavLink>
        {/* 2 */}
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-[#396cf0] mr-3 ' : 'text-[#333333]  mr-2 font-semibold'} to='/avail'><li>Available Camp</li></NavLink>

    </>
    const navForAuthentication = <>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-[#396cf0] mr-3 ' : 'text-[#333333] font-semibold mr-2'} to='/login'><li>Log In</li></NavLink>
        {/* 2 */}
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-[#396cf0] mr-3 ' : 'text-[#333333] font-semibold  mr-2'} to='/signUp'><li>Sign Up</li></NavLink>

    </>
    const handleLogOut = () => {
        logOut()
        .then(() => {
            console.log('signOut successful')
        })
        .catch(error => {
            console.error(error)
        })
    }
    const navForDashboard = <>
        {/* 1 */}
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-[#396cf0] mr-3 ' : 'text-[#333333] font-semibold  mr-2'} to='/dashboard'><li>DashBoard</li></NavLink>
         {/* 2 */}
        <li onClick={handleLogOut} className="btn px-5 py-2 w-full bg-[#181dc6]  text-[#ffff]">Log Out</li>

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navLink
                        }
                    </ul>
                </div>
                <img src={logo} className="w-24" alt="logo" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navLink
                    }
                </ul>
            </div>
            {/* dropDown for join us */}
            <div className="navbar-end">
                {
                    !user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=" m-1 px-8 py-2 bg-[#181dc6] text-[#ffffff]">Join Us</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                            {
                                navForAuthentication
                            }
                        </ul>
                    </div>
                }
                {
                    user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar"><div className="w-12 rounded-full">
                            <img src={user?.photoURL} />
                        </div></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-5 flex justify-center items-center ">
                            {
                                navForDashboard
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default NavBar;