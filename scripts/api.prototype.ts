import { Address, Contract, Signer, zeroAddress } from "locklift";
import { DaoBranchConfig } from "../test/structures_template/DAOBranchConfig.example";
import { ProposalConfigurationStructure } from "../test/structures_template/ProposalConfigurationStructure.example";
import { ProposalAction } from "../test/structures_template/ProposalActionStruct.example";
// dao details
async function GetDaoDetails(DaoAddres: Address) {
  let DeployedDaoCon = await locklift.factory.getDeployedContract("DAOBranch", DaoAddres);
  return (await DeployedDaoCon.methods.getDAOBranchConfig({}).call({})).DAOBranchConfig_;
}
async function GetProposalDetails(ProposalAddres: Address) {
  let DeployedProposalCon = await locklift.factory.getDeployedContract("Proposal", ProposalAddres);
  let ProposalConofAndState = await DeployedProposalCon.methods.getPorosposalOverview({}).call({});
  return ProposalConofAndState.initConf_, ProposalConofAndState.states_;
}
async function CreateDao(Wallet: Address, DaoRootAddres: Address, deplopyAmount: string, Tip3voteRootAddr: Address) {
  let DeployedDaoRootCon = await locklift.factory.getDeployedContract("DAORoot", DaoRootAddres);
  DaoBranchConfig.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
  await DeployedDaoRootCon.methods
    .DeployDaoBranch({
      _DaoBranchConfig: DaoBranchConfig,
      _branchNonce: 69,
    })
    .send({
      from: Wallet,
      amount: locklift.utils.toNano(deplopyAmount),
    });
  // checking that if its deployed
  let DeployedBranchCon = await locklift.factory.getDeployedContract(
    "DAOBranch",
    (
      await DeployedDaoRootCon.methods.expectedDaoBranchAddress({ _nonce_: 69, _admin_: Wallet }).call({})
    ).value0,
  );
  console.log("is branch deployed ?", (await DeployedBranchCon.methods.getAdmin({}).call({})).admin_ == Wallet);
}
async function DeployProposal(
  wallet: Address,
  DaoBranchAddr: Address,
  deplopyAmount: string,
  Tip3voteRootAddr: Address,
) {
  let DeployedBranchCon = await locklift.factory.getDeployedContract("DAOBranch", DaoBranchAddr);
  ProposalConfigurationStructure.TIP3_VOTE_ROOT_ADDRESS = Tip3voteRootAddr;
  ProposalAction[0].target = new Address("");
  ProposalAction[1].target = new Address("");
  /// @DEV notice : the following two lines must be replace with the target functions
  ProposalAction[0].payload = await DeployedBranchCon.methods.getAdmin({}).encodeInternal();
  ProposalAction[1].payload = await DeployedBranchCon.methods.getAdmin({}).encodeInternal();
  const { traceTree: data } = await locklift.tracing.trace(
    DeployedBranchCon.methods
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
    contract: DeployedBranchCon,
    name: "ProposalDeployed" as const, // 'as const' is important thing for type saving
  });
  console.log("this is the proposal id : ", ProposalEvents![0].proposalId);
  // checking if the poroposal is deployed
  let DeployedProposalCon = await locklift.factory.getDeployedContract(
    "Proposal",
    (
      await DeployedBranchCon.methods.expectedProposalAddress({ _proposalId: ProposalEvents![0].proposalId }).call({})
    ).expectedProposalAddress_,
  );
  console.log(
    "is proposal deployed ? ",
    (await DeployedProposalCon.methods.PROPOSAL_ID({}).call({})).PROPOSAL_ID == ProposalEvents![0].proposalId,
  );
}
async function GetDaoBranchesList(DaoRootAddress: Address) {
  let deployedDaoRootCon = await locklift.factory.getDeployedContract("DAORoot", DaoRootAddress);
  let branchdeployEvents = (
    await deployedDaoRootCon.getPastEvents({
      filter: event => event.event === "newBranchDepoyed",
    })
  ).events;
  let branchesAddrs = [];
  for (let i = 0; i < branchdeployEvents.length; i++) {
    branchesAddrs.push(branchdeployEvents[0]?.data?._branchAddress_);
  }
  return branchesAddrs;
}
async function GetBranchProposalList(DaoBranchAddress: Address) {
  let deployedDaoBranchCon = await locklift.factory.getDeployedContract("DAOBranch", DaoBranchAddress);
  let proposaldeployEvents = (
    await deployedDaoBranchCon.getPastEvents({
      filter: event => event.event === "ProposalDeployed",
    })
  ).events;
  let branchProposalsAddrs = [];
  for (let i = 0; i < proposaldeployEvents.length; i++) {
    branchProposalsAddrs.push(proposaldeployEvents[0]?.data?._proposal);
  }
  return branchProposalsAddrs;
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
    (await ProposalCon.methods.getPorosposalOverview({}).call({})).initConf_.againstVotes == voteWeight,
  );
}
