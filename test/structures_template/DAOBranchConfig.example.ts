import { Address } from "locklift";
var DaoBranchConfig = {
  TIP3_VOTE_ROOT_ADDRESS: new Address(""),
  TIP3_VOTE_PROPPOSING_QUORUM: 10,
  MIN_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(100),
  MAX_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(1000),
  MAX_PROPOSAL_QUORUM: 50,
  MIN_PROPOSAL_QUORUM: 20,
  MIN_VOTING_PERIOD: 60,
  MAX_VOTING_PERIOD: 120,
  MIN_VOTING_DELAY: 5,
  MAX_VOTING_DELAY: 30,
  MIN_TIME_LOCK: 3600,
  MAX_TIME_LOCK: 86400,
  MIN_GRACE_PERIOD: 300,
  MAX_GRACE_PERIOD: 1800,
  proposalMaxDescriptionLen: 255,
  proposalMaxOperations: 10,
  proposalCode: locklift.factory.getContractArtifacts("Proposal").code,
  Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
};
export { DaoBranchConfig };
