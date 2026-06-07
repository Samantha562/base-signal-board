# Base Signal Board

Retro pixel arcade Mini App for picking one onchain signal on Base:

- Build
- Ship
- Chill
- Bullish

Users connect a wallet, choose a signal, and send unlimited `sendSignal(uint8)` writes. There are no points, tokens, invites, or payments beyond Base gas.

## Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem
- Tailwind CSS

Only Wagmi native `coinbaseWallet` and `injected` connectors are configured. There is no RainbowKit, WalletConnect Project ID, points, token, referral flow, leaderboard, paid feature, or task system.

## Setup

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_BASE_SIGNAL_BOARD_ADDRESS` to the deployed Base contract address.

Before production deployment, verify these values:

- `base:app_id` and `talentapp:project_verification` in `app/layout.tsx`
- `DATA_SUFFIX` in `lib/constants.ts` after the Base builder code is available
- `NEXT_PUBLIC_BASE_SIGNAL_BOARD_ADDRESS` in Vercel after the contract is deployed

## Development

```bash
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deployment Notes

Deploy the contract in `contracts/BaseSignalBoard.sol` to Base, set the contract address in Vercel, and disable Vercel Deployment Protection so the Mini App can load publicly.

The hardcoded verification metadata is in `app/layout.tsx`. The Wagmi attribution `dataSuffix` is configured in `lib/wagmi.ts`, and every `writeContract` call explicitly passes `dataSuffix`.
