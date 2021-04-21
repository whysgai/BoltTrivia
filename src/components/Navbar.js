import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {restartGame} from "../redux/actions/gameStateActions"

const NavbarComponent = () => {
    const dispatch = useDispatch();

    const restart = () => {
        dispatch(restartGame())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#e3f2fd'}}>
            <button type="button" className="btn btn-link navbar-brand" onClick={() => restart()}>
                Bolt Trivia!
            </button>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type="button" className="btn btn-link nav-link" onClick={() => restart()}>
                            Home
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarComponent;