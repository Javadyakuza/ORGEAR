// import { expect } from "chai";
// import { Address, Contract, Signer, zeroAddress } from "locklift";
// import { FactorySource } from "../build/factorySource";
// import { CreateAccountOutput, WalletTypes } from "locklift/types/index";
// import { DaoConfig } from "./structures_template/DAOConfig.example";
// import { ProposalConfigurationStructure } from "./structures_template/ProposalConfigurationStructure.example";
// import { ProposalAction } from "./structures_template/ProposalActionStruct.example";

// import { FactoryType } from "locklift/internal/factory";
// var DAOCon: Contract<FactorySource["DAO"]>;
// let DAORootAddr: Address;
// let DAOAddr: Address;
// let Tip3voteRootAddr: Address;
// let Tip3voteWalletAddr: Address;
// let ActionTestPersonalDataAddr: Address;
// let ProposalAddr: Address;
// let WalletV3: CreateAccountOutput;
// let signer: Signer;
// let WalletV3_2: CreateAccountOutput;
// let signer2: Signer;
// describe("shuold deploy proposal", async function () {
//   before(async () => {
//     // checking the codes of contracts are availbale or no
//     expect(locklift.factory.getContractArtifacts("VoteTokenRoot").code).not.to.equal(
//       undefined,
//       "Code should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("VoteTokenRoot").abi).not.to.equal(
//       undefined,
//       "ABI should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("VoteTokenRoot").tvc).not.to.equal(
//       undefined,
//       "tvc should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("VoteTokenWallet").code).not.to.equal(
//       undefined,
//       "Code should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("VoteTokenWallet").abi).not.to.equal(
//       undefined,
//       "ABI should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("VoteTokenWallet").tvc).not.to.equal(
//       undefined,
//       "tvc should be available",
//     );
//     expect(locklift.factory.getContractArtifacts("DAORoot").code).not.to.equal(undefined, "Code should be available");
//     expect(locklift.factory.getContractArtifacts("DAORoot").abi).not.to.equal(undefined, "ABI should be available");
//     expect(locklift.factory.getContractArtifacts("DAORoot").tvc).not.to.equal(undefined, "tvc should be available");
//     expect(locklift.factory.getContractArtifacts("Proposal").code).not.to.equal(undefined, "Code should be available");
//     expect(locklift.factory.getContractArtifacts("Proposal").abi).not.to.equal(undefined, "ABI should be available");
//     expect(locklift.factory.getContractArtifacts("Proposal").tvc).not.to.equal(undefined, "tvc should be available");
//     // making the signer
//     signer = (await locklift.keystore.getSigner("0"))!;
//     // making the wallet v3 and the token root  and wallet \
//     // deploying it
//     WalletV3 = await locklift.factory.accounts.addNewAccount({
//       type: WalletTypes.WalletV3, // or WalletTypes.HighLoadWallet or WalletTypes.WalletV3,
//       //Value which will send to the new account from a giver
//       value: locklift.utils.toNano(100),
//       //owner publicKey
//       publicKey: signer.publicKey,
//     });
//     WalletV3.account.prepareMessage;
//     signer2 = (await locklift.keystore.getSigner("1"))!;
//     // making the wallet v3 and the token root  and wallet \
//     // deploying it
//     WalletV3_2 = await locklift.factory.accounts.addNewAccount({
//       type: WalletTypes.WalletV3, // or WalletTypes.HighLoadWallet or WalletTypes.WalletV3,
//       //Value which will send to the new account from a giver
//       value: locklift.utils.toNano(100),
//       //owner publicKey
//       publicKey: signer.publicKey,
//     });
//     WalletV3.account.prepareMessage;
//     expect(WalletV3.account.address).to.not.eq(zeroAddress);
//     // in this operation we will send the intial supplu to the owner of the root and this will deploya wallet for us and reduces the work that we need to do
//     // getting the wallet code
//     const walletCode: string = locklift.factory.getContractArtifacts("VoteTokenWallet").code;
//     // deploying root
//     const { contract: Tip3voteRoot } = await locklift.factory.deployContract({
//       contract: "VoteTokenRoot",
//       publicKey: signer.publicKey,
//       initParams: {
//         name_: "Venom Dao Token",
//         symbol_: "VDT",
//         decimals_: "9",
//         rootOwner_: WalletV3.account.address,
//         walletCode_: walletCode,
//         randomNonce_: locklift.utils.getRandomNonce(),
//         deployer_: zeroAddress,
//       },
//       constructorParams: {
//         initialSupplyTo: WalletV3_2.account.address,
//         initialSupply: 100,
//         deployWalletValue: locklift.utils.toNano(0.1),
//         mintDisabled: false,
//         burnByRootDisabled: false,
//         burnPaused: false,
//         remainingGasTo: WalletV3.account.address,
//       },
//       value: locklift.utils.toNano(2),
//     });
//     Tip3voteRootAddr = Tip3voteRoot.address;
//     // getting the wallet address
//     Tip3voteWalletAddr = (
//       await Tip3voteRoot.methods.walletOf({ answerId: 0, walletOwner: WalletV3_2.account.address }).call({})
//     ).value0;
//     // testing root deployment
//     expect((await Tip3voteRoot.methods.name({ answerId: 0 }).call({})).value0).to.eq("Venom Dao Token");
//     const Tip3voteWallet = locklift.factory.getDeployedContract("VoteTokenWallet", Tip3voteWalletAddr);
//     // testing the wallet owneer to be the wallet v3
//     expect((await Tip3voteWallet.methods.owner({ answerId: 0 }).call({})).value0.toString()).to.eq(
//       WalletV3_2.account.address.toString(),
//     );
//     // testing wallet
//     expect((await Tip3voteWallet.methods.balance({ answerId: 0 }).call({})).value0.toString()).to.eq("100");

