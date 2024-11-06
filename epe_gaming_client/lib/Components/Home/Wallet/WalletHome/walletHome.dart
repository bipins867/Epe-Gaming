import 'package:epe_gaming_client/Components/Home/Wallet/WalletHome/AccountStatus/accountStatus.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/WalletHome/AddFunds/addFunds.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/WalletHome/WalletInformation/walletInformation.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/WalletHome/Withdrawal/withdrawal.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class WalletHomePage extends StatefulWidget {
  const WalletHomePage({super.key});

  @override
  _WalletHomePageState createState() => _WalletHomePageState();
}

class _WalletHomePageState extends State<WalletHomePage> {
  // Wallet information and account status placeholder
  Map<String, dynamic>? walletInfo;
  Map<String, dynamic>? accountStatus;

  @override
  void initState() {
    super.initState();
    _fetchWalletInfo(); // Simulate API request on page load
  }

  // Simulated API request function
  Future<void> _fetchWalletInfo() async {
    try {
      dynamic response = await getRequestWithToken('user/wallet/walletInfo');

      if (response['statusCode'] == 200) {
        setState(() {
          walletInfo = response['body']['walletInfo'];
          accountStatus = response['body']['accountStatus'];
        });
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
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Wallet Information Card
          Walletinformation(walletInfo: walletInfo),

          // Account Status Card
          Accountstatus(accountStatus: accountStatus),

          // Add Funds Card
          Addfunds(),

          // Withdrawal Card
          Withdrawal(),
        ],
      ),
    );
  }
}
