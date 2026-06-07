export const baseSignalBoardAbi = [
  {
    type: "function",
    name: "latestSignal",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "sendSignal",
    stateMutability: "nonpayable",
    inputs: [{ name: "signal", type: "uint8" }],
    outputs: [],
  },
  {
    type: "function",
    name: "signalCounts",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint8" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalSignals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userSignals",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "SignalSent",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "signal", type: "uint8", indexed: false },
      { name: "userSignals", type: "uint256", indexed: false },
      { name: "totalSignals", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const;
