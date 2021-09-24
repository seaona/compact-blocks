const shajs = require("sha.js");
const siphash = require("siphash");

const sampleBlock = {
    "hash": "00000000b873e79784647a6c82962c70d228557d24a747ea4d1b8bbe878e1206",
    "confirmations": 2096025,
    "height": 1,
    "version": 1,
    "versionHex": "00000001",
    "merkleroot": "f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba",
    "time": 1296688928,
    "mediantime": 1296688928,
    "nonce": 1924588547,
    "bits": "1d00ffff",
    "difficulty": 1,
    "chainwork": "0000000000000000000000000000000000000000000000000000000200020002",
    "nTx": 1,
    "previousblockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
    "nextblockhash": "000000006c02c8ea6e4ff69651f7fcde348fb9d557a06e6957b65552002a7820",
    "strippedsize": 190,
    "size": 190,
    "weight": 760,
    "tx": [
        "f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba"
    ]
}

const sampleBlockHeader = {
    "hash": "00000000b873e79784647a6c82962c70d228557d24a747ea4d1b8bbe878e1206",
    "confirmations": 2096025,
    "height": 1,
    "version": 1,
    "versionHex": "00000001",
    "merkleroot": "f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba",
    "time": 1296688928,
    "mediantime": 1296688928,
    "nonce": 1924588547,
    "bits": "1d00ffff",
    "difficulty": 1,
    "chainwork": "0000000000000000000000000000000000000000000000000000000200020002",
    "nTx": 1,
    "previousblockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
    "nextblockhash": "000000006c02c8ea6e4ff69651f7fcde348fb9d557a06e6957b65552002a7820"
}

const nonce = sampleBlock.nonce;

// Single-SHA256 hashing the block header with the nonce appended (in little-endian)
// https://github.com/bitcoin/bitcoin/pull/8068/files
console.log(shajs('sha256').update(JSON.stringify(sampleBlockHeader)).digest('hex'))

// Running SipHash-2-4 with the input being the transaction ID and the keys (k0/k1) set to the first two little-endian 64-bit integers from the above hash, respectively.
const txId = "f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba";
const k0 = ""
const k1 = ""

// func Hash(k0, k1 uint64, p []byte) uint64
//Hash returns the 64-bit SipHash-2-4 of the given byte slice with two 64-bit parts of 128-bit key: k0 and k1.

// Dropping the 2 most significant bytes from the SipHash output to make it 6 bytes.