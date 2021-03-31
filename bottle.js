const Web3 = require('web3')
const fs = require('fs')
const util = require('util')
const fleekStorage = require('@fleekhq/fleek-storage-js')
const axios = require('axios').default
const Marketplace = require('./src/abis/Marketplace.json')
const TelegramBot = require('node-telegram-bot-api')


async function main() {
  const bot_token = process.env.BOT_TOKEN
  const tel_bot = new TelegramBot(bot_token, { polling: true })

  let rpc = 'https://rpc-mumbai.matic.today'
  const provider = new Web3.providers.HttpProvider(rpc)
  const web3 = new Web3(provider)
  const networkId = await web3.eth.net.getId()
  const networkData = Marketplace.networks[networkId]
  await web3.eth.accounts.wallet.add(process.env.PVT_KEY)

  const accounts = await web3.eth.getAccounts()
  console.log('ACOUNTS: ', accounts)

  let marketplace
  if (networkData) {
    marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
    const productCount = await marketplace.methods.productCount().call()
    console.log('got market!!', productCount, process.env.PBC_KEY)

    tel_bot.onText(/\/sell (.+) (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      marketplace.methods
        .productCount()
        .call()
        .then(function (result) {
          console.log('r-->' + result)
          const productCount = result
          console.log('got market!!', productCount, process.env.PBC_KEY)

          const chatId = msg.chat.id
          //const resp = match[1]; // the captured "whatever"

          ////fs.readFile('Marketplace.json', async (error, fileData) => {
          let pc = Number(productCount) + 1 // need to fix this
          const product_details = {
            name: match[1],
            price: match[2],
            owner: process.env.PBC_KEY,
            productCount: pc.toString(),
          }

          fleekStorage
            .upload({
              apiKey: process.env.FLEEK_API_KEY,
              apiSecret: process.env.FLEEK_API_SECRET,
              key: match[1] + '.json',
              data: JSON.stringify(product_details),
            })
            .then((uploadedFile) => {
              console.log(uploadedFile, product_details.price)
              marketplace.methods
                .createProduct(
                  product_details.name,
                  web3.utils.toWei(product_details.price, 'Ether'),
                  uploadedFile.publicUrl,
                )
                .send({
                  from: process.env.PBC_KEY,
                  gas: 8000000,
                  gasPrice: 8000000000,
                })
                .once('receipt', (receipt) => {
                  console.log('Listing done')
                  tel_bot.sendMessage(
                    chatId,
                    'Product ' +
                      product_details.name +
                      ' has been listed for ' +
                      product_details.price +
                      ' Matic!',
                  )
                })
            })
        })
        .catch(function (err) {
          console.log('err-->' + err)
        })

      // send back the matched "whatever" to the chat
      tel_bot.sendMessage(chatId, 'Listing your product...Give me a sec')
    })

    tel_bot.onText(/\/buy (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message
      let product_details
      const chatId = msg.chat.id

      axios
        .get(match[1])
        .then(function (response) {
          // handle success
          console.log(response.data)
          product_details = response.data

          tel_bot.sendMessage(
            chatId,
            'You opted for item ' +
              product_details.name +
              ' listed at ' +
              product_details.price +
              ' Matic.Purchasing now...',
          )
          //console.log(product_details.price,typeof product_details.price,typeof web3.utils.toWei('.01', 'Ether'),typeof web3.utils.toWei(product_details.price, 'Ether'));
          marketplace.methods
            .purchaseProduct(product_details.productCount)
            .send({
              from: process.env.PBC_KEY,
              value: web3.utils.toWei(product_details.price, 'Ether'),
              gas: 8000000,
              gasPrice: 8000000000,
            })
            .once('receipt', (receipt) => {
              console.log('Purchase done')
              tel_bot.sendMessage(chatId, 'Purchase done')
            })
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    })
  }
}

main().then(() => {
  console.log('Done')
})
