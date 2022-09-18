// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint _id) external;
}

contract Escrow{

    address public nftAddress;
    uint256 public nftId;
    address payable buyer;
    address payable seller;

    constructor(address _nftAddress, uint256 _nftId, address payable _seller, address payable _buyer){
        nftAddress = _nftAddress;
        nftId = _nftId;
        seller = _seller;
        buyer = _buyer;
    }

    function finaliseSale() public {
       // Transfer owenrship of property
       IERC721(nftAddress).transferFrom(seller, buyer, nftId);
    }
}