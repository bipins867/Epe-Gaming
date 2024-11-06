import 'package:epe_gaming_client/ApiHandler/UserProfile/userProfileApiHandler.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Kyc/KycStatus/kycStatus.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Kyc/UpdateKyc/updateKyc.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class KYCPage extends StatefulWidget {
  const KYCPage({super.key});

  @override
  State<KYCPage> createState() => _KYCPageState();
}

class _KYCPageState extends State<KYCPage> {
  AppConfig? appConfig;
  Map<String, dynamic>? kycDetails;

  @override
  void initState() {
    super.initState();
    appConfig = AppConfig();
    _fetchKycDetails();
  }

  void _fetchKycDetails() async {
    try {
      dynamic response = await getRequestWithToken('user/kyc/get');

      if (response['statusCode'] == 200) {
        setState(() {
          kycDetails = response['body']['data'];
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

  @override
  Widget build(BuildContext context) {
    final status = kycDetails?['status'];

    return Scaffold(
      appBar: AppBar(
        title: Text('KYC'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            if (status != null) KycStatus(kycDetails: kycDetails),
            if (status != 'verified' && status != 'pending')
              UpdateKyc(
                kycDetails: kycDetails,
                fetchKycFunction: _fetchKycDetails,
              ),
          ],
        ),
      ),
    );
  }
}
