const dAOBranchAbi = {"ABIversion":2,"version":"2.3","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"components":[{"name":"MIN_VENOM_THRESHOLD","type":"uint128"},{"name":"MAX_VENOM_THRESHOLD","type":"uint128"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalMaxDescriptionLen","type":"uint16"}],"name":"_initVars","type":"tuple"},{"name":"_admin","type":"address"}],"outputs":[]},{"name":"proposalCount","inputs":[],"outputs":[{"name":"proposalCount","type":"uint32"}]},{"name":"proposalVersion","inputs":[],"outputs":[{"name":"proposalVersion","type":"uint16"}]},{"name":"admin","inputs":[],"outputs":[{"name":"admin","type":"address"}]},{"name":"pendingAdmin","inputs":[],"outputs":[{"name":"pendingAdmin","type":"address"}]},{"name":"proposalCode","inputs":[],"outputs":[{"name":"proposalCode","type":"cell"}]},{"name":"proposalConfiguration","inputs":[],"outputs":[{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"proposalConfiguration","type":"tuple"}]},{"name":"initVars","inputs":[],"outputs":[{"components":[{"name":"MIN_VENOM_THRESHOLD","type":"uint128"},{"name":"MAX_VENOM_THRESHOLD","type":"uint128"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalMaxDescriptionLen","type":"uint16"}],"name":"initVars","type":"tuple"}]}],"data":[{"key":1,"name":"_nonce","type":"uint32"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_nonce","type":"uint32"},{"name":"proposalCount","type":"uint32"},{"name":"proposalVersion","type":"uint16"},{"name":"admin","type":"address"},{"name":"pendingAdmin","type":"address"},{"name":"proposalCode","type":"cell"},{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"proposalConfiguration","type":"tuple"},{"components":[{"name":"MIN_VENOM_THRESHOLD","type":"uint128"},{"name":"MAX_VENOM_THRESHOLD","type":"uint128"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalMaxDescriptionLen","type":"uint16"}],"name":"initVars","type":"tuple"}]} as const
const dAORootAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"components":[{"name":"TIP3_VOTE_ADDRESS","type":"address"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"}],"name":"_DAORootConfiguration","type":"tuple"},{"name":"_admin","type":"address"}],"outputs":[]},{"name":"deployProposal","inputs":[],"outputs":[]},{"name":"onProposalSuccess","inputs":[],"outputs":[]},{"name":"excuteVenomActions","inputs":[],"outputs":[]},{"name":"upgradeDAORootCode","inputs":[],"outputs":[]},{"name":"updateProposalCode","inputs":[],"outputs":[]},{"name":"_estimateActionGas","inputs":[],"outputs":[]},{"name":"changeDAORootprefrences","inputs":[],"outputs":[]},{"name":"chnageAdmin","inputs":[],"outputs":[]},{"name":"getAdmin","inputs":[],"outputs":[]},{"name":"getProposalConfig","inputs":[],"outputs":[]},{"name":"getDAORootConfig","inputs":[],"outputs":[]},{"name":"getTotalProposals","inputs":[],"outputs":[]},{"name":"admin","inputs":[],"outputs":[{"name":"admin","type":"address"}]},{"name":"proposalCount","inputs":[],"outputs":[{"name":"proposalCount","type":"uint32"}]},{"name":"proposalCode","inputs":[],"outputs":[{"name":"proposalCode","type":"cell"}]},{"name":"proposalConfiguration","inputs":[],"outputs":[{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"proposalConfiguration","type":"tuple"}]},{"name":"DAORootConfiguration","inputs":[],"outputs":[{"components":[{"name":"TIP3_VOTE_ADDRESS","type":"address"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"}],"name":"DAORootConfiguration","type":"tuple"}]}],"data":[{"key":1,"name":"_nonce","type":"uint32"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_nonce","type":"uint32"},{"name":"admin","type":"address"},{"name":"proposalCount","type":"uint32"},{"name":"proposalCode","type":"cell"},{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"proposalConfiguration","type":"tuple"},{"components":[{"name":"TIP3_VOTE_ADDRESS","type":"address"},{"name":"MIN_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"}],"name":"DAORootConfiguration","type":"tuple"}]} as const
const sampleAbi = {"ABIversion":2,"version":"2.3","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[],"outputs":[]}],"data":[],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"}]} as const
const tip3VoteAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"getPastVotes","inputs":[{"name":"_voter","type":"address"},{"name":"_blockNumber","type":"uint256"}],"outputs":[{"name":"voteWeight_","type":"uint128"}]},{"name":"walletOf","inputs":[{"name":"_voter","type":"address"}],"outputs":[{"name":"_expectedWalletAddress","type":"address"}]},{"name":"constructor","inputs":[],"outputs":[]}],"data":[],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"}]} as const
const tip3VoteWalletAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"getPastVotes","inputs":[{"name":"answerId","type":"uint32"},{"name":"_blockNumber","type":"uint256"}],"outputs":[{"name":"voteWeight_","type":"uint256"}]},{"name":"walletOf","inputs":[{"name":"_voter","type":"address"}],"outputs":[{"name":"_expectedWalletAddress","type":"address"}]},{"name":"constructor","inputs":[],"outputs":[]}],"data":[],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"}]} as const
const proposalAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[{"components":[{"name":"creation_blockNumber","type":"uint256"},{"name":"proposer","type":"address"},{"name":"description","type":"string"},{"name":"executionTime","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"}],"name":"_initConfig","type":"tuple"},{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"_config","type":"tuple"},{"components":[{"name":"value","type":"uint128"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"_venomActions","type":"tuple[]"}],"outputs":[]},{"name":"castVote","inputs":[{"name":"_voter","type":"address"},{"name":"_support","type":"bool"},{"name":"_reason","type":"string"}],"outputs":[{"name":"isCasted_","type":"bool"}]},{"name":"Queue","inputs":[],"outputs":[]},{"name":"execute","inputs":[],"outputs":[]},{"name":"getPorosposalOverview","inputs":[],"outputs":[{"components":[{"name":"creation_blockNumber","type":"uint256"},{"name":"proposer","type":"address"},{"name":"description","type":"string"},{"name":"executionTime","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"}],"name":"initConf_","type":"tuple"},{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"conf_","type":"tuple"},{"name":"states_","type":"uint8"}]},{"name":"getActions","inputs":[],"outputs":[{"components":[{"name":"value","type":"uint128"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions_","type":"tuple[]"}]},{"name":"getProposalState","inputs":[],"outputs":[{"name":"state_","type":"uint8"}]},{"name":"PROPOSAL_ID","inputs":[],"outputs":[{"name":"PROPOSAL_ID","type":"uint32"}]},{"name":"venomActions","inputs":[],"outputs":[{"components":[{"name":"value","type":"uint128"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions","type":"tuple[]"}]},{"name":"config","inputs":[],"outputs":[{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"config","type":"tuple"}]},{"name":"initConfig","inputs":[],"outputs":[{"components":[{"name":"creation_blockNumber","type":"uint256"},{"name":"proposer","type":"address"},{"name":"description","type":"string"},{"name":"executionTime","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"}],"name":"initConfig","type":"tuple"}]},{"name":"state","inputs":[],"outputs":[{"name":"state","type":"uint8"}]}],"data":[{"key":1,"name":"PROPOSAL_ID","type":"uint32"}],"events":[{"name":"VoteCasted","inputs":[{"name":"voter","type":"address"},{"name":"support","type":"bool"},{"name":"votes","type":"uint256"},{"name":"reason","type":"string"}],"outputs":[]},{"name":"Queueed","inputs":[{"name":"executionTime","type":"uint256"}],"outputs":[]},{"name":"Executed","inputs":[],"outputs":[]},{"name":"Canceled","inputs":[],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"PROPOSAL_ID","type":"uint32"},{"components":[{"name":"value","type":"uint128"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions","type":"tuple[]"},{"components":[{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"}],"name":"config","type":"tuple"},{"components":[{"name":"creation_blockNumber","type":"uint256"},{"name":"proposer","type":"address"},{"name":"description","type":"string"},{"name":"executionTime","type":"uint256"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"}],"name":"initConfig","type":"tuple"},{"name":"state","type":"uint8"}]} as const

export const factorySource = {
    DAOBranch: dAOBranchAbi,
    DAORoot: dAORootAbi,
    Sample: sampleAbi,
    Tip3Vote: tip3VoteAbi,
    Tip3VoteWallet: tip3VoteWalletAbi,
    proposal: proposalAbi
} as const

export type FactorySource = typeof factorySource
export type DAOBranchAbi = typeof dAOBranchAbi
export type DAORootAbi = typeof dAORootAbi
export type SampleAbi = typeof sampleAbi
export type Tip3VoteAbi = typeof tip3VoteAbi
export type Tip3VoteWalletAbi = typeof tip3VoteWalletAbi
export type proposalAbi = typeof proposalAbi
