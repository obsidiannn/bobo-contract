## hardhat

[website](https://hardhat.org)


### init

* npm install --save-dev hardhat
* npx hardhat init

### deploy 
 
* npx hardhat ignition deploy ./ignition/modules/Lock.ts --network ganache
* 如果有改动二次构建的话，要么删文件夹，要么
```
npx hardhat ignition deploy ignition/modules/Fcm.ts --network bsc --verify --deployment-id second-deploy
Ï
```

### run test 
* REPORT_GAS=true npx hardhat test

### 启动network
* npx hardhat node

0x4F944EbCeb893c28564967c113aA8c9C3F69fF36

## 前端

* 在线的脚手架[replit](https://replit.com) 选择nextjs
	* [demo](https://replit.com/@thatguyintech/BuyMeACoffee-Solidity-DeFi-Tipping-app?v=1#pages/index.jsx)
* 本地nextjs脚手架
	* yarn create next-app --typescript

* 需要看 [metamask api](https://docs.metamask.io/wallet/how-to/connect/)