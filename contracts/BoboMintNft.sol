// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

struct NftItem {
    address nft_token_addr;
    uint256 token_id;
}

// 盲盒nft管理
contract MintNftManage is Ownable, ERC1155Holder {
    address public support_pay_token;
    uint256 public single_price;
    NftItem[] nft_storage;

    constructor(address _support_pay_token, uint256 _single_price) Ownable(msg.sender) {
        support_pay_token = _support_pay_token;
        single_price = _single_price;
    }

    // 设置可支付币种与价格
    function setSinglePrice(address _support_pay_token, uint256 _single_price) public {
        _checkOwner();
        support_pay_token = _support_pay_token;
        single_price = _single_price;
    }

    // 补充nft （管理员操作）
    function saveNft(address nftToken, uint256[] memory tokenIds) public {
        _checkOwner();
        uint256[] memory vals = new uint256[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            vals[i] = 1;
            // 存入nft链路
            nft_storage.push(NftItem(nftToken, tokenIds[i]));
        }
        ERC1155 nftObj = ERC1155(nftToken);
        // nft划转
        nftObj.safeBatchTransferFrom(msg.sender, address(this), tokenIds, vals, "");
    }

    // 购买nft
    function mint(uint256 count) public returns (NftItem[] memory) {
        ERC20 token = ERC20(support_pay_token);
        uint256 totalAmount = single_price * count;
        bool success = token.transferFrom(msg.sender, super.owner(), totalAmount);
        require(success, "erc20 transfer failed");
        NftItem[] memory result = new NftItem[](count);
        address[] memory addrs = new address[](count);
        uint256[] memory addrCounts = new uint256[](count);
        uint256 addrIndex = 0;

        // 组装 + 随机出item
        for (uint256 i = 0; i < count; i++) {
            uint256 index = randomIndex();
            NftItem memory item = nft_storage[index];
            int256 existIndex = -1;
            for (uint256 ai = 0; ai < addrIndex; ai++) {
                if (addrs[ai] == item.nft_token_addr) {
                    existIndex = int256(ai);
                    break;
                }
            }
            if (existIndex < 0) {
                addrs[addrIndex] = item.nft_token_addr;
                addrCounts[addrIndex] = 1;
                addrIndex++;
            } else {
                addrCounts[uint256(existIndex)] += 1;
            }
            result[i] = item;
            remove(index);
        }
        // 按addr种类发币
        for (uint256 i = 0; i < addrIndex; i++) {
            address addr = addrs[i];
            uint256 addrCount = addrCounts[i];
            uint256[] memory ids = new uint256[](addrCount);
            uint256[] memory vals = new uint256[](addrCount);
            uint256 idx = 0;
            for (uint256 j = 0; j < result.length; j++) {
                if (result[j].nft_token_addr != addr) {
                    continue;
                }
                ids[idx] = result[j].token_id;
                vals[idx] = 1;
                idx++;
            }
            if (idx > 0) {
                require(idx == addrCount, "error length");
                ERC1155 nftObj = ERC1155(addr);
                nftObj.setApprovalForAll(msg.sender, true);
                nftObj.safeBatchTransferFrom(address(this), msg.sender, ids, vals, "");
                nftObj.setApprovalForAll(msg.sender, false);
            }
        }
        return result;
    }

    function randomIndex() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))
            % (nft_storage.length - 1);
    }

    function remove(uint256 index) private {
        if (index >= nft_storage.length) return;

        for (uint256 i = index; i < nft_storage.length - 1; i++) {
            nft_storage[i] = nft_storage[i + 1];
        }
        nft_storage.pop();
    }
}