//     // deploying the DAORoot contract
//     const { contract: DAORoot } = await locklift.factory.deployContract({
//       contract: "DAORoot",
//       publicKey: signer.publicKey,
//       initParams: {
//         admin: WalletV3.account.address,
//         _nonce: locklift.utils.getRandomNonce(),
//       },
//       constructorParams: {
//         _DaoCode: locklift.factory.getContractArtifacts("DAO").code,
//         _ProposalCode: locklift.factory.getContractArtifacts("Proposal").code,
//         _Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
//       },
//       value: locklift.utils.toNano(50),
//     });
//     // setting the state variable
//     DAORootAddr = DAORoot.address;
//     // testing the dao root
//     expect((await DAORoot.methods.getAdmin({}).call({})).admin_.toString()).to.eq(WalletV3.account.address.toString());

//     // fetching the contracts
//     const ActionTestPersonalData = await locklift.factory.getDeployedContract(
//       "ActionTestPersonalData",
//       ActionTestPersonalDataAddr,
//     );

//     // changing the Dao  Configuration
//     DaoConfig.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
//     // changing the actions
//     // calling the propose function
//     let DaodeployRes = await locklift.tracing.trace(
//       DAORoot.methods
//         .DeployDao({
//           _DaoConfig: DaoConfig,
//         })
//         .send({
//           from: WalletV3.account.address,
//           amount: locklift.utils.toNano(10),
//         }),
//     );
//     expect((await DaodeployRes).aborted).to.eq(false);
//     // fetching the deployed contract
//     const Dao = await locklift.factory.getDeployedContract(
//       "DAO",
//       (
//         await DAORoot.methods
//           .expectedDaoAddress({
//             _admin_: WalletV3.account.address,
//             _daoId: 0,
//           })
//           .call({})
//       ).value0,
//     );
//     DAOCon = Dao;
//     // setting the state varibale
//     DAOAddr = Dao.address;
//     // testing the
//     expect((await Dao.methods.getAdmin({}).call({})).admin_.toString()).to.eq(WalletV3.account.address.toString());
//   });
//   it("should deploy ActionTestPersonalData", async function () {
//     // deploying it
//     const { contract: ActionTestPersonalData } = await locklift.factory.deployContract({
//       contract: "ActionTestPersonalData",
//       publicKey: signer.publicKey,
//       initParams: {},
//       constructorParams: {
//         _age: 43,
//         _name: "javad",
//       },
//       value: locklift.utils.toNano("2"),
//     });
//     // setting the state varibale
//     ActionTestPersonalDataAddr = ActionTestPersonalData.address;
//     // testing the date
//     expect((await ActionTestPersonalData.methods.age({}).call({})).age.toString()).to.eq("43");
//   });
//   it("shuold deploy a proposal by admin from dao ", async function () {
//     // fetching tha Dao contract and the action tester
//     const Dao = await locklift.factory.getDeployedContract("DAO", DAOAddr);
//     const ActionTestPersonalData = await locklift.factory.getDeployedContract(
//       "ActionTestPersonalData",
//       ActionTestPersonalDataAddr,
//     );
//     ProposalAction[0].target = ActionTestPersonalDataAddr;
//     ProposalAction[1].target = ActionTestPersonalDataAddr;
//     ProposalAction[0].payload = await ActionTestPersonalData.methods.setAge({ _age: 9 }).encodeInternal();
//     ProposalAction[1].payload = await ActionTestPersonalData.methods.setName({ _name: "hamed" }).encodeInternal();
//     // changing the actions
//     // changing the poroposal configuration tip3 vote address
//     const { traceTree: data } = await locklift.tracing.trace(
//       Dao.methods
//         .propose({
//           _ProposalInitConfiguration: ProposalConfigurationStructure,
//           _venomActions: ProposalAction,
//         })
//         .send({
//           from: WalletV3.account.address,
//           amount: locklift.utils.toNano(20),
//         }),
//     );
//     // fetching the emmited event reffering to ther propoal deploying
//     const ProposalEvents = data?.findEventsForContract({
//       contract: DAOCon,
//       name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
//     });
//     // fetching the deployed proposal
//     const Proposal = await locklift.factory.getDeployedContract(
//       "Proposal",
//       (
//         await Dao.methods.expectedProposalAddress({ _proposalId: ProposalEvents![0].proposalId }).call({})
//       ).expectedProposalAddress_,
//     );

