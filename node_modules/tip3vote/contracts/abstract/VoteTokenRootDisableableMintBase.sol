pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./VoteTokenRootBase.tsol";
import "tip3/contracts/interfaces/IDisableableMintTokenRoot.sol";
import "tip3/contracts/libraries/TokenErrors.sol";
import "tip3/contracts/libraries/TokenMsgFlag.sol";


abstract contract VoteTokenRootDisableableMintBase is VoteTokenRootBase, IDisableableMintTokenRoot {

    bool mintDisabled_;

    function disableMint() override external responsible onlyRootOwner returns (bool) {
        mintDisabled_ = true;
        return { value: 0, flag: TokenMsgFlag.REMAINING_GAS, bounce: false } mintDisabled_;
    }

    function mintDisabled() override external view responsible returns (bool) {
        return { value: 0, flag: TokenMsgFlag.REMAINING_GAS, bounce: false } mintDisabled_;
    }

    function _mintEnabled() override internal view returns (bool) {
        return !mintDisabled_;
    }

}
