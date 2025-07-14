# Drug Supply Chain Management System

A full-stack, blockchain-enabled platform for secure, transparent, and efficient management of pharmaceutical supply chains. The system supports multiple user roles (Admin, Vendor/Manufacturer, Hospital, Pharmacy), real-time order tracking, inventory management, analytics, and document handling.

---

## 🚀 Key Features

- **Blockchain Integration:** Secure, immutable tracking of drug orders and deliveries using Ethereum smart contracts.
- **Role-Based Dashboards:** Custom dashboards for Admin, Vendor/Manufacturer, Hospital, and Pharmacy users.
- **Order & Inventory Management:** Place, track, and manage drug orders and inventory at every supply chain node.
- **Smart Contract Automation:** Automated contract execution for order fulfillment and delivery confirmation.
- **Document Management:** Upload and verify invoices, proofs of delivery, and other documents (Cloudinary/IPFS support).
- **Real-Time Tracking:** Live order and shipment status, including dispatch, delivery, and expiry logs.
- **Analytics & Reporting:** Visual dashboards with KPIs, performance metrics, and compliance monitoring.
- **Authentication & Authorization:** Secure login with NextAuth, role-based access, and session management.
- **Modern UI:** Built with Next.js, React, Tailwind CSS, and FontAwesome for a responsive, user-friendly experience.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Redux Toolkit
- **Backend:** Next.js API Routes (RESTful), Mongoose (MongoDB)
- **Database:** MongoDB (via Mongoose ODM)
- **Blockchain:** Solidity Smart Contracts (Ethereum/Polygon), Ethers.js
- **Authentication:** NextAuth.js (with email/password, role support)
- **File Storage:** Cloudinary (for document uploads)
- **Testing:** Jest, React Testing Library
- **Other:** FontAwesome, ECharts, Prisma (legacy/optional), IPFS (optional)

---

## 📁 Project Structure

```
├── app/                    # Next.js app directory (pages, API routes, UI)
│   ├── dashboard/          # Role-based dashboards (admin, vendor, hospital, pharmacy)
│   ├── api/                # API endpoints (RESTful, Next.js API routes)
│   ├── components/         # Reusable React components
│   ├── ui/                 # UI primitives (buttons, tables, sidebar, etc.)
│   └── ...                 # Auth, registration, verification, etc.
├── contracts/              # Solidity smart contracts
│   └── DrugSupplyChain.sol
├── emails/                 # Email templates (e.g., verification)
├── lib/                    # Backend logic, models, features, db, utils
│   ├── models/             # Mongoose models (User, Order, Inventory, etc.)
│   ├── features/           # Redux slices (auth, blockchain, inventory)
│   ├── db/                 # MongoDB connection utilities
│   └── ...                 # Contract interaction, schemas, etc.
├── prisma/                 # (Legacy/optional) Prisma schema
├── public/                 # Static assets (logo, fonts)
├── types/                  # TypeScript type definitions
├── README.md               # Project documentation
├── package.json            # Dependencies and scripts
└── ...                     # Config, scripts, etc.
```

---

## 🔐 Authentication

- **NextAuth.js** for secure authentication and session management.
- Supports email/password login and role-based access (Admin, Vendor, Hospital, Pharmacy).
- JWT-based session tokens.

---

## 🧑‍💻 User Roles & Dashboards

- **Admin:** User management, analytics, smart contract logs, supply chain tracker, notifications, settings.
- **Vendor/Manufacturer:** Manage medicines, update stock, view/accept/reject orders, dispatch, upload invoices/POD, performance metrics, expiry logs.
- **Hospital:** Order drugs, track orders, manage inventory, confirm delivery, dispense drugs, view usage history, feedback/support.
- **Pharmacy:** Order drugs, track orders, manage inventory, confirm delivery, internal transfers, drug returns, consumption analytics.

---

## 📦 Core Modules

- **Order Management:** Place, accept, reject, dispatch, and track orders across the supply chain.
- **Inventory Management:** Real-time stock updates, expiry tracking, batch management.
- **Document Upload:** Upload and verify invoices, proofs of delivery (PDF, image).
- **Analytics:** Visual dashboards (ECharts) for performance, compliance, and inventory.
- **Blockchain:** Solidity contract for order lifecycle, delivery confirmation, and audit logs.

---

## 🌐 Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB (local or cloud)
- (Optional) MetaMask for blockchain features
- (Optional) Cloudinary account for document uploads

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/drugs-supply-chain.git
   cd drugs-supply-chain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB, Cloudinary, and other secrets
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file with the following (see `.env.example`):

```env
# MongoDB
MONGODB_URI="mongodb://localhost:27017/drugs-supply-chain"

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Blockchain (optional)
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_RPC_URL=""
```

---

## 🧪 Testing

Run all tests with:
```bash
npm test
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, email: support@yourdomain.com

---

## 🙏 Acknowledgments

- Government of Delhi
- Open Source Community
- Blockchain Technology Community

---

**Note:**  
- For production, ensure all secrets are set and HTTPS is enabled.
- For blockchain features, deploy the smart contract and update the contract address in your environment variables.
