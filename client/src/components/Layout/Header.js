import React from "react";
import { Link, NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { ImTree } from "react-icons/im";
import { BiUserPlus } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const handleLogout = () => {
        toast.success("Logout successfully");
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-color fixed-top">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">
                            <i className="fa fa-shopping-cart icon-shoping-cart me-3"></i>Apna Mart
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-dark"
                                    activeclassname="active"
                                    exact={true.toString()}
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle text-center"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu submenu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link text-dark"
                                            activeclassname="active"
                                            to="/register"
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link text-dark"
                                            activeclassname="active"
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="nav-item dropdown"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Link
                                            className="nav-link dropdown-toggle text-center"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <FaUserTie className="me-1" />
                                            {auth?.user?.name}
                                        </Link>
                                        <ul
                                            className="dropdown-menu submenu"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <li>
                                                <NavLink style={{ textDecoration: "none" }}>
                                                    <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : "user"}`}>
                                                        Dashboard
                                                    </Link>
                                                </NavLink>
                                            </li>
                                            <li className="ms-2">
                                                <NavLink
                                                    onClick={handleLogout}
                                                    className="nav-link text-dark logout"
                                                    activeclassname="active"
                                                    to="/login"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </Link>
                                </>
                            )}
                            <li className="nav-item">
                                {/* <NavLink
                                    className="nav-link text-dark "
                                    activeclassname="active"
                                    to="/cart"
                                >

                                    <i className="fa fa-cart-arrow-down "></i>{" "}
                                    <span className="cart-count">{cart?.length}</span>
                                </NavLink> */}
                                <NavLink to="/cart" className="nav-link cart">
                                    <Badge count={cart?.length} showZero offset={[5, 1]}>
                                        <i className="fa fa-cart-arrow-down "></i>{" "}
                                    </Badge>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Header;
