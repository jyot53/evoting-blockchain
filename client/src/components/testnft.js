import React from 'react'
import { mintContractNFT } from "../nftContract";
const testnft = () => {

    const mint = async () => {
        const res = await mintContractNFT("https://gateway.pinata.cloud/ipfs/QmeKjcaN6rJhgWYiWBzR9PNAPcAj88xXgXwC89FkALhCCv");
        console.log("mint function " + res.transactionHash);
    }

    //0x04157e122547410f3353b1d1e07ea128501ac8c04742bc222bc88fe045bff3b2

    return (
        <div>
            <h1>nft page</h1>
            <button onClick={mint}>Mint</button>
        </div>
    )
}

export default testnft
