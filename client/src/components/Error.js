import React from 'react'
import {NavLink} from 'react-router-dom';
const Error = () => {
    return (
        <>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>
                    <NavLink to="/">Go TO Homepage</NavLink>
                </div>
	        </div>
        </>
    )
}

export default Error
