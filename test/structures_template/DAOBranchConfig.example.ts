import { Address } from "locklift";
var DaoBranchConfig = {
  Name: "",
  Logo: "",
  TIP3_VOTE_ROOT_ADDRESS: new Address("0x1234567890123456789012345678901234567890"),
  TIP3_VOTE_PROPPOSING_QUORUM: 10,
  MIN_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(10),
  MAX_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(1000),
  MAX_PROPOSAL_QUORUM: 50,
  MIN_PROPOSAL_QUORUM: 20,
  MIN_VOTING_PERIOD: 0,
  MAX_VOTING_PERIOD: 1200000,
  MIN_VOTING_DELAY: 0,
  MAX_VOTING_DELAY: 30,
  MIN_TIME_LOCK: 0,
  MAX_TIME_LOCK: 86400,
  MIN_GRACE_PERIOD: 0,
  MAX_GRACE_PERIOD: 1800,
  proposalMaxDescriptionLen: 255,
  proposalMaxOperations: 10,
};
export { DaoBranchConfig };
