import React, { useEffect } from 'react'
import "../css/Navbar.css";
import Logo from "../assets/Logo.png";
import { Link } from 'react-router-dom';
import web3 from "../ethereum/web3";
import powerOff from "../assets/powerOff.png";
import { useToasts } from "react-toast-notifications";
import { networkId } from '../config';
const Navbar = ({ address, setAddress }) => {
    const { addToast } = useToasts();
    useEffect(() => {
        window.ethereum.on('networkChanged', function (netId) {
            alert(netId);
            alert(networkId);
            if (parseInt(networkId) !== networkId) {
                setAddress(null);
                return;
            }
        });
        // eslint-disable-next-line    
    }, [address])

    const Connect = async (e) => {
        try {

            if (!window.ethereum) {
                addToast("Please install MetaMask Extension", {
                    appearance: "error",
                    autoDismiss: true,
                });
                return;
            }
            let netId = await web3.eth.net.getId();

            if (parseInt(netId) !== networkId) {
                addToast("Please Switch to Binance Smart Chain", {
                    appearance: "error",
                    autoDismiss: true,
                });
                setAddress(null);
                return;
            }
            const accounts = await web3.eth.requestAccounts();
            localStorage.setItem("address", address);
            setAddress(accounts[0]);
        } catch (error) {
            addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
            });
        }

    }
    const LogOut = async () => {
        setAddress(null);
    }
    return (
        <div className="Navbar-Container">
            <Link to="/">
                <div className="Logo-Container">
                    <img src={Logo} alt="Logo.png" className="LogoImg" />
                    <div className="LogoText">Alien Eyes</div>
                </div>
            </Link>
            <div className="NavbarItems-Container">
                <div className="NavbarItem">
                    <Link to="/nft">NFT</Link>
                </div>
                {
                    address ?
                        <div className="NavbarItem LoggedIn" onClick={LogOut}>
                            {address.substring(0, 7)}
                            ...
                            {address.substring(address.length - 4, address.length)}
                            <span>
                                <img src={powerOff} alt="powerOff.png" />
                            </span>
                        </div> :
                        <div className="NavbarItem ConnectBtn" onClick={Connect}>
                            Connect Wallet
                        </div>
                }


            </div>
        </div>
    )
}

export default Navbar
