import { expect } from "chai";
import { Address, Contract, Signer, zeroAddress } from "locklift";
import { FactorySource } from "../../../build/factorySource";
import { CreateAccountOutput, WalletTypes } from "locklift/types/index";
import { DaoConfig } from "../../../test/structures_template/DAOConfig.example";
import { ProposalConfigurationStructure } from "../../../test/structures_template/ProposalConfigurationStructure.example";
import { ProposalAction } from "../../../test/structures_template/ProposalActionStruct.example";
import { EverWalletAccount } from "everscale-standalone-client";
import { deployedContracts } from "../../constants";
/**
 * @notce in this testing and deploying session we are just gonna vote yes on the created proposal and there is no againt votes
 */
var DAOCon: Contract<FactorySource["DAO"]>;
var DAORoot: Contract<FactorySource["DAORoot"]>;
var ActionTestPersonalData: Contract<FactorySource["ActionTestPersonalData"]>;
var Proposal: Contract<FactorySource["Proposal"]>;
var everWallet_1: EverWalletAccount;
var everWallet_2: EverWalletAccount;
var signer: Signer;
var signer2: Signer;
async function setSigenrs() {
  signer = (await locklift.keystore.getSigner("1"))!;

  signer2 = (await locklift.keystore.getSigner("2"))!;

  everWallet_1 = await EverWalletAccount.fromPubkey({ publicKey: signer.publicKey!, workchain: 0 });

  everWallet_2 = await EverWalletAccount.fromPubkey({ publicKey: signer2.publicKey!, workchain: 0 });

  console.log(`account 1 : ${everWallet_1.address.toString()} \n account 2 : ${everWallet_2.address.toString()}`);
}
async function DeployDao() {
  // DAORoot = await locklift.factory.getDeployedContract("DAORoot", new Address(deployedContracts.DaoRootAddress));
  // console.log("dao root : ", DAORoot.address.toString());
  // let { traceTree: data } = await locklift.tracing.trace(
  //   DAORoot.methods
  //     .DeployDao({
  //       _DaoConfig: DaoConfig,
  //     })
  //     .send({
  //       from: everWallet_1.address,
  //       amount: locklift.utils.toNano(2),
  //     }),
  // );
  // let DeployDaoEvents = data!.findEventsForContract({
  //   contract: DAORoot,
  //   name: "newDAODeployed" as const,
  // });
  DAOCon = await locklift.factory.getDeployedContract("DAO", new Address(deployedContracts.yakuzatestDao));
  console.log("Dao address : ", DAOCon.address.toString());
  console.log("dao information : \n", (await DAOCon.methods.getDAOConfig({}).call({})).DAOConfig_);
}

async function deployActionTestContract() {
  //   const { contract: ActionTestPersonalData2 } = await locklift.factory.deployContract({
  //     contract: "ActionTestPersonalData",
  //     publicKey: signer.publicKey,
  //     initParams: {},
  //     constructorParams: {
  //       _age: 43,
  //       _name: "javad",
  //     },
  //     value: locklift.utils.toNano("0.2"),
  //   });
  // setting the state varibale
  ActionTestPersonalData = await locklift.factory.getDeployedContract(
    "ActionTestPersonalData",
    new Address(deployedContracts.actionPersonalDataTest),
  );
  console.log("action test address : ", ActionTestPersonalData.address.toString());
}

async function deployProposal() {
  ProposalAction[0].target = ActionTestPersonalData.address;
  ProposalAction[1].target = ActionTestPersonalData.address;
  ProposalAction[0].payload = await ActionTestPersonalData.methods.setAge({ _age: 9 }).encodeInternal();
  ProposalAction[1].payload = await ActionTestPersonalData.methods.setName({ _name: "hamed" }).encodeInternal();

  ProposalConfigurationStructure.description = "another proposal";
  //
  const { traceTree: data } = await locklift.tracing.trace(
    DAOCon.methods
      .propose({
        _ProposalInitConfiguration: ProposalConfigurationStructure,
        _venomActions: ProposalAction,
      })
      .send({
        from: everWallet_1.address,
        amount: locklift.utils.toNano(4.5),
      }),
  );
  // fetching the emmited event reffering to ther propoal deploying
  const ProposalEvents = await data?.findEventsForContract({
    contract: DAOCon,
    name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
  });
  console.log("this is the event ", ProposalEvents);
  // fetching the deployed proposal
  Proposal = await locklift.factory.getDeployedContract("Proposal", ProposalEvents![0]._proposal);
  console.log("proposal information : ", await Proposal.methods.getPorosposalOverview({}).call({}));
}

async function performVoting() {
  await locklift.tracing.trace(
    Proposal.methods
      .vote({
        _reason: "a good reason",
        _support: true,
      })
      .send({
        from: everWallet_1.address,
        amount: locklift.utils.toNano(1),
      }),
  );
  await locklift.tracing.trace(
    Proposal.methods
      .vote({
        _reason: "a bad reason",
        _support: false,
      })
      .send({
        from: everWallet_2.address,
        amount: locklift.utils.toNano(1),
      }),
  );

  console.log(await Proposal.methods.getPorosposalOverview({}).call({}));
}

async function takeActions() {
  await locklift.tracing.trace(
    Proposal.methods.Queue({}).send({ from: everWallet_1.address, amount: locklift.utils.toNano(0.1) }),
  );

  await locklift.tracing.trace(
    Proposal.methods.execute({}).send({ from: everWallet_1.address, amount: locklift.utils.toNano(0.5) }),
  );
  // fetcing the action contract
  console.log("action contract name : ", (await ActionTestPersonalData.methods.name({}).call({})).name);
  console.log("action contract age : ", (await ActionTestPersonalData.methods.age({}).call({})).age);
}
setSigenrs()
  .then(async res => {
    console.log("signers set ✅");
    DeployDao()
      .then(async res => {
        console.log("dao Deployed ✅");
        deployActionTestContract()
          .then(async res => {
            console.log("action test deployed ✅");
            deployProposal()
              .then(async res => {
                console.log("deployed proposal  ✅");
                performVoting()
                  .then(async res => {
                    console.log("voting performed ✅");
                    setTimeout(async () => {
                      takeActions()
                        .then(async res => {
                          console.log("action taken ✅");
                          process.exit(0);
                        })
                        .catch(err => {
                          console.log("error on taking the actions  ❌", err);
                          process.exit(1);
                        });
                    }, 180000);
                  })
                  .catch(err => {
                    console.log("error on performing votes ❌", err);
                    process.exit(1);
                  });
              })
              .catch(err => {
                console.log("error on propoal deploying❌", err);
                process.exit(1);
              });
          })
          .catch(err => {
            console.log("error on action test deploying ❌", err);
            process.exit(1);
          });
      })
      .catch(err => {
        console.log("error on Dao deploying ❌", err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.log("error on signer setting ❌", err);
    process.exit(1);
  });
