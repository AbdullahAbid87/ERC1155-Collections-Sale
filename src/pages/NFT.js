import React, { Fragment, useEffect, useState } from 'react'
import Card from '../components/Card';
import contract from '../ethereum/collection';

const NFT = ({ address }) => {
    const [nftSupply, setNftSupply] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const supply = await contract.methods.nftSupply().call();
                setNftSupply(supply);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    return (
        <Fragment>
            <div className="NFT-Container">
                {
                    [...Array(parseInt(nftSupply))].map(((el, index) => {
                        console.log(index);
                        return <Card address={address} index={index} key={index} />
                    }))
                }
            </div>
        </Fragment>
    )
}

export default NFT
