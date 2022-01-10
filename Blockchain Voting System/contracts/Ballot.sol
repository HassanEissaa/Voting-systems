// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
contract Ballot {


    enum voting_status{  Started, Ended }

    uint total_votes=0;

    address public ballot_address;

    uint public candidates_count;

    voting_status  public status=voting_status.Started;
    struct candidate{
        uint id;
        string name;
        uint vote_count;

    }

    struct voter{
        address voteraddress;
        bool voted;
    }



    modifier ballotaddress() {

        require(msg.sender==ballot_address);
        _;
    }


    mapping(uint=>candidate) public candidates;

    mapping(address=> voter) public voter_registeration;

     mapping(address => bool) public voted_voters;
    function addcandidate(string memory _name) private {
        
        candidates[candidates_count]=candidate(candidates_count,_name,0);
        candidates_count++;
    }
    constructor () {
        console.log("Deploying the Ballot");
        addcandidate("Helen");
        addcandidate("John");
        addcandidate("Marry");
        ballot_address=msg.sender;
        status=voting_status.Started;
    }
    function vote(uint _id) public {
        require(status==voting_status.Started);
        require(!voted_voters[msg.sender],"User Voted Already");
        candidates[_id].vote_count ++;
        voted_voters[msg.sender] = true;
    }

    function add_voter(address _voteraddress) public{
        require(msg.sender==ballot_address);
        voter memory v;
        v.voteraddress=_voteraddress;
        v.voted=false;
        voter_registeration[_voteraddress]=v;

    }

    function ballot_closed() public {

    require(status==voting_status.Started);
    status=voting_status.Ended;
    

    }


}