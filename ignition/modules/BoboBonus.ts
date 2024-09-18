import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BoboErc20Module = buildModule("BoboErc4646Bonus", (m) => {
  const instance = m.contract("BoboErc4646Bonus", ["0x0B61ACA359Ea87645bE626162B0B37d4f34F3298", 10n]);
  return { instance };
});

export default BoboErc20Module;
