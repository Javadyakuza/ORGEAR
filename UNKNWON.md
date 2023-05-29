2 - writing a function that estimated the gas required for an operation [?]
{
when we call a function and then we want the called function to call another function as the return statement:
1 - the function must be marked with the responsible modifier to be able to call a callbakc function
2 - in the passing args we must specify the function tatth we want to be called by the function
remoteCont.someFun{
// -
callback : someCallbackFun;
}(/_ ocnstuctor params _/)
}

4 - how to excute the planned functions [?]
{
// this is how we send the transaction to a remote contract from excuter conrtact  
// the payload that is gonna be attaxhed to the body of the transsfer function must be produced like this
TvmCell ActionBody = tvm.encodeBody(Remote.func, 123, -654);
addr.transfer({
value: action.value,
flag: MsgFlag.SENDER_PAYS_FEES,
bounce: false,
body: ActionBody
});

}
6 - note : i think that the tvm.decodeFunctionParams is used to decode the values in a tvm cell
7 - notice the complete guide on the fald attr in the address.transfer function : https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#addresstransfer

8 - what the fukc shoud we do about this modifier
{
// modifier onlyProposeer() {
// // the tip3Vote holders wallet contract will be chacked
// require(msg.sender == expectedTip3VoteHolder())
// }
}
9 - we are nnot havonog the immutable vars ?!@#$%^&\*(IO)
10 = how is the updating of the poropsal works ?
// theexpected address is defined by the init data and the constructor params

> > when we dont have the constuctor params and the id is not static
> > 11 if we deploy a contract two times ina address , the second one will seat on the bench or the old one stays at the place ?
> > 11 - does it have any problem to wrap all the return function into a one function ? because the reading is also is wrote into the blokchain , what the fuck ?

why the fuck er are not havong the calldata supportance in this bullshit
if we call to auninitialed contract will we face a error or we get the default error
how to handle the tuples

send transaction in the tip2 vote token wallet must have a condition to say if we are going to pay for the transactoin or no , in case of casting the vote the transaction must be payed by the voter
NOTE : the responsible functions must returns the statement like this {
Hint: use `{value: 0, bounce: false, flag: 64}`.
}

the excution gas fee must be paid by the dao treasury or the proposal contract ? default is
dont know why we need proposal id
what is inline modifie
is the gas fees always the same ? ---+++
how do we calcualte the gas fees ? >> estimates from provider
can any one deploy more than two proposal at the same time ? in order to calculate and and returns the expected proposal address ? calculates the proopsal address by the poroposal id
tvm. accept () is onlu for the externla messages
should we pass the init data off or on chain ? >> we deploy the contract fromm anothere contraact

if the contract doesnt accept for paying the gas fees the sender will ?
doesthis mean the msg.sender ? : require(pendingAdmin.value != 0 && msg.sender == pendingAdmin, DaoErrors.NOT_PENDING_ADMIN);

what is the differenece between initData and the stateInit ?
