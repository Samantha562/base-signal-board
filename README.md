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

The visual style is designed around a retro pixel arcade feel.

The project is suitable for a small, public Mini App where the primary action is selecting and submitting one of the supported signals.

## Features

- Retro pixel arcade UI
- Four supported signals: Build, Ship, Chill, and Bullish
- Wallet connection support
- Onchain `sendSignal(uint8)` writes
- Base network support
- Minimal app flow
- No leaderboard
- No referral system
- No paid feature system
- No task system

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem
