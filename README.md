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

The project is intended for a small, public Mini App where the main action is selecting and submitting one of the supported signals.

## Features

- Retro pixel arcade interface
- Four supported signals: Build, Ship, Chill, and Bullish
- Wallet connection support
- Onchain `sendSignal(uint8)` contract writes
- Base network support
- Minimal interaction flow
- No leaderboard
- No referral system
- No paid feature system
- No task system

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem
- Tailwind CSS

## Wallet Connectors

The app is configured with Wagmi native connectors only.

Configured connectors:

- `coinbaseWallet`
- `injected`

The project does not use RainbowKit or a WalletConnect Project ID.

## Repository

Repository URL:

https://github.com/Samantha562/base-signal-board.git

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Samantha562/base-signal-board.git
cd base-signal-board
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Set the deployed Base contract address:

```bash
NEXT_PUBLIC_BASE_SIGNAL_BOARD_ADDRESS=your_deployed_contract_address
```

## Environment Variables

The main required public environment variable is:

```bash
NEXT_PUBLIC_BASE_SIGNAL_BOARD_ADDRESS
```

This value must point to the deployed `BaseSignalBoard` contract on Base.

For production deployments, set the same value in the hosting environment.

## Development

Start the local development server:

```bash
npm run dev
```

Then open the local app in a browser.

By default, Next.js commonly serves the app at:

```bash
http://localhost:3000
```

## Usage

1. Open the app.
2. Connect a supported wallet.
3. Choose one of the four available signals.
4. Submit the transaction.
5. Wait for the write to confirm on Base.

The supported signal choices are:

- Build
- Ship
- Chill
- Bullish

Signals may be submitted more than once.

## Checks

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run these commands before opening a pull request or deploying the app.

## Smart Contract

The contract source is located at:

```bash
contracts/BaseSignalBoard.sol
```
