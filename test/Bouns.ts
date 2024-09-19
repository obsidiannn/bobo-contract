import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";


describe('bobo bouns', () => {

    async function deployBoboToken() {
        const BoboErc20 = await hre.ethers.getContractFactory("BoboToken");
        const instance = await BoboErc20.deploy("Bobo","BOT");
        return { instance };
    }

    async function deployBoboBouns(address: string) {
        const BoboErc4646Bonus = await hre.ethers.getContractFactory("BoboErc4646Bonus");
        // 100 = 1%
        const instance = await BoboErc4646Bonus.deploy(address,100n);
        return { instance };
    }

    it('deployBouns', async () => {
        const [user1, user2] = await hre.ethers.getSigners();

        const tokenResult = await deployBoboToken()
        const tokenAddress = await tokenResult.instance.getAddress()
        const bouns = await deployBoboBouns(tokenAddress)
        const bounsAddress = await bouns.instance.getAddress()
        console.log('bouns address:', bounsAddress);


        await tokenResult.instance.connect(user1).mint()
        const r = await tokenResult.instance.balanceOf(user1.address)
        console.log('user1 token = ', r);

        await tokenResult.instance.approve(bounsAddress, 9n)
        await bouns.instance.connect(user1).deposit(9n, user1.address)
        // await bouns.instance.connect(user1).mint(100n, user1.address)

    })


})