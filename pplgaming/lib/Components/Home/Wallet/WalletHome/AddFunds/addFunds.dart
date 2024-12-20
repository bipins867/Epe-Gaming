import 'package:flutter/material.dart';
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
    Uri url = Uri.parse("https://pplgaming.com");
    if (await canLaunchUrl(url)) {
      CustomLogger.logInfo("Url launched");
      await launchUrl(url, mode: LaunchMode.externalApplication);
    } else {
      CustomLogger.logError("Can't launch the url!");
    }
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
