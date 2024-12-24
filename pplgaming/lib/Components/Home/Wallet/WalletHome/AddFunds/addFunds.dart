import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:url_launcher/url_launcher.dart';

class Addfunds extends StatefulWidget {
  const Addfunds({super.key});

  @override
  State<Addfunds> createState() => _AddfundsState();
}

class _AddfundsState extends State<Addfunds> {
  final TextEditingController _amountController = TextEditingController();
  // Function handler for Add Funds
  Future<void> _handleAddFunds() async {
    String amount = _amountController.text;
    try {
      dynamic response = await postRequestWithToken(
          'user/payment/addPayment', {"amount": amount});

      if (response['statusCode'] == 200) {
        String token = response['body']['token'];
        String baseUrl = '';
        if (kDebugMode) {
          baseUrl = "http://192.168.31.4:8181/transaction/${token}";
        } else {
          baseUrl = "https://epeindia.in/transaction/${token}";
        }
        Uri url = Uri.parse(baseUrl);
        if (await canLaunchUrl(url)) {
          CustomLogger.logInfo("Url launched");
          await launchUrl(url, mode: LaunchMode.externalApplication);
        } else {
          showInfoAlertDialog(context,
              "Problem in opening the Redirect Url! The url is copied to the clipboard now you can manually paste the url to proceed the transaction!",
              callbackFunction: () {
            CustomLogger.logInfo(baseUrl);
            Clipboard.setData(ClipboardData(text: baseUrl));
          });
        }
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
              'Add Coins',
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
                prefixIcon: Icon(Icons.money),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _handleAddFunds,
              child: Text('Add Coins'),
            ),
          ],
        ),
      ),
    );
  }
}
