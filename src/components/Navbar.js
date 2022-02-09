import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div className="navbar">
            <div className="grid wide">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
