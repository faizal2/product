import Navbar from "./Navbar"
import React from "react"


const MainLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="container p-4">{children}</div>

        </React.Fragment>
    )

}

export default MainLayout