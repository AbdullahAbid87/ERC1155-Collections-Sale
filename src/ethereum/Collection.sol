// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collections is ERC1155, Ownable {
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
    uint256[] public quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    uint256 public constant uniqueNFT = 10;
    uint256 public constant freeNftsupply = 2500;
    uint256 public freeNftAvailed = 0;
    uint256 public constant freeNftID = 0;
    uint256 public constant freeNftPerUser = 1;
    uint256[] public cost = [
        0.01 ether,
        0.02 ether,
        0.03 ether,
        0.04 ether,
        0.05 ether,
        0.06 ether,
        0.07 ether,
        0.08 ether,
        0.09 ether,
        0.1 ether
    ];
    uint256[] public amountMinted = new uint256[](uniqueNFT);
    mapping(address => bool) public availedNftUsers;
    bool public paused = false;
    string public baseExtension = ".json";
    string baseURI =
        "https://gateway.pinata.cloud/ipfs/QmdgYwSA6c9Cdms9w1mEqtcXPkaZzAgtVTegg5SBAHPfhD/";

    constructor() ERC1155(string(abi.encodePacked(baseURI, "${id}.json"))) {}

    function mint(uint256 _mintAmount, uint256 id) public payable {
        require(!paused);
        require(_mintAmount > 0);
        uint256 remainingSupply = quantity[id] - amountMinted[id];
        require(remainingSupply - _mintAmount <= quantity[id]);
        require(msg.value >= cost[id] * _mintAmount, "Insufficient Balance");

        _mint(msg.sender, id, _mintAmount, "");
        amountMinted[id] = amountMinted[id] + _mintAmount;
    }

    function mintFreeNFT() public payable {
        require(!availedNftUsers[msg.sender], "Already Availed FREE NFT");
        require(canClaimFreeNFT(), "Free NFT Supply has been fulfilled");
        _mint(msg.sender, freeNftID, freeNftPerUser, "");
        availedNftUsers[msg.sender] = true;
        ++freeNftAvailed;
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(baseURI, Strings.toString(_tokenId), ".json")
            );
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getMintedAmounts() public view returns (uint256[] memory) {
        return amountMinted;
    }

    function getRemainingAmount(uint256 index) public view returns (uint256) {
        return quantity[index] - amountMinted[index];
    }

    function hasClaimedFreeNFT(address user) public view returns (bool) {
        return availedNftUsers[user];
    }

    function canClaimFreeNFT() public view returns (bool) {
        return freeNftAvailed <= freeNftsupply;
    }
}
