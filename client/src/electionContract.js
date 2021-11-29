// import detectEthereumProvider from '@metamask/detect-provider';
// import { ethers, Contract } from 'ethers';
// import Election from './contracts/Election.json';

// const getBlockchain = () =>
//   new Promise( async (resolve, reject) => {
//     let provider = await detectEthereumProvider();
//     if(provider) {
//       await provider.request({ method: 'eth_requestAccounts' });
//       const networkId = await provider.request({ method: 'net_version' })
//       provider = new ethers.providers.Web3Provider(provider);
//       const signer = provider.getSigner();
//       const election = new Contract(
//         '0xacFeB7108EE6A525fBfb96f7A5821D3058ED52Bb',
//         Election.abi,
//         signer
//       );
//       resolve({election});
//       return;
//     }
//     reject('Install Metamask');
//   });

// export default getBlockchain;


import Web3 from 'web3';
import Election from './contracts/Election.json';
let selectedAccount;
let electionContract;
let isInitialized = false;
let newweb3;

export const init = async () => {
	let provider = window.ethereum; 
	if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	}

	const web3 = new Web3(provider);
	newweb3 = new Web3(provider);
	
	const networkId = await web3.eth.net.getId();

	// nftContract = new web3.eth.Contract(
	// 	NFTContractBuild.abi,
	// 	NFTContractBuild.networks[networkId].address
	// );
  electionContract = new web3.eth.Contract(Election.abi,Election.networks[networkId].address); 
	isInitialized = true;
	// console.log(allaccounts[2]);
};

export const candidatesCount = async () => {
	if (!isInitialized) {
		await init();
	}
	return electionContract.methods
		.candidatesCount()
		.call()
		.then((candidatesCount) => {
			return candidatesCount; //3
		});
};

export const getSelectedAccount = async () => {
	if (!isInitialized) {
		await init();
	}
	return selectedAccount;
}

export const getContractOwner = async () => {
	if(!isInitialized) {
		await init();
	}

	return electionContract.methods.owner().call().then((owner) => {return owner;});
}

export const addContractCandidate = async (name,party,age,description,qualification,ipfs) => {
	console.log("add contract candidate called");
	if(!isInitialized) {
		await init();
	}

	return electionContract.methods.addCandidate(name,party,age,description,qualification,ipfs).send({ from : selectedAccount});
}

export const getContractCandidates = async (id) => {
	if(!isInitialized) {
		await init();
	}

	return electionContract.methods.candidates(id).call().then((data) => {
		// console.log(data);
		return data;});
}

export const setContractPhase = async (phase) => {
	if(!isInitialized) {
		await init();
	}

	electionContract.methods.changePhase(phase).send({from: selectedAccount})
}

export const getContractPhase = async () => {
	if(!isInitialized) {
		await init();
	}
	
	return electionContract.methods.getPhase().call().then((data) => {return data})
}

const changeStatus = async () => {
    const response = await fetch("/change_status", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("useremail"),
      }),
    });

    const data = await response.json();
    console.log("Change status: " + data);
  };

export const contractVote = async (id) => {
	if(!isInitialized) {
		await init();
	}
/*receipt {"transactionHash":"0x53761fc61912565f9f7668386206dd8609979cf02a10f205e333d8e1ebe214b1","transactionIndex":0,"blockHash":"0x280065e1286b2f238a8b29645e9c626d5944884fdb5ec79146c2ef6af8fdf0a8","blockNumber":173,"from":"0xad65d4ca7173f8910b2419758104a3253dfbd3bc","to":"0x57ae0f6a2aa6d38f7669a6668d3c86f963b2ee4e","gasUsed":78435,"cumulativeGasUsed":78435,"contractAddress":null,"status":true,"logsBloom":"0x00000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000","events":{"electionUpdates":{"logIndex":0,"transactionIndex":0,"transactionHash":"0x53761fc61912565f9f7668386206dd8609979cf02a10f205e333d8e1ebe214b1","blockHash":"0x280065e1286b2f238a8b29645e9c626d5944884fdb5ec79146c2ef6af8fdf0a8","blockNumber":173,"address":"0x57aE0F6a2aa6d38F7669A6668d3C86F963b2EE4e","type":"mined","id":"log_6baf469c","returnValues":{"0":"0","_id":"0"},"event":"electionUpdates","signature":"0x559b765eb0812c9a8121fedbcf4cd1ab9c3fb498877e81d8347433eb5f4d6173","raw":{"data":"0x0000000000000000000000000000000000000000000000000000000000000000","topics":["0x559b765eb0812c9a8121fedbcf4cd1ab9c3fb498877e81d8347433eb5f4d6173"]}}}} */
		 electionContract.methods.Vote(id).send({ from : selectedAccount})
		// .on('receipt' , function(receipt){
		// 	console.log("receipt " + JSON.stringify(receipt));
		// })
		.then((data) => {
			// console.log("Then : "+ JSON.stringify(data)); 
			changeStatus();
			alert("Your Vote has been casted. Your transaction hash is :- "+ data.transactionHash);	
		})
		.catch((error) => {
			alert(error.message.toString().slice(142,167));
		});

	
}

export const callContractNewAccountIndex = async () => {
	if(!isInitialized) {
		await init();
	}

	electionContract.methods.provideNewAccount().send({ from : selectedAccount});
}

export const getContractNewAccountIndex = async () => {
	if(!isInitialized) {
		await init();
	}

	return electionContract.methods.getAccountIndex().call().then((data) => {return data})
}