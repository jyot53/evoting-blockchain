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

export const addContractCandidate = async (name,party,age,description,qualification) => {
	if(!isInitialized) {
		await init();
	}

	return electionContract.methods.addCandidate(name,party,age,description,qualification).send({ from : selectedAccount});
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

export const contractVote = async (id) => {
	if(!isInitialized) {
		await init();
	}

	electionContract.methods.Vote(id).send({ from : selectedAccount});
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