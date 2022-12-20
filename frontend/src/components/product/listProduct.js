import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';



const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [modalTriggered, setModalTriggered] = useState(false);
    const [dataId, setdataId] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/${dataId}`);
            getProducts();
            handleModalTrigger()
        } catch (error) {
            console.log(error);
        }
    };

    const confirmDeleteProduct = (id) => {
        handleModalTrigger()
        setdataId(id)
    }
    const handleModalTrigger = () => setModalTriggered(!modalTriggered);
    return (
        <>

            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <Link to={`add`} className="btn btn-outline-success">
                            Add <FaPlus />
                        </Link>
                        <div className="row mt-3">
                            {products.map((product) => (
                                <div className="col-md-4" key={product.id}>
                                    <div className="card mb-3" >
                                        <img src={product.url} alt="List Gambar" className="card-img-top pb-0" />
                                        <div className="card-body pt-0">
                                            <h5 className="card-title">{product.name}</h5>
                                        </div>
                                        <div className="card-footer text-end">
                                            <Link to={`/product/edit/${product.id}`}><FaEdit title="edit" /></Link>
                                            <Link className="mx-1 mr-0" type="button" onClick={() => confirmDeleteProduct(product.id)} ><FaTrash title="Delete" /></Link>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" style={{ display: modalTriggered ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Konfirmasi !</h5>
                            <button type="button" className="btn-close" onClick={() => handleModalTrigger()}></button>
                        </div>
                        <div className="modal-body">
                            <p>Anda yakin ingin meghapus data ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => handleModalTrigger()}>Tidak</button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => deleteProduct()}>Ya, Hapus <FaTrash /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListProduct;