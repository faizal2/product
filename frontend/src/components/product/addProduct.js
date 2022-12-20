import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.post("http://localhost:5000/products", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/product");
            toast.success("Good Job!");
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
                            <form onSubmit={saveProduct}>
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
                                    <input className="form-control" onChange={loadImage} type="file" accept=".png, .jpg, .jpeg" />
                                </div>

                                {preview ? (
                                    <img src={preview} className="img-thumbnail" alt="Gambar Product" />
                                ) : (
                                    ""
                                )}

                                <div className="btn-group">
                                    <button type="submit" className="btn btn-outline-primary" >Save</button>
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

export default AddProduct;