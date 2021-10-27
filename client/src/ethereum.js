import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import Election from './contracts/Election.json';
// import {useState} from 'react';
const getBlockchain = () => 
  new Promise( async (resolve, reject) => {
    // const [accounts, setAccounts] = useState([])
    let provider = await detectEthereumProvider();
    if(provider) {
       await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const election = new Contract(
        '0x5AF77E8609E14C4E0eAC26443E2c61eAd0b6B474',
        Election.abi,
        signer
      );
      // const simpleStorage = new Contract(
      //   '0x039b335391AF5Af49C5E2ea985D2426883497445',
      //   SimpleStorage.abi,
      //   signer
      // );
      // const simpleStorage = new Contract(
      //   SimpleStorage.networks[networkId].address,
      //   SimpleStorage.abi,
      //   signer
      // );
      resolve({election});
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;


// import detectEthereumProvider from '@metamask/detect-provider';
// import { ethers, Contract } from 'ethers';
// import SimpleStorage from './contracts/SimpleStorage.json';

// const getBlockchain = () =>
//   new Promise( async (resolve, reject) => {
//     let provider = await detectEthereumProvider();
//     if(provider) {
//       await provider.request({ method: 'eth_requestAccounts' });
//       const networkId = await provider.request({ method: 'net_version' })
//       provider = new ethers.providers.Web3Provider(provider);
//       const signer = provider.getSigner();
//       const simpleStorage = new Contract(
//         '0x5d6973c68B91ec5af7d11D455906a46499Ac4254',
//         SimpleStorage.abi,
//         signer
//       );
//       // const simpleStorage = new Contract(
//       //   '0x039b335391AF5Af49C5E2ea985D2426883497445',
//       //   SimpleStorage.abi,
//       //   signer
//       // );
//       // const simpleStorage = new Contract(
//       //   SimpleStorage.networks[networkId].address,
//       //   SimpleStorage.abi,
//       //   signer
//       // );
//       resolve({simpleStorage});
//       return;
//     }
//     reject('Install Metamask');
//   });

// export default getBlockchain;