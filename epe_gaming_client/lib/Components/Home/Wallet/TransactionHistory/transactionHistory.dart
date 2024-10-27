import 'package:flutter/material.dart';

class TransactionHistory extends StatelessWidget {
  // Dummy list of transactions
  final List<Transaction> transactions = [
    Transaction(
      date: '2024-10-01',
      time: '10:00 AM',
      transactionId: 'TX12345',
      transactionType: 'Deposit',
      credit: 1000.00,
      debit: 0.00,
      balance: 1000.00,
    ),
    Transaction(
      date: '2024-10-02',
      time: '02:30 PM',
      transactionId: 'TX12346',
      transactionType: 'Withdrawal',
      credit: 0.00,
      debit: 300.00,
      balance: 700.00,
    ),
    Transaction(
      date: '2024-10-03',
      time: '04:15 PM',
      transactionId: 'TX12347',
      transactionType: 'Bonus',
      credit: 200.00,
      debit: 0.00,
      balance: 900.00,
    ),
    // Add more dummy transactions as needed
  ];

  TransactionHistory({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Horizontal scroll hint row
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Icon(Icons.swipe, size: 16, color: Colors.grey),
              SizedBox(width: 4),
              Text(
                'Swipe horizontally to view all columns',
                style: TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ],
          ),
          SizedBox(height: 8), // Spacing before DataTable
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columns: [
                DataColumn(label: Text('Date')),
                DataColumn(label: Text('Time')),
                DataColumn(label: Text('Transaction ID')),
                DataColumn(label: Text('Transaction Type')),
                DataColumn(label: Text('Credit')),
                DataColumn(label: Text('Debit')),
                DataColumn(label: Text('Balance')),
              ],
              rows: transactions.map((transaction) {
                return DataRow(cells: [
                  DataCell(Text(transaction.date)),
                  DataCell(Text(transaction.time)),
                  DataCell(Text(transaction.transactionId)),
                  DataCell(Text(transaction.transactionType)),
                  DataCell(Text(transaction.credit > 0
                      ? '\$${transaction.credit}'
                      : '\$0')),
                  DataCell(Text(transaction.debit > 0
                      ? '\$${transaction.debit}'
                      : '\$0')),
                  DataCell(
                    Text(
                      '\$${transaction.balance}',
                      style: TextStyle(
                        color: transaction.credit > 0
                            ? Colors.green
                            : (transaction.debit > 0
                                ? Colors.red
                                : Colors.black),
                      ),
                    ),
                  ),
                ]);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}

// Dummy Transaction model
class Transaction {
  final String date;
  final String time;
  final String transactionId;
  final String transactionType;
  final double credit;
  final double debit;
  final double balance;

  Transaction({
    required this.date,
    required this.time,
    required this.transactionId,
    required this.transactionType,
    required this.credit,
    required this.debit,
    required this.balance,
  });
}