//     // expect((await Proposal.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID).to.eq(ProposalEvents![0].proposalId);
//   });

//   it("shuold deploy a proposal by DAOTokenHolder from dao ", async function () {
//     // fetching tha Dao contract and the action tester
//     const Dao = await locklift.factory.getDeployedContract("DAO", DAOAddr);
//     const ActionTestPersonalData = await locklift.factory.getDeployedContract(
//       "ActionTestPersonalData",
//       ActionTestPersonalDataAddr,
//     );
//     ProposalAction[0].target = ActionTestPersonalDataAddr;
//     ProposalAction[1].target = ActionTestPersonalDataAddr;
//     ProposalAction[0].payload = await ActionTestPersonalData.methods.setAge({ _age: 9 }).encodeInternal();
//     ProposalAction[1].payload = await ActionTestPersonalData.methods.setName({ _name: "hamed" }).encodeInternal();
//     // changing the actions
//     // changing the poroposal configuration tip3 vote address
//     const { traceTree: data } = await locklift.tracing.trace(
//       Dao.methods
//         .propose({
//           _ProposalInitConfiguration: ProposalConfigurationStructure,
//           _venomActions: ProposalAction,
//         })
//         .send({
//           from: WalletV3_2.account.address,
//           amount: locklift.utils.toNano(20),
//         }),
//     );
//     // fetching the emmited event reffering to ther propoal deploying
//     const ProposalEvents = data?.findEventsForContract({
//       contract: DAOCon,
//       name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
//     });
//     // fetching the deployed proposal
//     const Proposal = await locklift.factory.getDeployedContract(
//       "Proposal",
//       (
//         await Dao.methods.expectedProposalAddress({ _proposalId: ProposalEvents![0].proposalId }).call({})
//       ).expectedProposalAddress_,
//     );

//     expect((await Proposal.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID).to.eq(ProposalEvents![0].proposalId);
//   });
// });
