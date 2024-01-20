const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const privateKey = "";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const ACCOUNT = "";
const memo = 'data:,{"p":"trc-20","op":"mint","tick":"rats","amt":"10000"}';

async function main() {

    console.log(tronWeb.defaultAddress.base58, "=>", ACCOUNT);

    const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(ACCOUNT, 1);
    const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(unSignedTxn, memo, 'utf8');
    const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
    console.log("signed =>", signedTxn);
    const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
    console.log("broadcast =>", ret);
}

main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
});