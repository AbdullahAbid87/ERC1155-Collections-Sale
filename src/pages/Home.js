import React, { Fragment } from 'react'
import Gif from "../assets/AlienEyes.gif";
import "../css/Home.css";

const Home = () => {
    return (
        <Fragment>
            <div className="Home-Header">Welcome to Alien Eyes</div>
            <div className="Home-Container">
                <div className="HomeImg-Container">
                    <img
                        src={Gif}
                        alt="AlienEyes.gif"
                        className="HomeGif"
                    />
                </div>
                <div className="Home-Description">
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                    <br/>
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                   
                </div>
            </div>
        </Fragment>
    )
}

export default Home
