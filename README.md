![shadowtokens_github](/src/assets/logo.svg)

# ShadowTokens

ShadowTokens is a cross-chain bridge between Elastos and Ethereum, enabling users to transfer digital asset ownership information (ETH, ELA, and any ERC20, ERC677, or ERC827 tokens) from one chain to the other quickly and reliably. The objective of this bridge is two fold:

1. Provide another scaling option for Ethereum via Elastos's EVM-comptabile sidechain (negligible fees, secured by over 50% of Bitcoin's hashpower plus DPoS).
2. Enable Elastos to take full advantage of the tokens native to Ethereum, such as stablecoins, for use in DeFi applications (TokSwap, Quicksilver, etc.).

ShadowTokens plans to develop more bridges in the future to provide interoperability for isolated blockchains. The smart contracts for this application use the multi-token extension for the Arbitrary Message Bridge, which has been audited and used for a variety of existing bridges (xDai, POA). For more information about this implementation, please visit https://docs.tokenbridge.net/. 

## Visual Guide

This ShadowTokens interface is intended to be a user-friendly tool to map your assets between chains. A demonstration of moving ELA from Elastos to Ethereum and back is provided below. Please note that 'ELA' refers to ELA on the Elastos smart contract chain, not the mainchain. If you need to fund the smart contract chain with ELA first, a tool for that is also available on Shadowtokens (see the end of this guide).

### ELA --> ELA on Ethereum

1) Visit https://tokbridge.net. Connect your web3 wallet (MetaMask or a WalletConnect compatible wallet that supports custom networks) to the Elastos Mainnet. If you have not yet configured the network, use the settings below to add the network.

// Pic

Once connected, you will see your address populated in the header, and your ELA balance displayed on the page. You will notice two separate fields, the top one representing assets on source network (Elastos), and the bottom one representing assets on the desination network (Ethereum). 

There are also icons labeled 'Lock', 'Release', 'Burn', and 'Mint'. These will change depending on which asset you select. In this case, ELA will be locked on the Elastos chain and it's shadow token (ELA on Ethereum) will be minted on the Ethereum chain at a 1:1 ratio, as governed by the smart contracts. On the way back, the ELA on Ethereum will be burned on the Ethereum chain, and ELA will be released on the Elastos chain. This sample principle applies to all asset transfers.

// Pic

2. To proceed enter the amount of ELA you wish to transfer to Ethereum. The minimum transfer is 1 ELA. Note that ELA functions as gas on the Elastos sidechain, so keep some to pay the minor transaction fees. (Note: To view the default token list or add a custom token, open the token selector modal, pictured below).

// Pic

When you enter a valid balance, the 'Next' button should activate. Click it. 

*Note: The destination address field is optional. This is for if you wish to bridge assets to an account other than the one you are already connected to. In most cases, this field can be skipped.*

// Pic

3. You be direction to the confirmation page. Ensure the transfer is what you want and click 'Confirm'. 

*(Note: Bridge mediator fees are presently only charged for ELA and ETH transfers on the return trip at 0.1%)*

// Pic

4. You should now be prompted to authorize the contract interaction and a wallet window should appear. The default gas price is fine and does not need to be changed, though you can if you want a faster transaction. Confirm the transaction in your wallet. 

*Note: When transferring ELA and ETH, you do not need to first approve an allowance. However, for ERC-20 tokens there will first be a spend authorization request to permit the smart contract to retrieve funds from the token contract, and then a second request for the actual bridge transfer.*

// Pic

5. The interface will now display the transfer progress, which includes waiting for block confirmations on the source network and for the bridge oracles to validate the transaction and mint or release your assets on the destination network. Once complete, the success message will pop up with a link to view the confirmaed transaction on the destination network. 

*Note: In some cases, the transfer may take longer than expected (>5 minutes) due to the fixed gas prices used by the bridge mediator. If this happens, please be assurred your funds are safe and will arrive in time.*

// Pic


### ELA on Ethereum --> ELA

You should now have some ELA in your wallet on the Ethereum chain. To view this, switch your network in MetaMask to the Ethereum mainnet. The app should update to reflect your news balances on the destination chain. 

*Note: You can also view the opposite bridge direction by clicking the swap icon in the middle, but you will need to switch your network before starting a transfer. It will not auto-connect to the proper chain.*

// Pic

To return your ELA on Ethereum back to the Elastos chain, simply repeat the same process as above. You will now be burning the ELA on Ethereum token, and releasing your original ELA. Keep in mind that gas fees will be much higher when initiating a transfer from the Ethereum network, and more confirmations are required, so plan accordingly.

That's it! You can now repeat this process for any token on Elastos or Ethereum.
