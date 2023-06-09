![OrGear LOGO](https://bafybeigm6nosritlcykhq6yt2xcr4mcocj376hk7apbilp5zct7ktaj674.ipfs.w3s.link/ORGEAR.jpg)

# OrGear

OrGear is a DAO builder platform built on top of the Venom blockchain, using T-Sol. It helps individuals build and manage their own DAOs.

## Overview

OrGear provides several benefits over other networks, including increased scalability, lower transaction fees, and enhanced security. The core contracts of the platform are developed in T-Sol and interacted with and tested using TS and Locklift libraries.
this project also use the TIP3VOTE contract standard which is developed by us, to define the membership of the DAO participators.

## Features

- Scalability: OrGear is built on top of the Venom blockchain, which provides greater scalability than other blockchain networks.
- Lower transaction fees: Transactions on the Venom network have lower fees compared to other networks, making it more cost-effective to use.
- Security: Built using T-Sol programming language, OrGear is designed to be highly secure.

## Getting Started

Before you begin, please ensure that you have the following prerequisites installed:

- Node.js
- Docker
- Git

### Installation

1. Install Everdev globally: `npm install -g everdev-se`
2. Clone the repository: `git clone https://github.com/Javadyakuza/blockroom.git`
3. Navigate to the root directory of the project.
4. Install the dependencies: `npm install`

### Usage

1. To start a local node, run this command: `everdev se start`.
2. To run tests, use this command: `npx locklift test -n local`.
3. To run the scripts on DevNet/TestNet first configure your `.env` file.
4. To deploy DAORoot, run this command: `npx locklift run -s scripts/deploy/DeployDaoRoot.ts -n venom_devnet/venom_testnet`.

## Contributors

Thanks to all the contributors who have helped make OrGear possible!

- meisam taher
  - Role: Developer
  - Contact: meisamtaher@gmail.com
- ahamd jahanbin
  - Role: researcher
  - Contact: ahamdjahanbin@gmail.com

## Roadmap

We have planned the following features for future versions of OrGear:

- deploying the core contract's on mainnet
- designing super user freindly web interface
- implementing more features for core contracts

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
