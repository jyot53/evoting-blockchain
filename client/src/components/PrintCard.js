import React, { useRef , useState,useEffect} from 'react';
import ReactToPrint from 'react-to-print';
import VotingCard from './VotingCard';
// import {callContractNewAccountIndex , getContractNewAccountIndex} from '../electionContract';

const PrintCard = () => {

    
  const componentRef = useRef();

    const [newaccount, setNewaccount] = useState("");
    const addresspool = ['0x234E8d9BA338f1F81B3229C834F1344948645388',
    '0xab830e883372887b971f71E8Fb09afC01A491253',
    '0xAd65D4cA7173F8910b2419758104a3253dfbd3Bc',
    '0xf24416B2E8B10858928b746DD5A124aEC8Dd9701',
    '0xBd20aa071b6C4c527c7931c19175cb32E95bA046',
    '0x75bed6Fd1919eC50910a0Af1a180F7Da03b2CbF0',
    '0x7dFA47F1cf9b52170D82e4eAaC27eD8146D12424',
    '0xad52373eb99471F0Eac32ed90781FfcE5d79B422',
    '0xE2a6a5E9345848afDD2CF57Da6bC5152df7f78F7'
  ];

  const init = () => {
    // await callContractNewAccountIndex();
    // const index = await getContractNewAccountIndex();
    const index = localStorage.getItem('currentindex');
    const newindex = +index;
    setNewaccount(addresspool[newindex]);
    localStorage.setItem('currentindex', (+newindex + +1));
  }

  useEffect(() => {
    init();
  },[]);

    return (
        <div>
          <VotingCard ref={componentRef} name={localStorage.getItem('username')} email={localStorage.getItem('useremail')} age="19" address={newaccount}/>
            <ReactToPrint
                trigger={() => <div className="vote_card_btn"> <button>Print this out!</button> </div>}
                content={() => componentRef.current}
            />
            {/* <VotingCard ref={componentRef}/> */}
            {/* <button onClick={handlePrint}>Print this out!</button> */}
        </div>
    )
}

export default PrintCard
