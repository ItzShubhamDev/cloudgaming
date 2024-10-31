import { Cashfree } from "cashfree-pg";

function initializeCashfree() {
  Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
  Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  return Cashfree;
}

const configuredCashfree = initializeCashfree();
export default configuredCashfree;
