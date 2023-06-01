import { Address } from "locklift";

var ProposalConfigurationStructure = {
  TIP3_VOTE_ROOT_ADDRESS: new Address("0x1234567890123456789012345678901234567890"),
  description: "Simple DAO",
  startTime: Math.floor(Date.now() / 1000) + 3600, // start time in 1 hour
  endTime: Math.floor(Date.now() / 1000) + 86400, // end time in 24 hours
  votingDelay: 60, // 1 minute delay
  votingPeriod: 1800, // 30 minutes period
  quorumVotes: 10, // 10 quorum votes required
  timeLock: 120, // 2 minutes timelock
  threshold: 5, // 5 threshold votes required
  gracePeriod: 600, // 10 minutes grace period
  executionTime: 0,
  forVotes: 0,
  againstVotes: 0,
  canceled: false,
  executed: false,
  Tip3VoteWalletCode: locklift.factory.getContractArtifacts("VoteTokenWallet").code,
};

export { ProposalConfigurationStructure };
