# 🎥 FilStream - Decentralized Ad Delivery Platform

FilStream is a decentralized advertising platform that enables advertisers to upload, fund, and distribute video ads using Filecoin's powerful storage and CDN technologies. It leverages **USDFC** for stable payments, **PDP** for verifiable decentralized storage, and **FilCDN** for instant global content delivery.

---

## 🚀 Features

- 🎦 Upload and fund video ad campaigns
- 💰 Pay securely with USDFC (USD-pegged stablecoin)
- 📁 Store ad media with Filecoin PDP deals
- ⚡ Stream ads instantly via FilCDN
- 🔗 Fully on-chain and decentralized workflow
- 🧑‍💻 React + Express full-stack architecture

---

## 🛠️ Tech Stack

| Layer              | Tools Used                              |
|-------------------|------------------------------------------|
| Frontend (Client) | React, TailwindCSS, Axios, Ethers.js     |
| Backend (Server)  | Node.js, Express, Multer                 |
| Blockchain        | Filecoin (PDP), USDFC (Stablecoin)       |
| CDN Integration   | FilCDN for low-latency media delivery    |
| Wallets           | WalletConnect v2, MetaMask               |

---

## 🧠 How It Works

### 🎯 Ad Campaign Workflow

1. Advertiser connects wallet and selects a video ad.
2. The video is uploaded and stored via **Filecoin PDP**, returning a CID.
3. Advertiser funds the campaign by transferring **USDFC**.
4. The CID is converted to a **FilCDN** link for global streaming.
5. End users view the ad from FilCDN instantly with zero latency.

---

## 🧩 Architecture Diagram

