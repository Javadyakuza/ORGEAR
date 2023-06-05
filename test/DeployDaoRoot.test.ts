import { expect } from "chai";
import { Address, Contract, Signer, zeroAddress } from "locklift";
import { FactorySource } from "../build/factorySource";
import { CreateAccountOutput, WalletTypes } from "locklift/types/index";
import { FactoryType } from "locklift/internal/factory";
let DAORootAddr: Address;
let Tip3voteRootAddr: Address;
let Tip3voteWalletAddr: Address;
let WalletV3: CreateAccountOutput;
let signer: Signer;

describe("deploying Dao contract", async function () {
  before(async () => {
    // checking the codes of contracts are availbale or no
    expect(locklift.factory.getContractArtifacts("VoteTokenRoot").code).not.to.equal(
      undefined,
      "Code should be available",
    );
    expect(locklift.factory.getContractArtifacts("VoteTokenRoot").abi).not.to.equal(
      undefined,
      "ABI should be available",
    );
    expect(locklift.factory.getContractArtifacts("VoteTokenRoot").tvc).not.to.equal(
      undefined,
      "tvc should be available",
    );
    expect(locklift.factory.getContractArtifacts("VoteTokenWallet").code).not.to.equal(
      undefined,
      "Code should be available",
    );
    expect(locklift.factory.getContractArtifacts("VoteTokenWallet").abi).not.to.equal(
      undefined,
      "ABI should be available",
    );
    expect(locklift.factory.getContractArtifacts("VoteTokenWallet").tvc).not.to.equal(
      undefined,
      "tvc should be available",
    );
    expect(locklift.factory.getContractArtifacts("DAORoot").code).not.to.equal(undefined, "Code should be available");
    expect(locklift.factory.getContractArtifacts("DAORoot").abi).not.to.equal(undefined, "ABI should be available");
    expect(locklift.factory.getContractArtifacts("DAORoot").tvc).not.to.equal(undefined, "tvc should be available");
    expect(locklift.factory.getContractArtifacts("DAOBranch").code).not.to.equal(undefined, "Code should be available");
    expect(locklift.factory.getContractArtifacts("DAOBranch").abi).not.to.equal(undefined, "ABI should be available");
    expect(locklift.factory.getContractArtifacts("DAOBranch").tvc).not.to.equal(undefined, "tvc should be available");
    expect(locklift.factory.getContractArtifacts("Proposal").code).not.to.equal(undefined, "Code should be available");
    expect(locklift.factory.getContractArtifacts("Proposal").abi).not.to.equal(undefined, "ABI should be available");
    expect(locklift.factory.getContractArtifacts("Proposal").tvc).not.to.equal(undefined, "tvc should be available");
    expect(locklift.factory.getContractArtifacts("ActionTestPersonalData").code).not.to.equal(
      undefined,
      "Code should be available",
    );
    expect(locklift.factory.getContractArtifacts("ActionTestPersonalData").abi).not.to.equal(
      undefined,
      "ABI should be available",
    );
    expect(locklift.factory.getContractArtifacts("ActionTestPersonalData").tvc).not.to.equal(
      undefined,
      "tvc should be available",
    );
    // making the signer
    signer = (await locklift.keystore.getSigner("0"))!;
    // making the wallet v3 and the token root  and wallet \
    // deploying it
    WalletV3 = await locklift.factory.accounts.addNewAccount({
      type: WalletTypes.WalletV3, // or WalletTypes.HighLoadWallet or WalletTypes.WalletV3,
      //Value which will send to the new account from a giver
      value: locklift.utils.toNano(100),
      //owner publicKey
      publicKey: signer.publicKey,
    });
    WalletV3.account.prepareMessage;
    expect(WalletV3.account.address).to.not.eq(zeroAddress);
    // in this operation we will send the intial supplu to the owner of the root and this will deploya wallet for us and reduces the work that we need to do
    // getting the wallet code
    const walletCode: string = locklift.factory.getContractArtifacts("VoteTokenWallet").code;
    // deploying root
    const { contract: Tip3voteRoot } = await locklift.factory.deployContract({
      contract: "VoteTokenRoot",
      publicKey: signer.publicKey,
      initParams: {
        name_: "Venom Dao Token",
        symbol_: "VDT",
        decimals_: "9",
        rootOwner_: WalletV3.account.address,
        walletCode_: walletCode,
        randomNonce_: locklift.utils.getRandomNonce(),
        deployer_: zeroAddress,
      },
      constructorParams: {
        initialSupplyTo: WalletV3.account.address,
        initialSupply: 100,
        deployWalletValue: locklift.utils.toNano(0.1),
        mintDisabled: false,
        burnByRootDisabled: false,
        burnPaused: false,
        remainingGasTo: WalletV3.account.address,
      },
      value: locklift.utils.toNano(2),
    });
    Tip3voteRootAddr = Tip3voteRoot.address;
    // getting the wallet address
    Tip3voteWalletAddr = (
      await Tip3voteRoot.methods.walletOf({ answerId: 0, walletOwner: WalletV3.account.address }).call({})
    ).value0;
    // testing root deployment
    expect((await Tip3voteRoot.methods.name({ answerId: 0 }).call({})).value0).to.eq("Venom Dao Token");
    const Tip3voteWallet = locklift.factory.getDeployedContract("VoteTokenWallet", Tip3voteWalletAddr);
    // testing the wallet owneer to be the wallet v3
    expect((await Tip3voteWallet.methods.owner({ answerId: 0 }).call({})).value0.toString()).to.eq(
      WalletV3.account.address.toString(),
    );
    // testing wallet
    expect((await Tip3voteWallet.methods.balance({ answerId: 0 }).call({})).value0.toString()).to.eq("100");
  });

  it("should deploy Dao Root ", async function () {
    // deploying the DAORoot contract
    const { contract: DAORoot } = await locklift.factory.deployContract({
      contract: "DAORoot",
      publicKey: signer.publicKey,
      initParams: {
        admin: WalletV3.account.address,
        _nonce: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
        _DaoBranchCode: locklift.factory.getContractArtifacts("DAOBranch").code,
      },
      value: locklift.utils.toNano(10),
    });
    // setting the state variable
    DAORootAddr = DAORoot.address;
    // testing the dao root
    expect((await DAORoot.methods.getAdmin({}).call({})).admin_.toString()).to.eq(WalletV3.account.address.toString());
  });
});
// must check the code
