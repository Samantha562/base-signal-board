import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://base-signal-board.vercel.app"),
  title: "Base Signal Board",
  description: "Pick a retro onchain signal and write it to Base.",
  other: {
    "base:app_id": "6a24ea3829b4287dd653e301",
    "talentapp:project_verification":
      "477dc8df8294c8f6f1297dfb040179ffca34fd21905e254ba64b680ccb397bc71043247752696a0b282187cfb5efb053cf798d5cd9d9926df9e4da3d7612d77d",
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "https://base-signal-board.vercel.app/og.png",
      button: {
        title: "Send Signal",
        action: {
          type: "launch_frame",
          name: "Base Signal Board",
          url: "https://base-signal-board.vercel.app",
          splashImageUrl: "https://base-signal-board.vercel.app/icon.png",
          splashBackgroundColor: "#000000",
        },
      },
    }),
  },
  openGraph: {
    title: "Base Signal Board",
    description: "Pick Build, Ship, Chill, or Bullish on Base.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
