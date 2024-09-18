import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BoboErc20Module = buildModule("BoboTokenModule", (m) => {
  const instance = m.contract("BoboToken", ["BoboToken", "BOT"]);
  return { instance };
});

export default BoboErc20Module;
