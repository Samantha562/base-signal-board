# BaseSignalBoard

BaseSignalBoard is a retro pixel arcade Mini App for choosing and submitting a single onchain signal on Base.

The app keeps the experience intentionally simple: connect a wallet, choose a signal, and submit a `sendSignal(uint8)` write to the deployed contract.

Supported signals:

- Build
- Ship
- Chill
- Bullish

BaseSignalBoard does not include referrals, leaderboards, paid features, task systems, or extra reward mechanics.

Participants only pay the normal Base network gas required for contract writes.

## Overview

BaseSignalBoard provides a lightweight interface for sending a signal to a Base smart contract.

The frontend is built with Next.js and uses Wagmi and Viem for wallet connection and contract interaction.

The visual design follows a retro pixel arcade style.
