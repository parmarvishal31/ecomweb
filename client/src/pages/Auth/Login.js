import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import SignupPng from "../../image/e.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/Layout/Spinner.js";
import { useAuth } from "../../context/auth.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loding, setLoding] = useState(false)
    const [auth, setAuth] = useAuth();
    const location = useLocation()
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoding(true)
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password,
            });
            setLoding(false)

            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });

            if (res && res.data.success) {
                toast.success("Login successfully done..!");
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            setLoding(false)

        }
    };
    return (
        <Layout title={'LoginForm - Apna Mart'}>
            {loding && <Spinner />}
            {!loding &&
                <div className="register">
                    <div className="register-left">
                        <img className="signup-svg" src={SignupPng} alt="My SVG Image" />
                    </div>
                    <div className="register-right">
                        <form onSubmit={handleSubmit}>
                            <i className="fa-solid fa-user regi-user"></i>
                            <h1 className="heading">Login Page</h1>

                            <div className="mb-3 mt-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                                <input
                                    placeholder="Email Address"
                                    type="email"
                                    className="form-control form-input-bottom"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                <input
                                    placeholder="Password"
                                    type="password"
                                    className="form-control form-input-bottom"
                                    id="exampleInputPassword1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="button1 ">
                                LOGIN
                            </button>
                            <div className="mt-3 text-end">
                                <Link style={{ color: "grey", textDecoration: "none" }}
                                    to='/register'>Not a user ? Click here to register</Link>
                            </div>
                            <div className="mt-3 text-end" >
                                <Link style={{ color: "grey", textDecoration: "none" }} to='/forgot-password'>Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Login
