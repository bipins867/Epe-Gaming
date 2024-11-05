import 'package:epe_gaming_client/ApiHandler/UserProfile/userProfileApiHandler.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class UpdateKyc extends StatefulWidget {
  final Map<String, dynamic>? kycDetails;
  final VoidCallback fetchKycFunction;
  const UpdateKyc(
      {super.key, required this.kycDetails, required this.fetchKycFunction});

  @override
  State<UpdateKyc> createState() => _UpdateKycState();
}

class _UpdateKycState extends State<UpdateKyc> {
  final TextEditingController panController = TextEditingController();

  AppConfig? appConfig;
  CustomLogger? customLogger;

  @override
  void initState() {
    super.initState();
    appConfig = AppConfig();
    customLogger = CustomLogger();
  }

  Future<void> _updateKyc() async {
    if (panController.text.isEmpty) {
      showErrorAlertDialog(context, 'Please enter a valid PAN number.');
      return;
    }

    UserProfileApiHandler.updateKyc(context, panController.text);
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
              'Enter PAN Number',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: panController,
              decoration: InputDecoration(
                labelText: 'PAN Number',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.text,
              maxLength: 10,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _updateKyc,
              child: Text('Update KYC'),
            ),
          ],
        ),
      ),
    );
  }
}
