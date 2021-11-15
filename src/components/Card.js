import React, { Fragment, useEffect, useState } from 'react'
import "../css/Card.css";
import Ethereum from "../assets/ethereum.png";
import contract from '../ethereum/collection';
import web3 from '../ethereum/web3';
import { useToasts } from "react-toast-notifications";
import Loader from "react-loader-spinner";
const Card = ({ index, address }) => {
    const { addToast } = useToasts();
    const [Image, setImage] = useState("");
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [owned, setOwned] = useState(0);
    const [cost, setCost] = useState([]);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState();
    const [loading, setloading] = useState(false);
    const [freeNftId, setfreeNftId] = useState(null);
    const [hasClaimedFreeNFT, setHasClaimedFreeNFT] = useState(true);
    useEffect(() => {
        (async () => {
            try {

                const uri = await contract.methods.uri(index).call();
                const response = await fetch(uri);
                const nftJson = await response.json();
                setDescription(nftJson.description);
                const images = await require(`../assets/images/${index}.png`);
                setImage(images);
                const costWei = await contract.methods.cost(index).call();
                const etherValue = await web3.utils.fromWei(costWei, 'ether');
                const _freeNftID = await contract.methods.freeNftID().call();
                setfreeNftId(parseInt(_freeNftID));
                if(address){
                     const _hasClaimedFreeNFT = await contract.methods.hasClaimedFreeNFT(address).call();
                     setHasClaimedFreeNFT(_hasClaimedFreeNFT);
                }
               

                if (address) {
                    const _owned = await contract.methods.balanceOf(address, index).call();
                    setOwned(_owned);
                }
                const _remainingBalance = await contract.methods.getRemainingAmount(index).call();

                setRemainingBalance(_remainingBalance);
                setCost(etherValue);


            } catch (e) {
                console.error(e);
            }
        })();
        // eslint-disable-next-line
    }, [address, Image]);
    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setQuantity(e.target.value);
        }
    }

    const Mint = async (e) => {
        e.preventDefault();

        try {
            if (quantity === "" || !quantity) {
                addToast(`Mint quantity Cannot be empty`, {
                    appearance: "error",
                    autoDismiss: true,
                });
                return;
            }
            if (quantity < 1) {
                addToast(`Mint quantity must be greator than 0`, {
                    appearance: "error",
                    autoDismiss: true,
                });
                return;
            }
            if (parseInt(quantity) > parseInt(remainingBalance)) {
                addToast(`Remaining Amount is ${remainingBalance},requested ${quantity}`, {
                    appearance: "error",
                    autoDismiss: true,
                });
                return;
            }
            setloading(true);
            let amount = cost * quantity;
            await contract.methods.mint(parseInt(quantity), index).send({
                from: address,
                value: web3.utils.toWei(amount.toString(), 'ether')
            });
            addToast("Token Successfully Minted", {
                appearance: "success",
                autoDismiss: false,
            });
            if (address) {
                const _owned = await contract.methods.balanceOf(address, index).call();
                setOwned(_owned);
            }
            const _remainingBalance = await contract.methods.getRemainingAmount(index).call();
            setRemainingBalance(_remainingBalance);
        } catch (error) {
            addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
            });
        }
        setloading(false);
    }

    const ClaimFreeNFT = async (e) =>{
        setloading(true);
        try {
            await contract.methods.mintFreeNFT().send({
                from: address,
                value: await web3.eth.getGasPrice()
            });
            setHasClaimedFreeNFT(true);
            addToast("Token Successfully Minted", {
                appearance: "success",
                autoDismiss: false,
            });
        } catch (error) {
            addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
            });
        }
        setloading(false);
    }

    return (
        <div className="Card-Container">

            <div className="Card-Header">
                <div className="Card-Title">
                    Alien Eyes #<span>{index + 1}</span>
                </div>
                <span className="Card-Check">✓</span>
            </div>
            <div className="NFT-Image-Container">
                <img
                    src={require(`../assets/images/${index}.png`).default}
                    alt={`${index}.png`}
                    className="NFT-Image"
                />
            </div>
            <div className="Description">
                {description}
            </div>
            <div className="Cost-Container">
                <img src={Ethereum} alt="Logo.png" className="CostImage" />
                <div className="CostText">{cost}</div>
            </div>
            <div className="Card-Footer">
                <div className="Card-Item Remaining-Item">
                    Remaining Amount: <span>{remainingBalance}</span>
                </div>
                {
                    address ?
                        <Fragment>

                            <div className="Card-Item Owned-Item">
                                Owned: <span>{owned}</span>
                            </div>
                            {
                                loading ?
                                    <div className="Minting-Loader-Container">
                                        <div className="Minting-Loader-Text">Minting...</div>
                                        <Loader type="Puff" color="#00BFFF" height={80} width={80} />
                                    </div> :
                                    <Fragment>
                                        <div className="Card-Inputs">
                                                <input
                                                    type="text"
                                                    className="AmountInput"
                                                    placeholder="Quantity"
                                                    value={quantity}
                                                    onChange={onChange}
                                                />
                                                <button className="MintBtn" onClick={Mint}>Mint</button>
                                            </div>
                                            {
                                                (freeNftId===index && !hasClaimedFreeNFT) &&
                                                <div className="FreeNft-Container">
                                                    <button className="FreeNftBtn" onClick={ClaimFreeNFT}>
                                                        Claim Free NFT
                                                    </button>
                                                </div>
                                            }
                                    </Fragment>

}


                        </Fragment>
                        :
                        <div className="NotLoggedIn">Please Connect MetaMask </div>

                }

            </div>
        </div>
    )
}

export default Card
