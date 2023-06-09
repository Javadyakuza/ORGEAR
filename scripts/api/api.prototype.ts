import { Address, Contract, Signer, zeroAddress } from "locklift";
import { DaoConfig } from "../../test/structures_template/DAOConfig.example";
import { ProposalConfigurationStructure } from "../../test/structures_template/ProposalConfigurationStructure.example";
import { ProposalAction } from "../../test/structures_template/ProposalActionStruct.example";
// dao details
async function GetDaoDetails(DaoAddres: Address) {
  let DeployedDaoCon = await locklift.factory.getDeployedContract("DAO", DaoAddres);
  return (await DeployedDaoCon.methods.getDAOConfig({}).call({})).DAOConfig_;
}
async function GetProposalDetails(ProposalAddres: Address) {
  let DeployedProposalCon = await locklift.factory.getDeployedContract("Proposal", ProposalAddres);
  let ProposalConofAndState = await DeployedProposalCon.methods.getPorosposalOverview({}).call({});
  return ProposalConofAndState.initConf_, ProposalConofAndState.states_;
}
async function CreateDao(Wallet: Address, DaoRootAddres: Address, deplopyAmount: string, Tip3voteRootAddr: Address) {
  let DeployedDaoRootCon = await locklift.factory.getDeployedContract("DAORoot", DaoRootAddres);
  DaoConfig.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
  await DeployedDaoRootCon.methods
    .DeployDao({
      _DaoConfig: DaoConfig,
    })
    .send({
      from: Wallet,
      amount: locklift.utils.toNano(deplopyAmount),
    });
  // checking that if its deployed
  let DeployedCon = await locklift.factory.getDeployedContract(
    "DAO",
    (
      await DeployedDaoRootCon.methods.expectedDaoAddress({ _daoId: 69, _admin_: Wallet }).call({})
    ).value0,
  );
  console.log("is dao deployed ?", (await DeployedCon.methods.getAdmin({}).call({})).admin_ == Wallet);
}
async function DeployProposal(wallet: Address, DaoAddr: Address, deplopyAmount: string, Tip3voteRootAddr: Address) {
  let DeployedCon = await locklift.factory.getDeployedContract("DAO", DaoAddr);
  ProposalAction[0].target = new Address("");
  ProposalAction[1].target = new Address("");
  /// @DEV notice : the following two lines must be replace with the target functions
  ProposalAction[0].payload = await DeployedCon.methods.getAdmin({}).encodeInternal();
  ProposalAction[1].payload = await DeployedCon.methods.getAdmin({}).encodeInternal();
  const { traceTree: data } = await locklift.tracing.trace(
    DeployedCon.methods
      .propose({
        _ProposalInitConfiguration: ProposalConfigurationStructure,
        _venomActions: ProposalAction,
      })
      .send({
        from: wallet,
        amount: deplopyAmount,
      }),
  );
  // fetching the emmited event reffering to ther propoal deploying
  const ProposalEvents = data?.findEventsForContract({
    contract: DeployedCon,
    name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
  });
  console.log("this is the proposal id : ", ProposalEvents![0].proposalId);
  // checking if the poroposal is deployed
  let DeployedProposalCon = await locklift.factory.getDeployedContract(
    "Proposal",
    (
      await DeployedCon.methods.expectedProposalAddress({ _proposalId: ProposalEvents![0].proposalId }).call({})
    ).expectedProposalAddress_,
  );
  console.log(
    "is proposal deployed ? ",
    (await DeployedProposalCon.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID == ProposalEvents![0].proposalId,
  );
}
async function GetDaosList(DaoRootAddress: Address) {
  let deployedDaoRootCon = await locklift.factory.getDeployedContract("DAORoot", DaoRootAddress);
  let deployEvents = (
    await deployedDaoRootCon.getPastEvents({
      filter: event => event.event === "newDAODeployed",
    })
  ).events;
  let daosAddrs = [];
  for (let i = 0; i < deployEvents.length; i++) {
    daosAddrs.push(deployEvents[0]?.data?._address);
  }
  return daosAddrs;
}
async function GetProposalList(DaoAddress: Address) {
  let deployedDaoCon = await locklift.factory.getDeployedContract("DAO", DaoAddress);
  let proposaldeployEvents = (
    await deployedDaoCon.getPastEvents({
      filter: event => event.event === "ProposalDeployed",
    })
  ).events;
  let ProposalsAddrs = [];
  for (let i = 0; i < proposaldeployEvents.length; i++) {
    ProposalsAddrs.push(proposaldeployEvents[0]?.data?._proposal);
  }
  return ProposalsAddrs;
}
async function VoteOnProposal(poroposalAddress: Address, wallet: Address) {
  // notice the token root and wallet and mminitng must be before deploying the pooroposal
  let voteWeight = "1000000000000";
  // fetching the proposal contraact
  const ProposalCon = await locklift.factory.getDeployedContract("Proposal", poroposalAddress);
  const voteres = await ProposalCon.methods
    .vote({
      _reason: "a good reason",
      _support: false,
    })
    .send({
      from: wallet,
      amount: locklift.utils.toNano(1),
    });
  console.log(
    "is vote casted ?",
    (await ProposalCon.methods.getPorosposalOverview({}).call({})).againstVotes_ == voteWeight,
  );
}
