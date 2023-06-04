import { expect } from "chai";
import { Address, Contract, Signer, zeroAddress } from "locklift";
import { FactorySource } from "../build/factorySource";
import { CreateAccountOutput, WalletTypes } from "locklift/types/index";
import { DaoBranchConfig } from "./structures_template/DAOBranchConfig.example";
import { ProposalConfigurationStructure } from "./structures_template/ProposalConfigurationStructure.example";
import { ProposalAction } from "./structures_template/ProposalActionStruct.example";
import { FactoryType } from "locklift/internal/factory";
// dao details
async function GetDaoDetails(DaoAddres: Address) {
  let DeployedDaoCon = await locklift.factory.getDeployedContract("DAOBranch", DaoAddres);
  return (await DeployedDaoCon.methods.getDAOBranchConfig({}).call({})).DAORootConfig_;
}
