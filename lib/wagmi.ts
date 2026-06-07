import { QueryClient } from "@tanstack/react-query";
import type { EIP1193Provider } from "viem";
import { base } from "viem/chains";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { DATA_SUFFIX } from "./constants";

type WalletProvider = EIP1193Provider & {
  isOkxWallet?: true;
  isOKExWallet?: true;
  providers?: WalletProvider[];
};

type WalletWindow = Window & {
  ethereum?: WalletProvider;
  okxwallet?: WalletProvider;
};

function getInjectedProvider(
  windowObject: unknown,
  matcher: (provider: WalletProvider) => boolean,
) {
  const walletWindow = windowObject as WalletWindow | undefined;
  const ethereum = walletWindow?.ethereum;
  const providers = ethereum?.providers ?? (ethereum ? [ethereum] : []);
  return providers.find(matcher);
}

function getOkxProvider(windowObject: unknown) {
  const walletWindow = windowObject as WalletWindow | undefined;
  if (walletWindow?.okxwallet) return walletWindow.okxwallet;

  return getInjectedProvider(
    walletWindow,
    (provider) =>
      Boolean(provider.isOkxWallet || provider.isOKExWallet) ||
      provider === walletWindow?.okxwallet,
  );
}

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "Base Signal Board",
      preference: "all",
    }),
    injected({ target: "metaMask" }),
    injected({
      target() {
        return {
          id: "okxWallet",
          name: "OKX Wallet",
          provider: getOkxProvider,
        };
      },
    }),
    injected({
      target() {
        return {
          id: "browserWallet",
          name: "Browser Wallet",
          provider: (windowObject) => windowObject?.ethereum,
        };
      },
    }),
  ],
  dataSuffix: DATA_SUFFIX,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export const queryClient = new QueryClient();
