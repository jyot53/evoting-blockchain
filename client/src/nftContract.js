import Web3 from 'web3';
import NFTContractBuild from './contracts/MyNFT.json';
let selectedAccount;
let nftContract;
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

	nftContract = new web3.eth.Contract(
		NFTContractBuild.abi,
		NFTContractBuild.networks[networkId].address
	);
	isInitialized = true;
};

export const mintContractNFT = async (tokenURI) => {
	if(!isInitialized) {
		await init();
	}

	return nftContract.methods.mintNFT(selectedAccount,tokenURI).send({ from : selectedAccount})
    	.on('receipt' , function(receipt){
			console.log("receipt " + receipt.transactionHash);
		})
        .then((data) => {
            return data
        })
        .catch((error) => {
			alert("MintContractNFT " + JSON.stringify(error));
		});
}
