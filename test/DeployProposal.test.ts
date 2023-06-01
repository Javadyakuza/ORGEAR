// it("should deploy ActionTestPersonalData", async function () {
//     // deploying it
//     const { contract: ActionTestPersonalData } = await locklift.factory.deployContract({
//       contract: "ActionTestPersonalData",
//       publicKey: signer.publicKey,
//       initParams: {},
//       constructorParams: {
//         _age: 43,
//         _name: "javad",
//       },
//       value: locklift.utils.toNano("2"),
//     });
//     console.log("ActionTestPersonalData : ", ActionTestPersonalData.address);
//     // setting the state varibale
//     ActionTestPersonalDataAddr = ActionTestPersonalData.address;
//     // testing the date
//     expect((await ActionTestPersonalData.methods.age({}).call({})).age.toString()).to.eq("43");
//   });
