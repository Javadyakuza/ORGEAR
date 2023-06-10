import { Address } from "locklift";

var ProposalConfigurationStructure = {
  // TIP3_VOTE_ROOT_ADDRESS: new Address("0x1234567890123456789012345678901234567890"),
  title: "yakuza test proposal",
  description: "this is the test javad yakuza test dao test proposal ",
  votingDelay: 0, // 1 minute delay
  votingPeriod: 120, // 30 minutes period
  quorumVotes: 30, // 10 quorum votes required
  timeLock: 0, // 2 minutes timelock
  threshold: locklift.utils.toNano(10), // 5 threshold votes required
  gracePeriod: 2592000, // 10 minutes grace period
  sponser: true,
};

export { ProposalConfigurationStructure };
