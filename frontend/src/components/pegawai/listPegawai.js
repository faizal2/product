import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaEdit, FaList, FaTrash } from "react-icons/fa";

const ListPegawai = () => {
    const [users, setPegawai] = useState([]);
    const [dataId, setDataId] = useState('');
    const [modalTriggered, setModalTriggered] = useState(false);
    const [listTriggered, setListTriggered] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(9);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getPegawai();
    }, [page, keyword]);

    const getPegawai = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setPegawai(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };
    const changePage = ({ selected }) => {
        setPage(selected);
    };

    const searchData = (e) => {
        setPage(0);
        setKeyword(query);
    };

    const deletePegawai = async () => {
        try {
            await axios.delete(`http://localhost:5000/users/${dataId}`);
            getPegawai();
            handleModalTrigger()
        } catch (error) {
            console.log(error);
        }
    };
    const confirmDeletePegawai = (id) => {
        handleModalTrigger()
        setDataId(id)
    }
    const handleModalTrigger = () => setModalTriggered(!modalTriggered);
    const handleListTrigger = (userId) => {
        setListTriggered(!listTriggered);
        document.querySelector(`#drop_${userId}`).style.display = listTriggered ? 'block' : 'none'
    }
    document.onmouseup = function () { document.querySelector(".dropdown-menu").style.display = 'none' }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <Link to={`add`} className="btn btn-outline-success">
                            Add New
                        </Link>
                        <div className="input-group my-3">
                            <input type="text" className="form-control"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Find something here..."
                                aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => { searchData() }}>Search</button>
                        </div>

                        <div className="row">
                            {users.map((user, index) => (
                                <div className="col-md-4 mb-3 " key={index}>
                                    <div className="card " >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src="http://localhost:5000/images/profil.jpg" className="img-fluid rounded-start" alt="Profile" />
                                            </div>
                                            <div className="col-md-8">

                                                <div className="card-title px-2">

                                                    <div class="dropdown float-end">
                                                        <Link onClick={() => handleListTrigger(user.id)} ><FaList /></Link>

                                                        <ul className="dropdown-menu" id={`drop_${user.id}`} >
                                                            <li><Link className="dropdown-item" to={`/product/edit/${user.id}`}>Biodata</Link></li>
                                                            <li><Link className="dropdown-item" >Mutasi</Link></li>
                                                            <li><Link className="dropdown-item" >Kenaikan Pangkat</Link></li>
                                                            <li><Link className="dropdown-item" onClick={() => confirmDeletePegawai(user.id)} >Hapus</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-body p-2">
                                                    <p className="card-text m-0  fw-bold">{user.name}</p>
                                                    <p className="card-text m-0 ">{user.gender}</p>
                                                    <p className="card-text m-0 "><small class="text-muted">{user.email}</small></p>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {rows === 0 ?
                            <p className="text-center text-danger">-- Empty --</p>
                            :
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="text-center text-md-start">Total Pegawai: {rows} Page: {rows ? page + 1 : 0} of {pages}</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <nav aria-label="Page navigation">
                                        <ReactPaginate
                                            previousLabel={"Prev"}
                                            nextLabel={"Next"}
                                            pageCount={pages}
                                            onPageChange={changePage}
                                            containerClassName={"pagination pagination-sm justify-content-center justify-content-sm-end"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousLinkClassName={"page-link"}
                                            nextLinkClassName={"page-link"}
                                            activeLinkClassName={"active"}
                                            disabledLinkClassName={"disabled"}
                                        />
                                    </nav>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="modal" style={{ display: modalTriggered ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" onClick={() => handleModalTrigger()}></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => handleModalTrigger()}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => deletePegawai()}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListPegawai;