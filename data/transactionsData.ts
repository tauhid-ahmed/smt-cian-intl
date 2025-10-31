export interface Transaction {
  id: string;
  transactionId: string;
  project: string;
  user: string;
  type: string;
  status: "completed" | "pending";
  amount: number;
  fee: number;
  date: string;
}

export const transactionsData: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN-001",
    project: "E-commerce Platform",
    user: "john.doe@email.com",
    type: "Subscription",
    status: "completed",
    amount: 299.99,
    fee: 8.99,
    date: "2024-01-15",
  },
  {
    id: "2",
    transactionId: "TXN-002",
    project: "Mobile App",
    user: "sarah.smith@email.com",
    type: "One-time Payment",
    status: "pending",
    amount: 149.50,
    fee: 4.48,
    date: "2024-01-14",
  },
  {
    id: "3",
    transactionId: "TXN-003",
    project: "Web Service",
    user: "mike.johnson@email.com",
    type: "Refund",
    status: "completed",
    amount: -99.99,
    fee: 0.00,
    date: "2024-01-14",
  },
  {
    id: "4",
    transactionId: "TXN-004",
    project: "API Integration",
    user: "lisa.wang@email.com",
    type: "Subscription",
    status: "completed",
    amount: 199.99,
    fee: 5.99,
    date: "2024-01-13",
  },
  {
    id: "5",
    transactionId: "TXN-005",
    project: "Cloud Storage",
    user: "alex.brown@email.com",
    type: "One-time Payment",
    status: "pending",
    amount: 79.99,
    fee: 2.39,
    date: "2024-01-13",
  },
  {
    id: "6",
    transactionId: "TXN-006",
    project: "E-commerce Platform",
    user: "emma.wilson@email.com",
    type: "Subscription",
    status: "completed",
    amount: 299.99,
    fee: 8.99,
    date: "2024-01-12",
  },
  {
    id: "7",
    transactionId: "TXN-007",
    project: "Mobile App",
    user: "david.chen@email.com",
    type: "Refund",
    status: "completed",
    amount: -49.99,
    fee: 0.00,
    date: "2024-01-12",
  },
  {
    id: "8",
    transactionId: "TXN-008",
    project: "Web Service",
    user: "sophia.martinez@email.com",
    type: "One-time Payment",
    status: "pending",
    amount: 199.99,
    fee: 5.99,
    date: "2024-01-11",
  },
  {
    id: "9",
    transactionId: "TXN-009",
    project: "API Integration",
    user: "james.taylor@email.com",
    type: "Subscription",
    status: "completed",
    amount: 149.99,
    fee: 4.49,
    date: "2024-01-11",
  },
  {
    id: "10",
    transactionId: "TXN-010",
    project: "Cloud Storage",
    user: "olivia.anderson@email.com",
    type: "One-time Payment",
    status: "completed",
    amount: 89.99,
    fee: 2.69,
    date: "2024-01-10",
  },
];