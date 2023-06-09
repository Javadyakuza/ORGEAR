import { Address } from "locklift";
var DaoConfig = {
  Name: "javadYakuza TestDao",
  Logo: "https://bafybeibbvenwpcfugm4xm2zlyjiec2hoqbr45idwvfwlmktlmki74r2zya.ipfs.w3s.link/daologo.png",
  TIP3_VOTE_ROOT_ADDRESS: new Address("0:56a9e008fd86bc76c18f202399b4a3ab933414ce855ad84acb9164d5ced775bf"),
  TIP3_VOTE_PROPPOSING_QUORUM: 10,
  MIN_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(10),
  MAX_TIP3_VOTE_THRESHOLD: locklift.utils.toNano(1000),
  MAX_PROPOSAL_QUORUM: 1000,
  MIN_PROPOSAL_QUORUM: 20,
  MIN_VOTING_PERIOD: 0,
  MAX_VOTING_PERIOD: 2592000,
  MIN_VOTING_DELAY: 0,
  MAX_VOTING_DELAY: 2592000,
  MIN_TIME_LOCK: 0,
  MAX_TIME_LOCK: 2592000,
  MIN_GRACE_PERIOD: 0,
  MAX_GRACE_PERIOD: 2592000,
  proposalMaxDescriptionLen: 255,
  proposalMaxOperations: 10,
};
export { DaoConfig };
