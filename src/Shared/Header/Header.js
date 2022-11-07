import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import "./Header.css";

const Header = () => {
  const { userLogOut, user } = useContext(AuthContext);

  const handlelogout = () => {
    userLogOut()
      .then(() => {})
      .catch((error) => {});
  };

  const menuItem = (
    <>
      <li className="font-bold text-xl">
        <NavLink to="/"> Home</NavLink>
      </li>

      <li className="font-bold text-xl ">
        <NavLink to="/allproduct">All Product</NavLink>
      </li>
      <li className="font-bold text-xl">
        <NavLink to="/addproduct">Add Product</NavLink>
      </li>
      <li className="font-bold text-xl">
        <NavLink to="/orders">Orders</NavLink>
      </li>
      {user?.email ? (
        <li onClick={handlelogout} className="font-bold text-xl ">
          <NavLink to="/"> Log Out</NavLink>
        </li>
      ) : (
        <>
          <li className="font-bold text-xl ">
            <NavLink to="/login"> Login</NavLink>
          </li>
          <li className="font-bold text-xl ">
            <NavLink to="/register"> Sign Up</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Shop
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0"> {menuItem} </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn">Get started</Link>
      </div>
    </div>
  );
};

export default Header;
