import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [dataId, setDataId] = useState('');
    const [modalTriggered, setModalTriggered] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setUsers(response.data.result);
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

    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/users/${dataId}`);
            getUsers();
            handleModalTrigger()
        } catch (error) {
            console.log(error);
        }
    };
    const confirmDeleteUser = (id) => {
        handleModalTrigger()
        setDataId(id)
    }
    const handleModalTrigger = () => setModalTriggered(!modalTriggered);
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
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped">
                                <thead className="bg-dark bg-gradient text-white text-center">
                                    <tr>
                                        <th style={{ width: "5%" }}>No</th>
                                        <th style={{ width: "35%" }}>Name</th>
                                        <th style={{ width: "25%" }}>Email</th>
                                        <th style={{ width: "20%" }}>Gender</th>
                                        <th style={{ width: "15%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td className="text-center">{user.gender}</td>
                                            <td className="text-center"><div className="btn-group" >
                                                <Link className="btn btn-sm btn-outline-primary" to={`edit/${user.id}`}>Edit</Link>
                                                <button type="button" onClick={() => confirmDeleteUser(user.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                            </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {rows == 0 ?
                            <p className="text-center text-danger">-- Empty --</p>
                            :
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="text-center text-md-start">Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}</div>
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
                            <button type="button" className="btn btn-primary" onClick={() => deleteUser()}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListUser;