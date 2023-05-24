import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"ALl Products - Best offers "}>
            <img
                src="/images/banner.png"
                className="banner-img"
                alt="bannerimage"
                width={"100%"}
            />
            <div className="container-fluid row mt-3  home-page">
                <div className="col-md-2" style={{ marginTop: "40px" }}>
                    <h4 className="text-center filter-cat">Filter By Category</h4>
                    <div className="d-flex flex-column filter-cat">
                        {categories?.map((c) => (
                            <Checkbox
                                className="filter-cat"
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4 filter-cat">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group
                            className="filter-cat"
                            onChange={(e) => setRadio(e.target.value)}
                        >
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger filter-cat"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                    {/* drop down */}
                    <div className="dropdown filter-dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle mb-0"
                            style={{ backgroundColor: "black" }}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Filter By Category
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <div className="d-flex flex-column">
                                {categories?.map((c) => (
                                    <Checkbox
                                        key={c._id}
                                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                                    >
                                        {c.name}
                                    </Checkbox>
                                ))}
                            </div>
                        </ul>
                        {/* <button className="btn btn-secondary dropdown-toggle filter-dropdown ms-0" type="button" style={{ backgroundColor: "black", color: "white" }} id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" >
                            Filter By price
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">

                            <li >{Prices?.map((p) => (
                                <div type="radio" key={p._id} >
                                    <Radio key={p._id} value={p.array} onChange={(e) => setRadio(e.target.value)}>{p.name}</Radio>
                                </div>
                            ))}</li>

                        </ul> */}
                        <button
                            className="btn btn-danger ms-1"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9 ">
                    <p style={{ color: "red", fontSize: "20px", textDecoration: "underline", marginTop: "10px" }}>* This website under the testing ,so.. report the bug on vishalparmar31320@gmail.com *</p>
                    <h1 className="text-center " style={{ marginTop: "40px" }}>
                        All Products
                    </h1>
                    <div className="d-flex flex-wrap product-v">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 25)}...
                                    </p>
                                    <p className="card-text card-price"> ₹ {p.price}</p>
                                    <div className="button2">
                                        <button
                                            style={{ fontSize: "15px" }}
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>

                                        <button
                                            className="btn btn-secondary ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning product-v"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
