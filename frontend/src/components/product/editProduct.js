import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.name);
        setFile(response.data.image);
        setPreview(response.data.url);
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={updateProduct}>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        required={true}
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Product Name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input className="form-control" onChange={loadImage} type="file" id="formFile" />
                                </div>

                                {preview ? (
                                    <img src={preview} className="img-thumbnail" alt="Preview Image" />
                                ) : (
                                    ""
                                )}

                                <div className="btn-group mt-3">
                                    <button type="submit" className="btn btn-outline-primary" >Update</button>
                                    <Link to="/product" className="btn btn-outline-secondary" >Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;