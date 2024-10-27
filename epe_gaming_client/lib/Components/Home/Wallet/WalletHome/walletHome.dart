import 'package:flutter/material.dart';

class WalletHomePage extends StatelessWidget {
  final TextEditingController _amountController = TextEditingController();

  WalletHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Wallet Information Card
          Card(
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
                  _buildInfoRow('Deposit:', '\$1000'),
                  _buildInfoRow('Cash Bonus:', '\$200'),
                  _buildInfoRow('Net Winning:', '\$300'),
                  SizedBox(height: 16),
                  _buildInfoRow('KYC Status:', 'Verified'),
                  _buildInfoRow('Bank Status:', 'Updated'),
                ],
              ),
            ),
          ),

          // Add Funds Card
          Card(
            elevation: 4,
            margin: const EdgeInsets.symmetric(vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Add Funds',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Minimum Amount: \$10',
                    style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                  ),
                  SizedBox(height: 8),
                  TextField(
                    controller: _amountController,
                    decoration: InputDecoration(
                      labelText: 'Enter Amount',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.money),
                    ),
                    keyboardType: TextInputType.number,
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      // Implement your add funds logic here
                      //String amount = _amountController.text;
                      // Perform action with the entered amount
                    },
                    child: Text('Add Funds'),
                  ),
                ],
              ),
            ),
          ),
          // Withdrawal Card
          Card(
            elevation: 4,
            margin: const EdgeInsets.symmetric(vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Withdrawal',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16),
                  DropdownButton<String>(
                    isExpanded: true,
                    hint: Text('Select Type'),
                    items: [
                      DropdownMenuItem(
                        value: 'Deposit',
                        child: Text('Deposit'),
                      ),
                      DropdownMenuItem(
                        value: 'Net Winning',
                        child: Text('Net Winning'),
                      ),
                    ],
                    onChanged: (value) {
                      // Handle dropdown change
                    },
                  ),
                  SizedBox(height: 16),
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Enter Amount',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.number,
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      // Add your request withdrawal logic here
                    },
                    child: Text('Request Withdrawal'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0), // Space between rows
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 16),
          ),
          Text(
            value,
            style: TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
}
