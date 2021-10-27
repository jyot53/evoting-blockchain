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
    }   
    
    uint public candidatesCount;
    mapping(uint=>Candidate) public candidates;
    mapping(address=>bool) public votedornot;
    address[] public voters;
    address public owner;
    string public phase;
    
    event electionUpdates(uint _id);
    
    constructor(){
         owner = msg.sender;
         phase = 'Registration';
    }
    
    modifier ownerModifier{
        require(msg.sender == owner,"only owner can add candidates");
        _;
    }

    function changePhase() public ownerModifier{
        if( keccak256(abi.encodePacked((phase))) == keccak256(abi.encodePacked('Registration'))    ){
            phase = 'Voting';
        }else{
            phase = 'Registration';
        }
    }

    function getPhase() public view returns(string memory){
        return phase;
    }

    function addCandidate(string memory _name ,string memory _party,string memory _age ,string memory _description, string memory _qualification) public ownerModifier{
        candidates[candidatesCount] = Candidate(candidatesCount,_name,_party,_age,_description,_qualification,0);
        candidatesCount++;
    }
    
    function removeCanditate(uint _id) public ownerModifier{
        delete candidates[_id];
    }
    
    function Vote(uint _id) public{
        require(!votedornot[msg.sender],"You Can Only Vote Once!!!");
        require(_id>0 && _id<=candidatesCount,"Invalid Candidate id");
        candidates[_id].votecount++;
        voters.push(msg.sender);
        votedornot[msg.sender]=true;
        emit electionUpdates(_id);
    }
}