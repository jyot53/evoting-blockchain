// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Election{
        
    struct Candidate{
        uint id;
        string name;
        string party;
        string age;
        string description;
        string qualification;
        uint votecount;
        string ipfshash;
    }   
    
    uint public candidatesCount;
    mapping(uint=>Candidate) public candidates;
    mapping(address=>bool) public votedornot;
    address[] public voters;
    address public owner;
    string public phase;
    uint public accountindex = 0;
    
    event electionUpdates(uint _id);
    
    constructor(){
         owner = msg.sender;
         phase = 'Registration';
    }
    
    modifier ownerModifier{
        require(msg.sender == owner,"only owner can add candidates");
        _;
    }

    // function changePhase() public ownerModifier{
    //     if( keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked('Registration'))    ){
    //         phase = 'Voting';
    //     }else{
    //         phase = 'Registration';
    //     }
    //     if(keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked('Registration'))){
    //         phase = 'Voting';
    //     }else if( keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked('Voting'))){
    //         phase = 'Ended';
    //     }else if( keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked('Ended'))){
    //         phase = 'Registration';
    //     }
    // }

    function changePhase(string memory _phase ) public ownerModifier{
        phase = _phase;
    }
    function getPhase() public view returns(string memory){
        return phase;
    }

    function addCandidate(string memory _name ,string memory _party,string memory _age ,string memory _description, string memory _qualification,string memory _ipfs) public ownerModifier{
        candidates[candidatesCount] = Candidate(candidatesCount,_name,_party,_age,_description,_qualification,0,_ipfs);
        candidatesCount++;
    }
    
    function removeCanditate(uint _id) public ownerModifier{
        delete candidates[_id];
    }
    
    function Vote(uint _id) public{
        require(!votedornot[msg.sender],"You Can Only Vote Once!!!");
        require(_id>=0 && _id<candidatesCount,"Invalid Candidate id");
        candidates[_id].votecount++;
        voters.push(msg.sender);
        votedornot[msg.sender]=true;
        emit electionUpdates(_id);
    }

    function provideNewAccount() public{
        accountindex++;
    }

   function getAccountIndex() public view returns(uint){
        return (accountindex-1);
    }
}