const fs = require('fs');
const ethers = require('ethers');

const firstPrivateKey = BigInt("0x0000000000000000000000000000000000000000000000000000000000000001");
const lastPrivateKey = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140");
const keysPerPage = 1000n;
const totalPages = (lastPrivateKey - firstPrivateKey) / keysPerPage + 1n;

const generateKeys = () => {
  const keys = [];
  for (let i = 0n; i < totalPages; i++) {
    const privateKey = (firstPrivateKey + i).toString(16).padStart(64, '0');
    const wallet = new ethers.Wallet('0x' + privateKey);
    keys.push({ privateKey, address: wallet.address });
  }
  return keys;
};

const keys = generateKeys();

// Save keys as .blf (JSON format in this case)
const outputFile = 'ethkeys.blf';
fs.writeFileSync(outputFile, JSON.stringify({ keys }, null, 2));

console.log('ethkeys.blf generated!');
