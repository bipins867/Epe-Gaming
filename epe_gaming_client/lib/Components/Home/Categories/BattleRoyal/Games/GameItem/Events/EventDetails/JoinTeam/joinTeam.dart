import 'package:flutter/material.dart';

class JoinTeamPage extends StatelessWidget {
  final double totalWalletBalance = 1000.00; // Example balance
  final double entryFee = 100.00;

  const JoinTeamPage({super.key}); // Example entry fee

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Join Team'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Card for Total Wallet Balance and Entry Fee
            Card(
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Total Wallet Balance:',
                            style: TextStyle(fontSize: 16)),
                        Row(
                          children: [
                            Text('\$${totalWalletBalance.toStringAsFixed(2)}',
                                style: TextStyle(fontSize: 16)),
                            IconButton(
                              icon: Icon(Icons.info),
                              onPressed: () => _showInfoPopup(context,
                                  'This is your total wallet balance.'),
                            ),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Entry Fee:', style: TextStyle(fontSize: 16)),
                        Row(
                          children: [
                            Text('\$${entryFee.toStringAsFixed(2)}',
                                style: TextStyle(fontSize: 16)),
                            IconButton(
                              icon: Icon(Icons.info),
                              onPressed: () => _showInfoPopup(context,
                                  'This is the fee required to join the team.'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 20),

            // Cards for switches with info buttons
            _buildSwitchCard(context, 'Is Public:',
                'Publicly visible to all or only can be fetched by Team ID.'),
            _buildSwitchCard(
                context, 'Are Joiners Paid:', 'Admin is paying total amount.'),
            _buildSwitchCard(context, 'Is Amount Distributed:',
                'Whether the amount will be distributed to the team members or not.'),
            SizedBox(height: 20),

            // Pay and Join Button
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Handle pay and join logic here
                },
                child: Text('Pay and Join'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSwitchCard(BuildContext context, String title, String info) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: TextStyle(fontSize: 16)),
            Row(
              children: [
                Switch(
                    value: false,
                    onChanged: (value) {}), // Replace with state management
                IconButton(
                  icon: Icon(Icons.info),
                  onPressed: () => _showInfoPopup(context, info),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showInfoPopup(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }
}
