import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BoboTokenModule = buildModule("BoboTokenModule", (m) => {
  const instance = m.contract("BoboToken", ["BoboToken", "BOT"]);
  return { instance };
});

export default BoboTokenModule;
