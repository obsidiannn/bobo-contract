import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BoboErc20Module = buildModule("BoboErc20Module", (m) => {
  const instance = m.contract("BoboErc20", ["BoboErc20 Name", "BoboErc20"]);
  return { instance };
});

export default BoboErc20Module;
