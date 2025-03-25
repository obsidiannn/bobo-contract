import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { BoboToken } from "../typechain-types";

describe("BoboToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {

        // Contracts are deployed using the first signer/account by default
        const [owner] = await hre.ethers.getSigners();

        const BoboErc20 = await hre.ethers.getContractFactory("BoboToken");
        const instance = await BoboErc20.deploy("BoboToken Contract", "BOT") as unknown as BoboToken;

        return { instance, owner };
    }

   describe("claimTokens", async function (){
        
        it("should allow claiming tokens from specific contract address on local network", async function () {
            // 设置特定合约地址
            const specificAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
            const instance = await hre.ethers.getContractAt("BoboToken", specificAddress);

            const [user] = await hre.ethers.getSigners();
            
            // 验证是否在本地网络
            const network = await hre.ethers.provider.getNetwork();
            expect(network.chainId).to.equal(31337n); // Hardhat本地网络的chainId

            // 验证合约地址是否存在
            const code = await hre.ethers.provider.getCode(specificAddress);
            expect(code).to.not.equal("0x", "目标合约地址不存在");
            
            // 调用领取token函数
            await instance.connect(user).claimTokens();
            
            // 验证用户余额增加
            const balance = await instance.connect(user).balanceOf(user.address);
            console.log('balance = {}',balance);
            
            expect(balance).to.be.gt(0); // 确保余额大于0
            
        });
   })

});
