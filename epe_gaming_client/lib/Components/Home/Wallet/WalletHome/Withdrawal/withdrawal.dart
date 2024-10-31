import 'package:flutter/material.dart';

class Withdrawal extends StatefulWidget {
  const Withdrawal({super.key});

  @override
  State<Withdrawal> createState() => _WithdrawalState();
}

class _WithdrawalState extends State<Withdrawal> {
  String? selectedType;
  final TextEditingController _amountController = TextEditingController();

  // Function handler for Withdrawal with validation
  void _handleWithdrawal() {
    String amount = _amountController.text;

    // Check if a type is selected
    if (selectedType == null) {
      print('Error: Please select a type.');
      return;
    }

    // Check if the amount is not empty
    if (amount.isEmpty) {
      print('Error: Please enter an amount.');
      return;
    }

    // Proceed with the withdrawal request if validations pass
    print('Requesting withdrawal of $amount from $selectedType.');
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Reedeem Coin',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            DropdownButton<String>(
              isExpanded: true,
              hint: Text('Select Type'),
              value: selectedType,
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
                setState(() {
                  selectedType = value;
                });
              },
            ),
            SizedBox(height: 16),
            TextField(
              controller: _amountController,
              decoration: InputDecoration(
                labelText: 'Enter Quantity',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _handleWithdrawal,
              child: Text('Request Withdrawal'),
            ),
          ],
        ),
      ),
    );
  }
}
