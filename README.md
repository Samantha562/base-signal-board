# BaseSignalBoard

BaseSignalBoard is a retro pixel arcade Mini App for choosing a single onchain signal on Base.

Users connect a wallet, pick a signal, and submit `sendSignal(uint8)` writes to the deployed contract.

The available signals are:

- Build
- Ship
- Chill
- Bullish

The app is intentionally simple.

It does not include referrals, leaderboards, paid features, task systems, or extra reward mechanics.

Users only pay the normal Base network gas required for contract writes.

## Overview

BaseSignalBoard provides a lightweight interface for sending a signal to a Base smart contract.

The frontend is built with Next.js and uses Wagmi and Viem for wallet connection and contract interaction.
