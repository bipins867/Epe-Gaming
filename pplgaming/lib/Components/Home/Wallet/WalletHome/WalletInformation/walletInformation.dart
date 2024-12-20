import 'package:flutter/material.dart';

class Walletinformation extends StatelessWidget {
  final Map<String, dynamic>? walletInfo;
  const Walletinformation({super.key, required this.walletInfo});

  @override
  Widget build(BuildContext context) {
    // Calculate total balance and uncleared balance
    double totalBalance = 0.0;
    double totalUnclearedBalance = 0.0;

    if (walletInfo != null) {
      totalBalance += double.parse(walletInfo!['deposit'].toString()) +
          double.parse(walletInfo!['cashBonus'].toString()) +
          double.parse(walletInfo!['netWinning'].toString());

      totalUnclearedBalance +=
          double.parse(walletInfo!['unclearedDeposit'].toString()) +
              double.parse(walletInfo!['unclearedCashBonus'].toString()) +
              double.parse(walletInfo!['unclearedNetWinning'].toString());
    }

    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Wallet Information',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            walletInfo != null
                ? Column(
                    children: [
                      DataTable(
                        columns: [
                          DataColumn(label: Text('Type')),
                          DataColumn(label: Text('Balance')),
                          DataColumn(label: Text('Uncleared')),
                        ],
                        rows: [
                          DataRow(cells: [
                            DataCell(Text(
                              'Deposit',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            )),
                            DataCell(Text('🪙${walletInfo!['deposit']}')),
                            DataCell(
                                Text('🪙${walletInfo!['unclearedDeposit']}')),
                          ]),
                          DataRow(cells: [
                            DataCell(Text('Coin Bonus',
                                style: TextStyle(fontWeight: FontWeight.bold))),
                            DataCell(Text('🪙${walletInfo!['cashBonus']}')),
                            DataCell(
                                Text('🪙${walletInfo!['unclearedCashBonus']}')),
                          ]),
                          DataRow(cells: [
                            DataCell(Text('Net Winning',
                                style: TextStyle(fontWeight: FontWeight.bold))),
                            DataCell(Text('🪙${walletInfo!['netWinning']}')),
                            DataCell(Text(
                                '🪙${walletInfo!['unclearedNetWinning']}')),
                          ]),
                        ],
                      ),
                      SizedBox(height: 16),
                      Divider(
                        thickness: 1.5,
                        color: Colors.grey,
                      ),
                      SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Total Balance:',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            '🪙${totalBalance.toStringAsFixed(2)}',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Total Uncleared Balance:',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            '🪙${totalUnclearedBalance.toStringAsFixed(2)}',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      Divider(
                        thickness: 1.5,
                        color: Colors.grey,
                      ),
                      SizedBox(height: 16),
                      Text(
                        '₹1 = 🪙1 Coin',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey[600],
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  )
                : CircularProgressIndicator(), // Loading indicator
          ],
        ),
      ),
    );
  }
}
