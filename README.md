<h1 align="left">bottle</h1>

<p align="center"><b>A telegram bot that works with Matic network and Fleek storage</b></p>

## What it does

Bottle allows you to interact with the Matic network and Fleek Storage acting as a personal wallet manager of sorts.

## Latest updates

Checkout the live link below.Added supporting docs.

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

Instructions: Inorder to interact with this link one must have the following: 

- An Ethereum Address with non-zero Matic on testnet. Get test Matic from [here](https://faucet.matic.network/)
- A Telegram Bot Token. This [link](https://www.youtube.com/watch?v=aNmRNjME6mE) was helpful 
- A Fleek Api Key / Secret. You can open a free fleek account [here](https://fleek.co/) and use this [link](https://docs.fleek.co/storage/fleek-storage-js/) to generate the keys.
- Once you have the above,export them as env variables based on your OS platform run the following shell commands to start your bot:
```
> git clone https://github.com/koder-abc123/Bottle.git
> cd Bottle
> node bottle.js
```
- This should start your bot(pls dont the mind the stupid debug messages, this is very much in alpha mode)
- Open telegram, search for your bot and type in(note the single space between the name and price)
```
/sell <some compact spaceless product name> <price eg .01,.15>
```
- This should trigger the bottle bot to list your product on the live link.
- if your are interested in buying a product ,you can create a new ethereum address, add test tokens, spawn another bot with the new keys , click on the 'Buy' button which should copy the fleek url to your clipboard and then type in 
```
/buy <fleek_url>
```

- If it goes well, your bottle bot will reply in the affirmative.(Yes I know its a little tedious process, but the the pros far out weigh this one time setup requirement)


## Support
PRs are welcome. @koder_abc123 is my discord handle

## Acknowlegdements

The marketplace template project is based on : https://github.com/dappuniversity/marketplace

## License

MIT
 







