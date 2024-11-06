import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TransactionHistory extends StatefulWidget {
  const TransactionHistory({super.key});

  @override
  State<TransactionHistory> createState() => _TransactionHistoryState();
}

class _TransactionHistoryState extends State<TransactionHistory> {
  List<Transaction>? transactions;

  @override
  void initState() {
    super.initState();
    _fetchTransactionHistory();
  }

  Future<void> _fetchTransactionHistory() async {
    try {
      dynamic response =
          await getRequestWithToken('user/wallet/transactionHistory');

      if (response['statusCode'] == 200) {
        setState(() {
          transactions = (response['body']['transactions'] as List)
              .map((transaction) => Transaction.fromMap(transaction))
              .toList();
        });
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
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
          SizedBox(height: 8),
          transactions == null
              ? Center(child: CircularProgressIndicator()) // Loading indicator
              : transactions!.isEmpty
                  ? Center(child: Text('No transactions found'))
                  : SingleChildScrollView(
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
                          DataColumn(label: Text('Remark')),
                        ],
                        rows: transactions!.map((transaction) {
                          return DataRow(cells: [
                            DataCell(Text(transaction.date)),
                            DataCell(Text(transaction.time)),
                            DataCell(Text(transaction.transactionId ?? 'N/A')),
                            DataCell(Text(transaction.transactionType)),
                            DataCell(Text(transaction.credit > 0
                                ? '🪙${transaction.credit}'
                                : '🪙0')),
                            DataCell(Text(transaction.debit > 0
                                ? '🪙${transaction.debit}'
                                : '🪙0')),
                            DataCell(
                              Text(
                                '🪙${transaction.balance}',
                                style: TextStyle(
                                  color: transaction.credit > 0
                                      ? Colors.green
                                      : (transaction.debit > 0
                                          ? Colors.red
                                          : Colors.black),
                                ),
                              ),
                            ),
                            DataCell(Text(transaction.remark ?? '')),
                          ]);
                        }).toList(),
                      ),
                    ),
        ],
      ),
    );
  }
}

// Updated Transaction model with Date and Time conversion and new fields
class Transaction {
  final String date;
  final String time;
  final String? transactionId; // Optional as it may not exist
  final String transactionType;
  final dynamic credit;
  final dynamic debit;
  final dynamic balance;
  final String? remark; // Optional as it may not exist

  Transaction({
    required this.date,
    required this.time,
    this.transactionId,
    required this.transactionType,
    required this.credit,
    required this.debit,
    required this.balance,
    this.remark,
  });

  factory Transaction.fromMap(Map<String, dynamic> map) {
    final DateTime createdAt = DateTime.parse(map['createdAt']);
    final date = DateFormat('yyyy-MM-dd').format(createdAt);
    final time = DateFormat('HH:mm:ss').format(createdAt);

    return Transaction(
      date: date,
      time: time,
      transactionId: map[
          'merchantTransactionId'], // Assuming this is what you want as the ID
      transactionType: map['transactionType'],
      credit: map['credit'] ?? 0.0,
      debit: map['debit'] ?? 0.0,
      balance: map['balance'] ?? 0.0,
      remark: map['remark'], // Including remark
    );
  }
}
