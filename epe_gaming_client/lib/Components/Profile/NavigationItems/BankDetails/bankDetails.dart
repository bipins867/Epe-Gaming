import 'package:epe_gaming_client/ApiHandler/UserProfile/userProfileApiHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class BankDetailsPage extends StatefulWidget {
  const BankDetailsPage({super.key});

  @override
  State<BankDetailsPage> createState() => _BankDetailsPageState();
}

class _BankDetailsPageState extends State<BankDetailsPage> {
  AppConfig? appConfig;
  Map<String, dynamic>? bankDetails;

  final TextEditingController bankNameController = TextEditingController();
  final TextEditingController accountHolderNameController =
      TextEditingController();
  final TextEditingController accountNumberController = TextEditingController();
  final TextEditingController ifscCodeController = TextEditingController();
  final TextEditingController upiIdController = TextEditingController();

  @override
  void initState() {
    super.initState();
    appConfig = AppConfig();

    _fetchBankDetails();
  }

  void _fetchBankDetails() async {
    try {
      dynamic response = await getRequestWithToken('user/bankDetails/get');

      if (response['statusCode'] == 200) {
        setState(() {
          bankDetails = response['body']['data'];
          _initializeFields();
        });
        UserProfileApiHandler.updateProfileInfo(context);
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

  void _initializeFields() {
    if (bankDetails != null) {
      if (bankDetails!['bankName'] != null) {
        bankNameController.text = bankDetails!['bankName'];
      }
      if (bankDetails!['accountHolderName'] != null) {
        accountHolderNameController.text = bankDetails!['accountHolderName'];
      }
      if (bankDetails!['accountNumber'] != null) {
        accountNumberController.text = bankDetails!['accountNumber'];
      }
      if (bankDetails!['ifscCode'] != null) {
        ifscCodeController.text = bankDetails!['ifscCode'];
      }
      if (bankDetails!['upiId'] != null) {
        upiIdController.text = bankDetails!['upiId'];
      }
    }
  }

  Future<void> _updateBankStatus() async {
    Map<String, dynamic> requestData = {
      'bankName': bankNameController.text,
      'accountHolderName': accountHolderNameController.text,
      'accountNumber': accountNumberController.text,
      'ifscCode': ifscCodeController.text,
      'upiId': upiIdController.text,
    };

    UserProfileApiHandler.updateBankStatus(context, requestData);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bank Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 4,
          margin: const EdgeInsets.symmetric(vertical: 8.0),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Bank Details',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  controller: bankNameController,
                  decoration: InputDecoration(
                    labelText: 'Bank Name',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  controller: accountHolderNameController,
                  decoration: InputDecoration(
                    labelText: 'Account Holder Name',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  controller: ifscCodeController,
                  decoration: InputDecoration(
                    labelText: 'IFSC Code',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  controller: accountNumberController,
                  decoration: InputDecoration(
                    labelText: 'Account Number',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.number,
                ),
                SizedBox(height: 16),
                Divider(height: 32, thickness: 1.2), // Separator line
                TextField(
                  controller: upiIdController,
                  decoration: InputDecoration(
                    labelText: 'UPI ID',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.emailAddress,
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _updateBankStatus,
                  style: ElevatedButton.styleFrom(
                    minimumSize:
                        Size(double.infinity, 50), // Make button full-width
                  ),
                  child: Text('Update Settlement Details'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
