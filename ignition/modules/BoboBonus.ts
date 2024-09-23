import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const BoboErc20Module = buildModule("BoboErc4646Bonus", (m) => {
  const instance = m.contract("BoboErc4646Bonus", ["0x86a6b0629884864578DBA6BB6DDF1346AD753E26", 10n]);
  return { instance };
});

export default BoboErc20Module;
