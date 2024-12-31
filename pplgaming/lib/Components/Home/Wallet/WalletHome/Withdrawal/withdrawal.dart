import 'package:flutter/material.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

class Withdrawal extends StatefulWidget {
  const Withdrawal({super.key});

  @override
  State<Withdrawal> createState() => _WithdrawalState();
}

class _WithdrawalState extends State<Withdrawal> {
  final TextEditingController _amountController = TextEditingController();

  // Function handler for Withdrawal with validation
  void _handleWithdrawal() async {
    String amount = _amountController.text;

    // Check if the amount is not empty
    if (amount.isEmpty) {
      showErrorAlertDialog(context, 'Please enter an amount.');
      return;
    }

    if (double.parse(amount) <= 0) {
      showErrorAlertDialog(context, 'Please enter a valid amount.');
      return;
    }

    try {
      dynamic response = await postRequestWithToken(
          'user/wallet/requestWithdrawal', {"amount": amount});

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Reedem Request Successfully Created!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    } finally {}
  }

  _handleCancelwithdrawal() async {
    try {
      dynamic response =
          await postRequestWithToken('user/wallet/cancelWithdrawal', {});

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Cancel Reedeem Request Successfull!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    } finally {}
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
              'Reedeem Coins',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
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
              child: Text('Reedeem Coins'),
            ),
            SizedBox(
              height: 16,
            ),
            ElevatedButton(
              onPressed: _handleCancelwithdrawal,
              child: Text("Cancel Pending Reedeem Requst"),
            )
          ],
        ),
      ),
    );
  }
}
