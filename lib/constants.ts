import type { Address, Hex } from "viem";

export const APP_NAME = "Base Signal Board";
export const BASE_APP_ID = "6a24ea3829b4287dd653e301";
export const BASE_BUILD_CODE = "bc_nj2nq081";
export const DATA_SUFFIX =
  "0x62635f6e6a326e713038310b0080218021802180218021802180218021" as Hex;
export const DEFAULT_CONTRACT_ADDRESS =
  "0x73Df21154445278aac819e8F98FCd0Ed27662c58" as Address;

const configuredContractAddress = process.env
  .NEXT_PUBLIC_BASE_SIGNAL_BOARD_ADDRESS as Address | undefined;

export const CONTRACT_ADDRESS =
  configuredContractAddress &&
  !/^0x0{40}$/i.test(configuredContractAddress)
    ? configuredContractAddress
    : DEFAULT_CONTRACT_ADDRESS;

export const BASESCAN_TX_URL = "https://basescan.org/tx/";

export const signalLabels = ["Build", "Ship", "Chill", "Bullish"] as const;
export type SignalId = 0 | 1 | 2 | 3;

export const signalDetails: Record<
  SignalId,
  { label: (typeof signalLabels)[SignalId]; hotkey: string; accent: string }
> = {
  0: { label: "Build", hotkey: "01", accent: "bg-[#00ff7f]" },
  1: { label: "Ship", hotkey: "02", accent: "bg-[#0052ff]" },
  2: { label: "Chill", hotkey: "03", accent: "bg-[#ffe066]" },
  3: { label: "Bullish", hotkey: "04", accent: "bg-[#ff4fd8]" },
};
