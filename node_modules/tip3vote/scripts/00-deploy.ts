import BigNumber from "bignumber.js";
import { Address, zeroAddress } from "locklift";

const ROOT_OWNER_ADDRESS = "0:cf903ae7045c5553df013a1f48e8dabaddd39671da24cd695b3757cfd65c2bc4";
const REMAINING_GAS_TO = "0:cf903ae7045c5553df013a1f48e8dabaddd39671da24cd695b3757cfd65c2bc4";
const NAME = "First Vote Token";
const SYMBOL = "VOT";
const INITIAL_SUPPLY_TO = "0:cf903ae7045c5553df013a1f48e8dabaddd39671da24cd695b3757cfd65c2bc4";
const INITIAL_SUPPLY = "1000000000";
const DECIMALS = 18;
const DISABLE_MINT = false;
const DISABLE_BURN_BY_ROOT = false;
const PAUSE_BURN = false;

async function main() {
  console.log("Starting TIP3 contract deployment...");

  const signer = (await locklift.keystore.getSigner("0"))!;
  const voteTokenWalletContract = locklift.factory.getContractArtifacts("VoteTokenWallet");

  const { contract: voteTokenRoot } = await locklift.factory.deployContract({
    contract: "VoteTokenRoot",
    publicKey: signer.publicKey,
    initParams: {
      name_: NAME,
      symbol_: SYMBOL,
      decimals_: DECIMALS,
      rootOwner_: new Address(ROOT_OWNER_ADDRESS),
      walletCode_: voteTokenWalletContract.code,
      randomNonce_: locklift.utils.getRandomNonce(),
      deployer_: zeroAddress,
    },
    constructorParams: {
      initialSupplyTo: new Address(INITIAL_SUPPLY_TO),
      initialSupply: new BigNumber(INITIAL_SUPPLY).shiftedBy(DECIMALS).toFixed(),
      deployWalletValue: locklift.utils.toNano(2),
      mintDisabled: DISABLE_MINT,
      burnByRootDisabled: DISABLE_BURN_BY_ROOT,
      burnPaused: PAUSE_BURN,
      remainingGasTo: new Address(REMAINING_GAS_TO),
    },
    value: locklift.utils.toNano(4),
  });

  console.log(`TIP3 contract deployed at: ${voteTokenRoot.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
