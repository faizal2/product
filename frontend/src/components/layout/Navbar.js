
import { useState } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {

    const [menuTriggered, setMenuTriggered] = useState(false);
    const handleMenuTrigger = () => setMenuTriggered(!menuTriggered);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-2 bg-primary bg-gradient fixed-top ">
            <div className="container" onClick={() => handleMenuTrigger()}>
                <Link className="navbar-brand " to={`/`}>Navbar</Link>
                <button className="navbar-toggler" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" style={{ display: menuTriggered ? 'block' : 'none' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={`/`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/product`}>Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/pegawai`}>Pegawai</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/user`}>User</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar