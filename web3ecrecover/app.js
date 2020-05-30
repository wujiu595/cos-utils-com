const ethUtil = require('ethereumjs-util')
const ethSignUtil = require('eth-sig-util')
const express = require('express')
const app = express()
const port = 80
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(bodyParser.json({ type: 'application/*+json' }))

app.post('/ecrecover',jsonParser,
 (req, res) => {
   const msg = `${req.body.nonce}`;
   const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
   const address = ethSignUtil.recoverPersonalSignature({
     data: msgBufferHex,
     sig: req.body.signature,
   });
   res.send({"publicKey": address.toLowerCase()});
 }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))