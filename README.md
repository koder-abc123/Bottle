<h1 align="left">bottle</h1>

<p align="center"><b>A telegram bot that works with Matic network and Fleek storage</b></p>

## What it does

Bottle allows you to interact with the Matic network and Fleek Storage acting as a personal wallet manager of sorts.

## How does it work

Bottle has been designed to work on the user's behalf wherein each Telegram user chats with their bottle bot to interact with the network ie each bottle bot would serve only one user(through user authentication).The user is required to setup Bottle with their wallet/fleek storage credentials.Once setup, user can access Web3 sites without needing a browser extension with Bottle handling Web3 transactions on their behalf.

The Telegram user can spawn and interact with Bottle in his/her own home computer/raspberry pi within their private LANs with zero open ports.This ensures better security for the user's wallet credentials compared to a browser extension workflow.

## Current Implementation
In this repo, Bottle has been made to work on a marketplace setup where it handles the buying and selling of products on the user's behalf.A typical workflow is found below:

Seller would say
```
/sell <product_name> <price>
```
On finding the right product, the buyer would click to copy the fleek URL for a product and paste it as a Bottle command

```
/buy <fleek_url>
```

Bottle would figure out(still to be implemented) the contracts to interact with from the fleek url provided to it and then complete the transaction.

## WIP
- User authentication
- Robust message handling 
- Docker container for easy deployment

## How to run

Bottle expects the following env variabes to be setup inorder to run
```
export BOT_TOKEN=<bot token>
export PVT_KEY=<user's private key>
export PBC_KEY=<user's public key>
export FLEEK_API_KEY=<fleek api key>
export FLEEK_API_SECRET=<fleek secret key>
```
Start Bottle 
```
node bottle.js
```
Start the marketplace frontend on port 3000 
```
npm install
npv truffle compile
npx truffle migrate --network matic
npm run start
```
## Demo

 [Demo link](https://www.youtube.com/watch?v=6aw6AURfBQI).

## Live link on Mumbai testnet

[Bottle-Demo](https://koder-abc123.github.io/Bottle/)

## Acknowlegdements

The marketplace template project is based on : https://github.com/dappuniversity/marketplace

## License

MIT
 







