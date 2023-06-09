# OrGear

OrGear is a DAO builder paltform on top of the tvm based venom blockchain that helps inviduals to build and manage their own DAO's for.

## Overview

OrGear is DAO builder platform written in t-sol on top of the venom blockchain that has many more benefits and opputunities rather than other networks such as more scalablity, cheaper fees, more security etc.
this repo conntains the core contract's of the platfrom which are developed in t-sol and interacted and tested using ts and locklift library.

## Getting Started

Before you begin, please ensure that you have the following prerequisites installed:

- Node.js
- docker
- Git

### Installation

1. install everdev globally : `https://github.com/tonlabs/evernode-se`
2. Clone the repository: `git clone https://github.com/Javadyakuza/blockroom.git`
3. Navigate to the root directory of the project
4. Install the dependencies: `npm install --save`

### Usage

1. to start a local run this in command line : `everdev se start`
2. Run tests: `npx locklift test -n local`
3. to run the scripts on devnet/testnet first configure your `.env` file
4. deploy DAORoot: `npx locklift run -s scripts/deploy/DeployDaoRoot.ts -n venom_devnet/venom_testnet`

## Contributors

ME

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
