import BigNumber from "bignumber.js";
import { Address, zeroAddress } from "locklift";
import { CreateAccountOutput, WalletTypes } from "locklift/types/index";



async function main() {
  console.log("Starting DAORoot contract deployment...");

  const signer = (await locklift.keystore.getSigner("0"))!;
  let WalletV3: CreateAccountOutput;
  WalletV3 = await locklift.factory.accounts.addNewAccount({
    type: WalletTypes.WalletV3, // or WalletTypes.HighLoadWallet or WalletTypes.WalletV3,
    //Value which will send to the new account from a giver
    value: locklift.utils.toNano(100),
    //owner publicKey
    publicKey: signer.publicKey,
  });
  const daoRootFactory = locklift.factory.getContractArtifacts("DAORoot");
  const { contract: DAORoot } = await locklift.factory.deployContract({
    contract: "DAORoot",
    publicKey: signer.publicKey,
    initParams: {
      admin: WalletV3.account.address,
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
      _DaoCode: locklift.factory.getContractArtifacts("DAO").code,
      _ProposalCode: locklift.factory.getContractArtifacts("Proposal").code,
      _Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
    },
    value: locklift.utils.toNano(1),
  });

  console.log(`DAORoot contract deployed at: ${DAORoot.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
