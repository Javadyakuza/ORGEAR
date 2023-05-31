pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./VoteTokenWalletBase.tsol";
import "tip3/contracts/interfaces/ITokenRoot.sol";
import "tip3/contracts/interfaces/IDestroyable.sol";
import "tip3/contracts/libraries/TokenErrors.sol";
import "tip3/contracts/libraries/TokenMsgFlag.sol";


abstract contract TokenWalletDestroyableBase is VoteTokenWalletBase, IDestroyable {

    function destroy(address remainingGasTo) override external onlyOwner {
        require(balance_ == 0, TokenErrors.NON_EMPTY_BALANCE);
        remainingGasTo.transfer({
            value: 0,
            flag: TokenMsgFlag.ALL_NOT_RESERVED + TokenMsgFlag.DESTROY_IF_ZERO,
            bounce: false
        });
    }
}
