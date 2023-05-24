import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import SignupPng from "../../image/d.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/Layout/Spinner.js";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [loding, setLoding] = useState(false)

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoding(true)
            const res = await axios.post('/api/v1/auth/register', {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            setLoding(false)
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
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
        <Layout title={"RegisterForm - Apna Mart"}>
            {loding && <Spinner />}
            {!loding &&
                <div className="register top-m">
                    <div className="register-left">
                        <img className="signup-svg" src={SignupPng} alt="My SVG Image" />
                    </div>
                    <div className="register-right">
                        <form onSubmit={handleSubmit}>
                            <i className="fa-solid fa-user regi-user"></i>
                            <h1 className="heading">Register Page</h1>

                            <div className="mb-3 mt-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Name</label> */}
                                <input
                                    placeholder="Name"
                                    type="text"
                                    className="form-control form-input-bottom"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                            <div className="mb-3 mt-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Phone</label> */}
                                <input
                                    placeholder="Phone"
                                    type="text"
                                    className="form-control form-input-bottom"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 mt-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Address</label> */}
                                <input
                                    placeholder="Address"
                                    type="text"
                                    className="form-control form-input-bottom"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 mt-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Address</label> */}
                                <input
                                    placeholder="What is your Bestfriend name?"
                                    type="text"
                                    className="form-control form-input-bottom"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="button1">
                                REGISTER
                            </button>
                            <Link style={{ color: "grey", textDecoration: "none" }} to='/login'>Already Register ? Click here to login</Link>
                        </form>
                    </div>
                </div>
            }
        </Layout>
    );
};

export default Register;
