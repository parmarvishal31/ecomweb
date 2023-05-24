import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
            toast.success("Get all products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleRefresh = (e) => {
        e.preventDefault();
        getAllProducts();
    }

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    // helper function to chunk products into rows of 3
    const chunkArray = (arr, size) => {
        const chunkedArray = [];
        let index = 0;
        while (index < arr.length) {
            chunkedArray.push(arr.slice(index, index + size));
            index += size;
        }
        return chunkedArray;
    };

    const chunkedProducts = chunkArray(products, 3);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3 ">
                    <AdminMenu />
                </div>
                <div className="col-md-9" style={{ marginTop: "60px" }}>
                    <div className="product">
                        <h1 className="text-center">All Products List  <span className="ms-2 refresh" style={{ fontSize: "32px" }} onClick={handleRefresh}><i class="fa-solid fa-arrows-rotate"></i></span></h1>

                    </div>
                    {chunkedProducts.map((row, index) => (
                        <div className="row" key={index}>
                            {row.map((p) => (
                                <div className="col-md-4" key={p._id} >
                                    <Link
                                        to={`/dashboard/admin/product/${p.slug}`}
                                        className="product-link"
                                        style={{ color: "black", textDecoration: "none" }}
                                    >
                                        <div className="card m-2" style={{ width: "18rem" }}>
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <div className="card-text"><div style={{ textDecoration: "underline" }}> Description </div>{p.description}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Products;
