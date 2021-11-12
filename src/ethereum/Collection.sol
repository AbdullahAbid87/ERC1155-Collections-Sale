// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155,Ownable {
    uint256 public constant Item1 = 0;
    uint256 public constant Item2 = 1;
    uint256 public constant Item3 = 2;
    uint256 public constant Item4 = 3;
    uint256 public constant Item5 = 4;
    uint256 public constant Item6 = 5;
    uint256 public constant Item7 = 6;
    uint256 public constant Item8 = 7;
    uint256 public constant Item9 = 8;
    uint256 public constant Item10 = 9;
    uint256 public constant quantity = 10;
    uint256 public constant nftSupply = 10;
    uint256 public cost = 0.01 ether;
    bool public paused = false;
    string public baseExtension = ".json";
    string baseURI="https://gateway.pinata.cloud/ipfs/QmdgYwSA6c9Cdms9w1mEqtcXPkaZzAgtVTegg5SBAHPfhD/";
    uint256[] public amountMinted = new uint256[](nftSupply);
    
    constructor()  ERC1155(string(abi.encodePacked(baseURI,"${id}.json")) ) {}
    
    function mint(uint256 _mintAmount,uint256 id) public payable {
        require(!paused);
        require(_mintAmount > 0);
        uint256 remainingSupply = quantity - amountMinted[id]; 
        require(remainingSupply - _mintAmount <= quantity);
        require(msg.value >= cost * _mintAmount, "Insufficient Balance");
        
        _mint(msg.sender, id ,_mintAmount, "");
        amountMinted[id] = amountMinted[id] + _mintAmount;
    }
    function uri(uint256 _tokenId) override public view returns (string memory){
        return string(
            abi.encodePacked(
                baseURI,
                Strings.toString(_tokenId),
                ".json"
            )
        );
     }
    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
    function pause(bool _state) public onlyOwner {
     paused = _state;
    }
    function contractBalance() public view returns(uint) {
       return address(this).balance;
    }
    function getMintedAmounts() public view returns(uint256[] memory){
        return amountMinted;
    }
    function getRemainingAmount(uint256 index) public view returns(uint256){
        return quantity-amountMinted[index];
    }
}
