const actionTestPersonalDataAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[{"name":"_age","type":"uint256"},{"name":"_name","type":"string"}],"outputs":[]},{"name":"setAge","inputs":[{"name":"_age","type":"uint256"}],"outputs":[]},{"name":"setName","inputs":[{"name":"_name","type":"string"}],"outputs":[]},{"name":"age","inputs":[],"outputs":[{"name":"age","type":"uint256"}]},{"name":"name","inputs":[],"outputs":[{"name":"name","type":"string"}]}],"data":[],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"age","type":"uint256"},{"name":"name","type":"string"}]} as const
const dAOBranchAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"_BranchConfig","type":"tuple"}],"outputs":[]},{"name":"propose","inputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"description","type":"string"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"},{"name":"executionTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"_ProposalInitConfiguration","type":"tuple"},{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"_venomActions","type":"tuple[]"}],"outputs":[]},{"name":"deployProposal","inputs":[{"name":"_balance","type":"uint256"},{"name":"_payload","type":"cell"}],"outputs":[]},{"name":"onProposalSucceeded","inputs":[{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"_venomActions","type":"tuple[]"},{"name":"_proposalId","type":"uint256"}],"outputs":[]},{"name":"expectedProposalAddress","inputs":[{"name":"_proposalId","type":"uint256"}],"outputs":[{"name":"expectedProposalAddress_","type":"address"}]},{"name":"expectedTip3VoteWalletAddress","inputs":[{"name":"_walletOwner","type":"address"}],"outputs":[{"name":"expectedTip3WalletAddress_","type":"address"}]},{"name":"getAdmin","inputs":[],"outputs":[{"name":"admin_","type":"address"}]},{"name":"getDAOBranchConfig","inputs":[],"outputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"DAOBranchConfig_","type":"tuple"}]},{"name":"getTotalProposals","inputs":[],"outputs":[{"name":"totalProposal_","type":"uint256"}]},{"name":"_venomActionTotalValue","inputs":[{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"_venomActions","type":"tuple[]"}],"outputs":[{"name":"totalValue_","type":"uint256"}]},{"name":"changeAdmin","inputs":[{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"acceptBeingAdmin","inputs":[],"outputs":[]},{"name":"changeDAOBranchprefrences","inputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"_BranchConfig","type":"tuple"}],"outputs":[]},{"name":"pendingAdmin","inputs":[],"outputs":[{"name":"pendingAdmin","type":"address"}]},{"name":"totalProposals","inputs":[],"outputs":[{"name":"totalProposals","type":"uint256"}]},{"name":"BranchConfig","inputs":[],"outputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"BranchConfig","type":"tuple"}]}],"data":[{"key":1,"name":"_nonce","type":"uint32"},{"key":2,"name":"admin","type":"address"},{"key":3,"name":"DaoRoot","type":"address"}],"events":[{"name":"ProposalDeployed","inputs":[{"name":"_proposer","type":"address"},{"name":"_proposal","type":"address"},{"name":"proposalId","type":"uint256"},{"name":"description","type":"string"}],"outputs":[]},{"name":"ProposaDeployFailed","inputs":[{"name":"_proposer","type":"address"},{"name":"_futuredProposalId","type":"uint256"},{"name":"Payload","type":"cell"}],"outputs":[]},{"name":"AdminTransferRequest","inputs":[{"name":"_oldAdmin","type":"address"},{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"AdminTransfered","inputs":[{"name":"_oldAdmin","type":"address"},{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"DAOBranchPrefrencesChanged","inputs":[],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_nonce","type":"uint32"},{"name":"admin","type":"address"},{"name":"DaoRoot","type":"address"},{"name":"pendingAdmin","type":"address"},{"name":"totalProposals","type":"uint256"},{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"BranchConfig","type":"tuple"}]} as const
const dAORootAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_DaoBranchCode","type":"cell"}],"outputs":[]},{"name":"DeployDaoBranch","inputs":[{"name":"_branchNonce","type":"uint32"},{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"TIP3_VOTE_PROPPOSING_QUORUM","type":"uint256"},{"name":"MIN_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_TIP3_VOTE_THRESHOLD","type":"uint128"},{"name":"MAX_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_PROPOSAL_QUORUM","type":"uint128"},{"name":"MIN_VOTING_PERIOD","type":"uint32"},{"name":"MAX_VOTING_PERIOD","type":"uint32"},{"name":"MIN_VOTING_DELAY","type":"uint32"},{"name":"MAX_VOTING_DELAY","type":"uint32"},{"name":"MIN_TIME_LOCK","type":"uint32"},{"name":"MAX_TIME_LOCK","type":"uint32"},{"name":"MIN_GRACE_PERIOD","type":"uint32"},{"name":"MAX_GRACE_PERIOD","type":"uint32"},{"name":"proposalMaxDescriptionLen","type":"uint16"},{"name":"proposalMaxOperations","type":"uint8"},{"name":"proposalCode","type":"cell"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"_DaoBranchConfig","type":"tuple"}],"outputs":[]},{"name":"updateDaoBranchCode","inputs":[{"name":"_DaoBranchCode","type":"cell"}],"outputs":[]},{"name":"transferAdmin","inputs":[{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"acceptBeingAdmin","inputs":[],"outputs":[]},{"name":"getAdmin","inputs":[],"outputs":[{"name":"admin_","type":"address"}]},{"name":"expectedDaoBranchAddress","inputs":[{"name":"_nonce_","type":"uint32"},{"name":"_admin_","type":"address"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"DaoBranchCode","inputs":[],"outputs":[{"name":"DaoBranchCode","type":"cell"}]},{"name":"TotalDaoBranches","inputs":[],"outputs":[{"name":"TotalDaoBranches","type":"uint256"}]},{"name":"pendingAdmin","inputs":[],"outputs":[{"name":"pendingAdmin","type":"address"}]}],"data":[{"key":1,"name":"admin","type":"address"},{"key":2,"name":"_nonce","type":"uint32"}],"events":[{"name":"newBranchDepoyed","inputs":[{"name":"_branchAddress","type":"address"},{"name":"_admin","type":"address"}],"outputs":[]},{"name":"DAORootAdminTransferreq","inputs":[{"name":"_oldAdmin","type":"address"},{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"DAORootAdminTransfered","inputs":[{"name":"_oldAdmin","type":"address"},{"name":"_newAdmin","type":"address"}],"outputs":[]},{"name":"DAOBranchCodeUpdated","inputs":[],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"admin","type":"address"},{"name":"_nonce","type":"uint32"},{"name":"DaoBranchCode","type":"cell"},{"name":"TotalDaoBranches","type":"uint256"},{"name":"pendingAdmin","type":"address"}]} as const
const proposalAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"description","type":"string"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"},{"name":"executionTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"_initConfig","type":"tuple"},{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"_venomActions","type":"tuple[]"},{"name":"_proposer","type":"address"}],"outputs":[]},{"name":"vote","inputs":[{"name":"_support","type":"bool"},{"name":"_reason","type":"string"},{"name":"nowTime","type":"uint128"}],"outputs":[]},{"name":"castVote","inputs":[{"name":"_balance","type":"uint256"},{"name":"_votePayload","type":"cell"}],"outputs":[]},{"name":"Queue","inputs":[{"name":"nowTime","type":"uint128"}],"outputs":[]},{"name":"execute","inputs":[{"name":"nowTime","type":"uint128"}],"outputs":[]},{"name":"cancell","inputs":[],"outputs":[]},{"name":"onActionsExecuted","inputs":[],"outputs":[]},{"name":"getPorosposalOverview","inputs":[{"name":"nowTime","type":"uint128"}],"outputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"description","type":"string"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"},{"name":"executionTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"initConf_","type":"tuple"},{"name":"states_","type":"uint8"}]},{"name":"getActions","inputs":[],"outputs":[{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions_","type":"tuple[]"}]},{"name":"getProposalState","inputs":[{"name":"nowTime","type":"uint128"}],"outputs":[{"name":"state_","type":"uint8"}]},{"name":"PROPOSAL_ID","inputs":[],"outputs":[{"name":"PROPOSAL_ID","type":"uint256"}]},{"name":"DaoBranchAddress","inputs":[],"outputs":[{"name":"DaoBranchAddress","type":"address"}]},{"name":"venomActions","inputs":[],"outputs":[{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions","type":"tuple[]"}]},{"name":"initConfig","inputs":[],"outputs":[{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"description","type":"string"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"},{"name":"executionTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"initConfig","type":"tuple"}]},{"name":"state","inputs":[],"outputs":[{"name":"state","type":"uint8"}]},{"name":"creationBlockTS","inputs":[],"outputs":[{"name":"creationBlockTS","type":"uint256"}]},{"name":"proposer","inputs":[],"outputs":[{"name":"proposer","type":"address"}]}],"data":[{"key":1,"name":"PROPOSAL_ID","type":"uint256"},{"key":2,"name":"DaoBranchAddress","type":"address"}],"events":[{"name":"VoteCasted","inputs":[{"name":"voter","type":"address"},{"name":"support","type":"bool"},{"name":"votes","type":"uint256"},{"name":"reason","type":"string"}],"outputs":[]},{"name":"Queueed","inputs":[{"name":"executionTime","type":"uint256"}],"outputs":[]},{"name":"Executed","inputs":[],"outputs":[]},{"name":"Canceled","inputs":[],"outputs":[]},{"name":"ProposerFundedBack","inputs":[{"name":"_proposer","type":"address"},{"name":"_amount","type":"uint256"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"PROPOSAL_ID","type":"uint256"},{"name":"DaoBranchAddress","type":"address"},{"components":[{"name":"value","type":"uint256"},{"name":"target","type":"address"},{"name":"payload","type":"cell"}],"name":"venomActions","type":"tuple[]"},{"components":[{"name":"TIP3_VOTE_ROOT_ADDRESS","type":"address"},{"name":"description","type":"string"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"votingDelay","type":"uint32"},{"name":"votingPeriod","type":"uint32"},{"name":"quorumVotes","type":"uint128"},{"name":"timeLock","type":"uint32"},{"name":"threshold","type":"uint128"},{"name":"gracePeriod","type":"uint32"},{"name":"executionTime","type":"uint256"},{"name":"forVotes","type":"uint256"},{"name":"againstVotes","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"executed","type":"bool"},{"name":"Tip3VoteWalletCode","type":"cell"}],"name":"initConfig","type":"tuple"},{"name":"state","type":"uint8"},{"name":"creationBlockTS","type":"uint256"},{"name":"proposer","type":"address"}]} as const
const voteTokenRootAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"initialSupplyTo","type":"address"},{"name":"initialSupply","type":"uint128"},{"name":"deployWalletValue","type":"uint128"},{"name":"mintDisabled","type":"bool"},{"name":"burnByRootDisabled","type":"bool"},{"name":"burnPaused","type":"bool"},{"name":"remainingGasTo","type":"address"}],"outputs":[]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"disableMint","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"mintDisabled","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"burnTokens","inputs":[{"name":"amount","type":"uint128"},{"name":"walletOwner","type":"address"},{"name":"remainingGasTo","type":"address"},{"name":"callbackTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"disableBurnByRoot","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"burnByRootDisabled","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"burnPaused","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"setBurnPaused","inputs":[{"name":"answerId","type":"uint32"},{"name":"paused","type":"bool"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"},{"name":"remainingGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"getTotalSupply","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"uint256"}]},{"name":"getPastTotalSupply","inputs":[{"name":"answerId","type":"uint32"},{"name":"blockTimestamp","type":"uint256"}],"outputs":[{"name":"value0","type":"uint256"}]},{"name":"name","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"string"}]},{"name":"symbol","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"string"}]},{"name":"decimals","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"uint8"}]},{"name":"totalSupply","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"uint128"}]},{"name":"walletCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"rootOwner","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"walletOf","inputs":[{"name":"answerId","type":"uint32"},{"name":"walletOwner","type":"address"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"deployWallet","inputs":[{"name":"answerId","type":"uint32"},{"name":"walletOwner","type":"address"},{"name":"deployWalletValue","type":"uint128"}],"outputs":[{"name":"tokenWallet","type":"address"}]},{"name":"mint","inputs":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"address"},{"name":"deployWalletValue","type":"uint128"},{"name":"remainingGasTo","type":"address"},{"name":"notify","type":"bool"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"acceptBurn","id":"0x192B51B1","inputs":[{"name":"amount","type":"uint128"},{"name":"walletOwner","type":"address"},{"name":"remainingGasTo","type":"address"},{"name":"callbackTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"sendSurplusGas","inputs":[{"name":"to","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"name_","type":"string"},{"key":2,"name":"symbol_","type":"string"},{"key":3,"name":"decimals_","type":"uint8"},{"key":4,"name":"rootOwner_","type":"address"},{"key":5,"name":"walletCode_","type":"cell"},{"key":6,"name":"randomNonce_","type":"uint256"},{"key":7,"name":"deployer_","type":"address"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"name_","type":"string"},{"name":"symbol_","type":"string"},{"name":"decimals_","type":"uint8"},{"name":"rootOwner_","type":"address"},{"name":"walletCode_","type":"cell"},{"name":"totalSupply_","type":"uint128"},{"components":[{"name":"fromBlock","type":"uint256"},{"name":"votes","type":"uint256"}],"name":"_checkpoints","type":"tuple[]"},{"name":"burnPaused_","type":"bool"},{"name":"burnByRootDisabled_","type":"bool"},{"name":"mintDisabled_","type":"bool"},{"name":"randomNonce_","type":"uint256"},{"name":"deployer_","type":"address"}]} as const
const voteTokenWalletAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[],"outputs":[]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]},{"name":"destroy","inputs":[{"name":"remainingGasTo","type":"address"}],"outputs":[]},{"name":"burnByRoot","inputs":[{"name":"amount","type":"uint128"},{"name":"remainingGasTo","type":"address"},{"name":"callbackTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"burn","inputs":[{"name":"amount","type":"uint128"},{"name":"remainingGasTo","type":"address"},{"name":"callbackTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"getVotes","inputs":[{"name":"answerId","type":"uint32"},{"name":"_payload","type":"cell"}],"outputs":[{"name":"value0","type":"uint256"},{"name":"value1","type":"cell"}]},{"name":"getPastVotes","inputs":[{"name":"answerId","type":"uint32"},{"name":"blockTimestamp","type":"uint256"},{"name":"_payload","type":"cell"}],"outputs":[{"name":"value0","type":"uint256"},{"name":"value1","type":"cell"}]},{"name":"balance","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"uint128"}]},{"name":"owner","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"root","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"walletCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"transfer","inputs":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"address"},{"name":"deployWalletValue","type":"uint128"},{"name":"remainingGasTo","type":"address"},{"name":"notify","type":"bool"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"transferToWallet","inputs":[{"name":"amount","type":"uint128"},{"name":"recipientTokenWallet","type":"address"},{"name":"remainingGasTo","type":"address"},{"name":"notify","type":"bool"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"acceptTransfer","id":"0x67A0B95F","inputs":[{"name":"amount","type":"uint128"},{"name":"sender","type":"address"},{"name":"remainingGasTo","type":"address"},{"name":"notify","type":"bool"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"acceptMint","id":"0x4384F298","inputs":[{"name":"amount","type":"uint128"},{"name":"remainingGasTo","type":"address"},{"name":"notify","type":"bool"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"sendSurplusGas","inputs":[{"name":"to","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"root_","type":"address"},{"key":2,"name":"owner_","type":"address"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"root_","type":"address"},{"name":"owner_","type":"address"},{"name":"balance_","type":"uint128"},{"components":[{"name":"fromBlock","type":"uint256"},{"name":"votes","type":"uint256"}],"name":"_checkpoints","type":"tuple[]"}]} as const

export const factorySource = {
    ActionTestPersonalData: actionTestPersonalDataAbi,
    DAOBranch: dAOBranchAbi,
    DAORoot: dAORootAbi,
    Proposal: proposalAbi,
    VoteTokenRoot: voteTokenRootAbi,
    VoteTokenWallet: voteTokenWalletAbi
} as const

export type FactorySource = typeof factorySource
export type ActionTestPersonalDataAbi = typeof actionTestPersonalDataAbi
export type DAOBranchAbi = typeof dAOBranchAbi
export type DAORootAbi = typeof dAORootAbi
export type ProposalAbi = typeof proposalAbi
export type VoteTokenRootAbi = typeof voteTokenRootAbi
export type VoteTokenWalletAbi = typeof voteTokenWalletAbi
