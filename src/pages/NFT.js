import React, { Fragment, useEffect, useState } from 'react'
import Card from '../components/Card';
import contract from '../ethereum/collection';

const NFT = ({ address }) => {
    const [uniqueNFT, setUniqueNFT] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const supply = await contract.methods.uniqueNFT().call();
                 setUniqueNFT(supply);
            } catch (e) {
                console.error(e.message);
            }
        })();
    }, []);
    const CardComp=(address,index)=>{
        return <Card address={address} index={index} key={index} />
    }
    return (
        <Fragment>
            <div className="NFT-Container">
                {
                    [...Array(parseInt(uniqueNFT))].map(((el, index) => {
                        return CardComp(address,index);
                    }))
                }
            </div>
        </Fragment>
    )
}

export default NFT
