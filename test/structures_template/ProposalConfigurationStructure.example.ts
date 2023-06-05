import { Address } from "locklift";

var ProposalConfigurationStructure = {
  TIP3_VOTE_ROOT_ADDRESS: new Address("0x1234567890123456789012345678901234567890"),
  description: "venom DAO test Proposal",
  startTime: 0, // start time in 1 hour
  endTime: 20, // end time in 24 hours
  votingDelay: 20, // 1 minute delay
  votingPeriod: 80, // 30 minutes period
  quorumVotes: 30, // 10 quorum votes required
  timeLock: 0, // 2 minutes timelock
  threshold: locklift.utils.toNano(10), // 5 threshold votes required
  gracePeriod: 50, // 10 minutes grace period
  executionTime: 0,
  forVotes: 0,
  againstVotes: 0,
  canceled: false,
  executed: false,
  Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
};

export { ProposalConfigurationStructure };
