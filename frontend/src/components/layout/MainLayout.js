import Navbar from "./Navbar"
import React from "react"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="container p-4">{children}</div>
            <ToastContainer />
        </React.Fragment>
    )

}

export default MainLayout