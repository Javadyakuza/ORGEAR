import { expect } from "chai";
import { Address, Contract, Signer, zeroAddress } from "locklift";
import { FactorySource } from "../build/factorySource";
import { CreateAccountOutput, WalletTypes } from "locklift/types/index";
import { DaoBranchConfig } from "./structures_template/DAOBranchConfig.example";
import { ProposalConfigurationStructure } from "./structures_template/ProposalConfigurationStructure.example";
import { ProposalAction } from "./structures_template/ProposalActionStruct.example";
import { FactoryType } from "locklift/internal/factory";
var DAOBranchCon: Contract<FactorySource["DAOBranch"]>;
let DAORootAddr: Address;
let DAOBranchAddr: Address;
let Tip3voteRootAddr: Address;
let Tip3voteWalletAddr: Address;
let ActionTestPersonalDataAddr: Address;
let ProposalAddr_1: Address;
let ProposalAddr_2: Address;
let WalletV3: CreateAccountOutput;
let signer: Signer;
let WalletV3_2: CreateAccountOutput;
let signer2: Signer;
describe("shuold perform vote casting", async function () {
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
    expect(locklift.factory.getContractArtifacts("Proposal").code).not.to.equal(undefined, "Code should be available");
    expect(locklift.factory.getContractArtifacts("Proposal").abi).not.to.equal(undefined, "ABI should be available");
    expect(locklift.factory.getContractArtifacts("Proposal").tvc).not.to.equal(undefined, "tvc should be available");
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
    console.log("walletv3 : ", WalletV3.account.address.toString());
    signer2 = (await locklift.keystore.getSigner("1"))!;
    // making the wallet v3 and the token root  and wallet \
    // deploying it
    WalletV3_2 = await locklift.factory.accounts.addNewAccount({
      type: WalletTypes.WalletV3, // or WalletTypes.HighLoadWallet or WalletTypes.WalletV3,
      //Value which will send to the new account from a giver
      value: locklift.utils.toNano(100),
      //owner publicKey
      publicKey: signer.publicKey,
    });
    WalletV3.account.prepareMessage;
    console.log("walletv3_2 : ", WalletV3.account.address.toString());
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
        initialSupplyTo: WalletV3_2.account.address,
        initialSupply: locklift.utils.toNano(1000),
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
      await Tip3voteRoot.methods.walletOf({ answerId: 0, walletOwner: WalletV3_2.account.address }).call({})
    ).value0;
    console.log(`VoteRoot : ${Tip3voteRootAddr} \n VoteWallet : ${Tip3voteWalletAddr}`);
    // testing root deployment
    expect((await Tip3voteRoot.methods.name({ answerId: 0 }).call({})).value0).to.eq("Venom Dao Token");
    const Tip3voteWallet = locklift.factory.getDeployedContract("VoteTokenWallet", Tip3voteWalletAddr);
    // testing the wallet owneer to be the wallet v3
    expect((await Tip3voteWallet.methods.owner({ answerId: 0 }).call({})).value0.toString()).to.eq(
      WalletV3_2.account.address.toString(),
    );
    // testing wallet
    expect((await Tip3voteWallet.methods.balance({ answerId: 0 }).call({})).value0.toString()).to.eq("1000000000000");

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
      value: locklift.utils.toNano(50),
    });
    // setting the state variable
    DAORootAddr = DAORoot.address;
    console.log("DAORoot : ", DAORoot.address.toString());
    // testing the dao root
    expect((await DAORoot.methods.getAdmin({}).call({})).admin_.toString()).to.eq(WalletV3.account.address.toString());

    // fetching the contracts

    // changing the Dao Branch Configuration
    DaoBranchConfig.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
    // changing the actions
    // calling the propose function
    let DaoBranchdeployRes = await locklift.tracing.trace(
      DAORoot.methods
        .DeployDaoBranch({
          _DaoBranchConfig: DaoBranchConfig,
          _branchNonce: 69,
        })
        .send({
          from: WalletV3.account.address,
          amount: locklift.utils.toNano(10),
        }),
    );
    expect((await DaoBranchdeployRes).aborted).to.eq(false);
    // fetching the deployed contract
    const DaoBranch = await locklift.factory.getDeployedContract(
      "DAOBranch",
      (
        await DAORoot.methods
          .expectedDaoBranchAddress({
            _admin_: WalletV3.account.address,
            _nonce_: 69,
          })
          .call({})
      ).value0,
    );
    DAOBranchCon = DaoBranch;
    console.log("Dao Branch address : ", DaoBranch.address.toString());
    console.log("branch balance : ", await locklift.provider.getBalance(DaoBranch.address));
    // setting the state varibale
    DAOBranchAddr = DaoBranch.address;
    // testing the branch
    expect((await DaoBranch.methods.getAdmin({}).call({})).admin_.toString()).to.eq(
      WalletV3.account.address.toString(),
    );
    // deploying it
    const { contract: ActionTestPersonalData } = await locklift.factory.deployContract({
      contract: "ActionTestPersonalData",
      publicKey: signer2.publicKey,
      initParams: {},
      constructorParams: {
        _age: 43,
        _name: "javad",
      },
      value: locklift.utils.toNano("2"),
    });
    console.log("ActionTestPersonalData address : ", ActionTestPersonalData.address.toString());
    // setting the state varibale
    ActionTestPersonalDataAddr = ActionTestPersonalData.address;
    // testing the date
    expect((await ActionTestPersonalData.methods.age({}).call({})).age.toString()).to.eq("43");
    // fetching tha DaoBranch contract and the action tester

    ProposalAction[0].target = ActionTestPersonalDataAddr;
    ProposalAction[1].target = ActionTestPersonalDataAddr;
    ProposalAction[0].payload = await ActionTestPersonalData.methods.setAge({ _age: 9 }).encodeInternal();
    ProposalAction[1].payload = await ActionTestPersonalData.methods.setName({ _name: "hamed" }).encodeInternal();
    // changing the actions
    // changing the poroposal configuration tip3 vote address
    ProposalConfigurationStructure.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
    const { traceTree: data } = await locklift.tracing.trace(
      DaoBranch.methods
        .propose({
          _ProposalInitConfiguration: ProposalConfigurationStructure,
          _venomActions: ProposalAction,
        })
        .send({
          from: WalletV3.account.address,
          amount: locklift.utils.toNano(20),
        }),
    );
    // fetching the emmited event reffering to ther propoal deploying
    const ProposalEvents = data?.findEventsForContract({
      contract: DAOBranchCon,
      name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
    });
    console.log("this is the proposal id : ", ProposalEvents![0].proposalId);
    // fetching the deployed proposal
    const Proposal = await locklift.factory.getDeployedContract(
      "Proposal",
      (
        await DaoBranch.methods.expectedProposalAddress({ _proposalId: ProposalEvents![0].proposalId }).call({})
      ).expectedProposalAddress_,
    );
    expect((await Proposal.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID).to.eq(ProposalEvents![0].proposalId);
    // fetching tha DaoBranch contract and the action tester
    // changing the actions
    // changing the poroposal configuration tip3 vote address
    ProposalConfigurationStructure.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
    const { traceTree: data_2 } = await locklift.tracing.trace(
      DaoBranch.methods
        .propose({
          _ProposalInitConfiguration: ProposalConfigurationStructure,
          _venomActions: ProposalAction,
        })
        .send({
          from: WalletV3_2.account.address,
          amount: locklift.utils.toNano(20),
        }),
    );
    // fetching the emmited event reffering to ther propoal deploying
    const ProposalEvents_2 = data_2?.findEventsForContract({
      contract: DAOBranchCon,
      name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
    });
    console.log("this is the proposal id : ", ProposalEvents_2![0].proposalId);
    // fetching the deployed proposal
    const Proposal_2 = await locklift.factory.getDeployedContract(
      "Proposal",
      (
        await DaoBranch.methods.expectedProposalAddress({ _proposalId: ProposalEvents_2![0].proposalId }).call({})
      ).expectedProposalAddress_,
    );
    expect((await Proposal_2.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID).to.eq(ProposalEvents_2![0].proposalId);
    // setting the state variables
    ProposalAddr_1 = Proposal.address;
    ProposalAddr_2 = Proposal_2.address;
    console.log("proposal : ", ProposalAddr_1.toString());
    console.log("proposal 2 : ", ProposalAddr_2.toString());
  });
  it("shuold cast a for vote", async function () {
    // fetching the firsst poroposal contract
    const proposal = await locklift.factory.getDeployedContract("Proposal", ProposalAddr_1);
    const DaoBranch = await locklift.factory.getDeployedContract("DAOBranch", DAOBranchAddr);

    // casting the vote with the second account
    const voteres = await locklift.tracing.trace(
      proposal.methods
        .vote({
          _reason: "a good reason",
          _support: true,
        })
        .send({
          from: WalletV3_2.account.address,
          amount: locklift.utils.toNano(1),
        }),
    );
    console.log(
      "thi si the expected address : ",
      (
        await DaoBranch.methods.expectedTip3VoteWalletAddress({ _walletOwner: WalletV3_2.account.address }).call({})
      ).expectedTip3WalletAddress_.toString(),
    );
    console.log("voting result :", (await proposal.methods.getPorosposalOverview({}).call({})).initConf_.forVotes);
  });
  //   it("shuold cast a against vote", async function () {});
});