"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Gamepad2,
  LogOut,
  PlugZap,
  RadioTower,
  Send,
  Wallet,
  X,
} from "lucide-react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { base } from "viem/chains";
import { baseSignalBoardAbi } from "@/lib/abi";
import {
  BASESCAN_TX_URL,
  CONTRACT_ADDRESS,
  DATA_SUFFIX,
  SignalId,
  signalDetails,
  signalLabels,
} from "@/lib/constants";
import { wagmiConfig } from "@/lib/wagmi";

const signalIds = [0, 1, 2, 3] as const satisfies readonly SignalId[];

function formatCount(value?: bigint) {
  return value === undefined ? "--" : value.toString();
}

function shortAddress(address?: `0x${string}`) {
  if (!address) return "NOT CONNECTED";
  return `${address.slice(0, 6)}...${address.slice(-4)}`.toUpperCase();
}

export default function Home() {
  const [selectedSignal, setSelectedSignal] = useState<SignalId>(0);
  const [lastTx, setLastTx] = useState<`0x${string}` | undefined>();
  const [txError, setTxError] = useState<string | undefined>();
  const refreshedTx = useRef<`0x${string}` | undefined>(undefined);
  const { address, chainId, connector: activeConnector, isConnected } = useAccount();
  const { connectAsync, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const enabled = Boolean(CONTRACT_ADDRESS);
  const onBase = chainId === base.id;

  const latestSignal = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: baseSignalBoardAbi,
    functionName: "latestSignal",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const mySignals = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: baseSignalBoardAbi,
    functionName: "userSignals",
    args: address ? [address] : undefined,
    query: { enabled: enabled && Boolean(address) },
  });

  const totalSignals = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: baseSignalBoardAbi,
    functionName: "totalSignals",
    query: { enabled },
  });

  const breakdown = useReadContracts({
    contracts: signalIds.map((signal) => ({
      address: CONTRACT_ADDRESS,
      abi: baseSignalBoardAbi,
      functionName: "signalCounts",
      args: [signal],
    })),
    allowFailure: false,
    query: { enabled },
  });

  const receipt = useWaitForTransactionReceipt({
    hash: lastTx,
    query: { enabled: Boolean(lastTx) },
  });

  const total = totalSignals.data ?? 0n;
  const latestLabel =
    mySignals.data && mySignals.data > 0n
      ? signalLabels[(latestSignal.data ?? 0) as SignalId]
      : "NONE";

  const buttonLabel = useMemo(() => {
    if (!isConnected) return "CONNECT FIRST";
    if (!enabled) return "SET CONTRACT";
    if (!onBase) return "SWITCH BASE";
    if (isWriting) return "SENDING...";
    if (receipt.isLoading) return "MINING...";
    return "SEND SIGNAL";
  }, [enabled, isConnected, isWriting, onBase, receipt.isLoading]);

  const walletOptions = wagmiConfig.connectors.map((connector) => ({
    connector,
    label:
      connector.name === "Coinbase Wallet SDK"
        ? "Coinbase Wallet"
        : connector.name,
  }));

  const txStatus = useMemo(() => {
    if (txError) return "FAILED";
    if (isWriting) return "WAITING FOR WALLET";
    if (receipt.isLoading) return "PENDING";
    if (receipt.isSuccess) return "SUCCESS";
    if (receipt.isError) return "FAILED";
    return "IDLE";
  }, [isWriting, receipt.isError, receipt.isLoading, receipt.isSuccess, txError]);

  useEffect(() => {
    if (!receipt.isSuccess || !lastTx || refreshedTx.current === lastTx) return;
    refreshedTx.current = lastTx;
    latestSignal.refetch();
    mySignals.refetch();
    totalSignals.refetch();
    breakdown.refetch();
  }, [breakdown, lastTx, latestSignal, mySignals, receipt.isSuccess, totalSignals]);

  async function sendSignal() {
    if (!isConnected) {
      document
        .querySelector<HTMLDetailsElement>("#wallet-options")
        ?.setAttribute("open", "true");
      return;
    }
    if (!enabled || !CONTRACT_ADDRESS) {
      setTxError("Contract address is not configured.");
      return;
    }
    if (!onBase) {
      switchChain({ chainId: base.id });
      return;
    }

    try {
      setTxError(undefined);
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: baseSignalBoardAbi,
        functionName: "sendSignal",
        args: [selectedSignal],
        chainId: base.id,
        dataSuffix: DATA_SUFFIX,
      });
      setLastTx(hash);
    } catch (error) {
      setTxError(error instanceof Error ? error.message : "Transaction failed");
    }
  }

  async function connectWallet(
    connector: (typeof wagmiConfig.connectors)[number],
  ) {
    try {
      setTxError(undefined);
      await connectAsync({ connector, chainId: base.id });
      document
        .querySelector<HTMLDetailsElement>("#wallet-options")
        ?.removeAttribute("open");
    } catch (error) {
      setTxError(error instanceof Error ? error.message : "Wallet connection failed");
    }
  }

  return (
    <main className="min-h-dvh bg-black px-3 py-4 text-[#f7f7e8] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-md flex-col gap-4">
        <section className="pixel-panel relative overflow-hidden p-4">
          <div className="scanlines" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="pixel-kicker">BASE / ONCHAIN PICKER</p>
              <h1 className="mt-2 text-3xl font-black uppercase leading-none text-[#00ff7f] sm:text-4xl">
                Base Signal Board
              </h1>
            </div>
            <div className="pixel-badge">
              <Gamepad2 size={18} />
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            <Stat label="My Latest Signal" value={latestLabel} tone="green" />
            <Stat label="My Signals" value={formatCount(mySignals.data)} />
            <Stat label="Total Signals" value={formatCount(totalSignals.data)} />
            <Stat
              label="Wallet Status"
              value={isConnected ? "ONLINE" : "INSERT COIN"}
              tone={isConnected ? "green" : "yellow"}
            />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {signalIds.map((signal) => {
            const detail = signalDetails[signal];
            const active = selectedSignal === signal;
            return (
              <button
                key={signal}
                type="button"
                onClick={() => setSelectedSignal(signal)}
                className={`pixel-button min-h-24 p-3 text-left ${
                  active ? "is-active" : ""
                }`}
              >
                <span className={`mb-3 block h-3 w-8 ${detail.accent}`} />
                <span className="block text-xl font-black uppercase">
                  {detail.label}
                </span>
                <span className="mt-2 block text-xs text-[#ffe066]">
                  SIGNAL {detail.hotkey}
                </span>
              </button>
            );
          })}
        </section>

        <section className="pixel-panel grid gap-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase text-[#f7f7e8]/70">
                Wallet Status
              </p>
              <p className="mt-1 break-words text-sm font-black uppercase text-[#ffe066]">
                {shortAddress(address)} / {onBase ? "BASE" : "NOT BASE"}
              </p>
              {activeConnector ? (
                <p className="mt-1 text-[10px] font-black uppercase text-[#00ff7f]">
                  {activeConnector.name}
                </p>
              ) : null}
            </div>
            {isConnected ? (
              <button
                aria-label="Disconnect wallet"
                className="pixel-icon-button"
                onClick={() => disconnect()}
                type="button"
              >
                <LogOut size={18} />
              </button>
            ) : null}
          </div>
          {!isConnected ? (
            <details className="wallet-details" id="wallet-options">
              <summary className="pixel-wallet-button flex min-h-12 cursor-pointer list-none items-center justify-center gap-2 px-3 text-xs font-black uppercase">
                <Wallet size={16} />
                Connect Wallet
              </summary>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {walletOptions.map(({ connector, label }) => (
                  <button
                    className="pixel-mini-button flex items-center justify-center gap-2 px-2"
                    disabled={isConnecting}
                    key={connector.uid}
                    onClick={() => connectWallet(connector)}
                    type="button"
                  >
                    <Wallet size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </details>
          ) : null}
        </section>

        <button
          type="button"
          onClick={sendSignal}
          disabled={isWriting || isSwitching || receipt.isLoading || isConnecting}
          className="pixel-cta flex min-h-16 items-center justify-center gap-3 px-4 text-lg font-black uppercase"
        >
          <Send size={20} />
          {buttonLabel}
        </button>

        <section className="pixel-panel p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase text-[#00ff7f]">
              <Activity size={16} />
              Signal Breakdown
            </h2>
            <span className="text-xs text-[#ffe066]">TOTAL {formatCount(total)}</span>
          </div>
          <div className="space-y-3">
            {signalIds.map((signal, index) => {
              const count =
                typeof breakdown.data?.[index] === "bigint"
                  ? breakdown.data[index]
                  : 0n;
              const pct =
                total > 0n ? Number((count * 100n) / total).toString() : "0";
              return (
                <div key={signal}>
                  <div className="mb-1 flex items-center justify-between text-xs uppercase">
                    <span>{signalLabels[signal]}</span>
                    <span>{formatCount(count)}</span>
                  </div>
                  <div className="pixel-meter">
                    <span
                      className={signalDetails[signal].accent}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pixel-panel grid gap-3 p-4 text-xs uppercase">
          <Row
            icon={<RadioTower size={15} />}
            label="Contract"
            value={enabled ? shortAddress(CONTRACT_ADDRESS) : "ENV MISSING"}
          />
          <Row
            icon={<PlugZap size={15} />}
            label="Transaction Status"
            value={txStatus}
          />
          <Row
            icon={<PlugZap size={15} />}
            label="Last Transaction"
            value={
              lastTx ? (
                <a
                  className="text-[#00ff7f] underline decoration-dotted"
                  href={`${BASESCAN_TX_URL}${lastTx}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {receipt.isSuccess ? "VIEW CONFIRMED TX" : shortAddress(lastTx)}
                </a>
              ) : (
                "NO TX"
              )
            }
          />
          {txError ? (
            <div className="flex items-start gap-2 border-2 border-[#ff4fd8] p-2 text-[#ffb8ef]">
              <X size={14} />
              <span className="line-clamp-3">{txError}</span>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  tone = "blue",
}: {
  label: string;
  value: string;
  tone?: "blue" | "green" | "yellow";
}) {
  const color =
    tone === "green" ? "text-[#00ff7f]" : tone === "yellow" ? "text-[#ffe066]" : "text-[#7aa7ff]";
  return (
    <div className="pixel-stat min-h-20 p-3">
      <p className="text-[10px] uppercase text-[#f7f7e8]/70">{label}</p>
      <p className={`mt-2 break-words text-lg font-black uppercase ${color}`}>
        {value}
      </p>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2 text-[#f7f7e8]/70">
        {icon}
        {label}
      </span>
      <span className="min-w-0 text-right font-black text-[#ffe066]">{value}</span>
    </div>
  );
}
