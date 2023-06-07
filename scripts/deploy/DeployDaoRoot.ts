import { Signer, Address } from "locklift";
import { WalletTypes } from "locklift/types/index";
import * as ever from "everscale-standalone-client";
require("dotenv").config();
async function DaoRootDeployer() {
  const signer = (await locklift.keystore.getSigner("1"))!;
  // making the wallet v3 and the token root  and wallet \
  // deploying it
  const everWallet = ever.EverWalletAccount.fromPubkey({ publicKey: signer.publicKey, workchain: 0 });

  console.log("public key :", signer.publicKey);
  console.log("Deployer : ", (await everWallet).address);

  //   deploying the DAORoot contract
  const { contract: DAORoot } = await locklift.factory.deployContract({
    contract: "DAORoot",
    publicKey: signer.publicKey,
    initParams: {
      admin: (await everWallet).address,
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
      _DaoCode: locklift.factory.getContractArtifacts("DAO").code,
      _ProposalCode: locklift.factory.getContractArtifacts("Proposal").code,
      _Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
    },
    value: locklift.utils.toNano(1),
  });
  //   setting the state variable
  console.log("Daoroot Address : ", DAORoot.address.toString());
}
DaoRootDeployer()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
