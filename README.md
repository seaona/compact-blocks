# BIP152 - Compact Block Relay: Implementation of shortIDs

## Context - Compact Blocks
Compact blocks are a way to save bandwidth for nodes on the P2P network. This proposal was defined on the BIP152, where several new data structures were added to the P2P network to relay compact blocks:
* PrefilledTransaction
* **HeaderAndShortIDs**
* BlockTransactionsRequest
* BlockTransactions

In this demonstration we are going to focus on a practical implementation for **HeaderAndShortIDs**.

As per [Bitcoin-Wiki](https://en.bitcoin.it/wiki/Protocol_documentation#Short_transaction_ID) 

> a HeaderAndShortIDs structure is used to relay a block header, the short transactions IDs used for matching already-available transactions, and a select few transactions which we expect a peer may be missing.

Short transaction IDs are used to represent a transaction without sending a full 256-bit hash.
![](https://i.imgur.com/r6T6WMv.png)

On the `src/blockencodings.cpp` we can find the implementation on Bitcoin Core. Specifically these lines of code are of the interest of this article:

![](https://i.imgur.com/d7TGqUr.png)


## Short Transaction IDs Specification
As per BIP152 definition, short transaction IDs can be calculated as follows:

* Single-SHA256 hashing the block header with the nonce appended (in little-endian)
* Running SipHash-2-4 with the input being the transaction ID and the keys (k0/k1) set to the first two little-endian 64-bit integers from the above hash, respectively.
* Dropping the 2 most significant bytes from the SipHash output to make it 6 bytes.


## Short Tx IDs Implementation
### Getting some Sample Block Data
First of all, we will start runninf `bitcoind` on a testnet (inside the file bitcoin-conf add `testnet=1`).
On a new terminal we will use the following bitcoin-cli commands for getting into the calculation of the Short TxIDs.
First of all, let's grab a  random block hash, by height:
```
bitcoin-cli getblockhash HEIGHT
```
Now that we have the blockhas, we can use it for the following commands. We will need the **block** and the **blockheader**:
```
bitcoin-cli getblock BLOCK_HASH
```
Sample block:

![](https://i.imgur.com/SSYMQaw.png)


And now we get its block header:
```
bitcoin-cli getblockheader BLOCK_HASH
```
Sample blockheader:
![](https://i.imgur.com/55zQTKn.png)

### Setting up our Node Project
Now its' time to create our node project and install the needed dependencies:
```
npm init
npm i siphash
```

We will use siphash library for calculating **SipHash-2-4**.
