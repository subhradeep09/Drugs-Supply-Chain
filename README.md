# Drug Supply Chain Management System


## 🚀 Features


- **Blockchain Integration**: Secure and transparent supply chain tracking using Ethereum/Polygon
- **Role-based Access**: Separate dashboards for Admin, Hospital Staff, Pharmacy Staff, and Vendors
- **Smart Contract Management**: Automated contract execution and tracking
- **IPFS Document Storage**: Secure storage for receipts, invoices, and certificates
- **Real-time Tracking**: Live order and shipment tracking with QR codes
- **Analytics Dashboard**: Comprehensive KPIs and reporting tools
- **Mobile Support**: Optional mobile app for on-the-go management

  
## 🛠️ Tech Stack


- **Frontend**: Next.js, React, Tailwind CSS, Redux Toolkit
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Ethereum/Polygon, Ethers.js, Web3Modal
- **Storage**: IPFS for document storage
- **Authentication**: MetaMask (Web3) + JWT
- **Mobile**: React Native (optional)
  
  
## 📋 Prerequisites


- Node.js 18.x or later
- PostgreSQL 14.x or later
- MetaMask browser extension
- IPFS node (local or Infura)
- Ethereum/Polygon wallet

 
## 🚀 Getting Started


1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/delhi-drug-supply-chain.git
   cd delhi-drug-supply-chain
   ```
   

2. Install dependencies:
   ```bash
   npm install
   ```


3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.
   

5. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```


6. Run the development server:
   ```bash
   npm run dev
   ```


7. Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🔧 Environment Variables


Create a `.env.local` file with the following variables:


```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/drug_supply_chain"


# Blockchain
NEXT_PUBLIC_NETWORK_ID=137  # Polygon Mainnet
NEXT_PUBLIC_RPC_URL="https://polygon-rpc.com"
NEXT_PUBLIC_CONTRACT_ADDRESS=""


# IPFS
NEXT_PUBLIC_IPFS_PROJECT_ID=""
NEXT_PUBLIC_IPFS_PROJECT_SECRET=""


# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""


# Optional: Mobile Push Notifications
NEXT_PUBLIC_FIREBASE_CONFIG=""
```


## 📁 Project Structure


```
├── app/                    # Next.js 13+ app directory
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   ├── hospital/         # Hospital staff components
│   ├── pharmacy/         # Pharmacy components
│   ├── vendor/           # Vendor components
│   └── shared/           # Shared components
├── lib/                  # Utility functions and hooks
├── contracts/            # Smart contracts
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── types/               # TypeScript type definitions
```


## 🔐 Authentication


The system supports two authentication methods:
1. **MetaMask (Web3)**: Primary authentication for blockchain interactions
2. **JWT**: Fallback authentication for non-blockchain features


## 📱 Mobile App (Optional)


The mobile app provides:
- QR code scanning for delivery confirmation
- Push notifications
- Offline mode
- Photo upload for proof of delivery


## 🌐 Internationalization


The application supports multiple languages:
- English (en)
- Hindi (hi)
- Bengali (bn)


## 🧪 Testing


Run tests using:
```bash
npm test
```


## 📄 License


This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🤝 Contributing


1. Fork the repository
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📞 Support

For support, email support@delhi-drug-supply-chain.gov.in or join our Slack channel.

## 🙏 Acknowledgments

- Government of Delhi
- Open Source Community
- Blockchain Technology Community #
