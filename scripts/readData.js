const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const DeliveredOrders = await hre.ethers.getContractFactory("DeliveredOrders");
  const contract = await DeliveredOrders.attach(contractAddress);

  const orders = await contract.getDeliveredOrders();

  console.log("✅ Delivered Orders:");
  orders.forEach((order, index) => {
    console.log(`\n📦 Order #${index + 1}`);
    console.log(`- Order ID: ${order.orderId}`);
    console.log(`- Hospital: ${order.hospitalName}`);
    console.log(`- Medicine ID: ${order.medicineId}`);
    console.log(`- Medicine Name: ${order.medicineName}`);
    console.log(`- Quantity: ${order.quantity.toString()}`);
    console.log(`- Vendor ID: ${order.vendorId}`);
    console.log(`- Vendor Name: ${order.vendorName}`);
    console.log(`- Timestamp: ${new Date(Number(order.timestamp) * 1000).toLocaleString()}`);
  });
}

main().catch((err) => {
  console.error("❌ Error reading data:", err);
  process.exit(1);
});
