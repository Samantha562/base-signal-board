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
- Tailwind CSS

## Wallet Connectors

The app is configured with Wagmi native connectors only.

Configured connectors:

- `coinbaseWallet`
- `injected`

The project does not use RainbowKit or WalletConnect Project ID.

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

For production deployments, also set the same value in your hosting environment.

## Development

Start the local development server:

```bash
npm run dev
```

Then open the local app in your browser.

By default, Next.js commonly serves the app at:

```bash
http://localhost:3000
```

## Checks

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Use these commands before opening a pull request or deploying the app.

## Smart Contract

The contract source is located at:

```bash
contracts/BaseSignalBoard.sol
```

Deploy this contract to Base before using the app in production.

After deployment, copy the contract address into:

- `.env.local` for local development
- your hosting environment for production

## Production Deployment Notes

Before deploying to production, verify the Mini App metadata in:

```bash
app/layout.tsx
```

Review these values:

- `base:app_id`
- `talentapp:project_verification`

Also verify the Base build code and data suffix settings in:

```bash
lib/constants.ts
```

Review these values:

- `BASE_BUILD_CODE`
- `DATA_SUFFIX`

The Wagmi configuration is located in:

```bash
lib/wagmi.ts
```

This file sets the global suffix configuration.

Each `writeContract` call also explicitly passes the configured suffix.

## Vercel Notes

If deploying with Vercel, set the deployed contract address in the project environment variables.

Required value:

```bash
