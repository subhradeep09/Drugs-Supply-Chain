// Global type definitions
declare module "*.json" {
  const value: any;
  export default value;
}

// Specific contract types
declare module "@/contracts/DeliveredOrders.json" {
  const value: any[];
  export default value;
}

// Email component types
declare module "@/emails/VerificationEmail" {
  import { JSX } from "react";
  interface VerificationEmailProps {
    name: string;
    otp: string;
  }
  const VerificationEmail: (props: VerificationEmailProps) => JSX.Element;
  export default VerificationEmail;
}