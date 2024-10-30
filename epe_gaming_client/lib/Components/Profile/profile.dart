import 'package:epe_gaming_client/Components/Profile/HeaderProfile/headerProfile.dart';
import 'package:epe_gaming_client/Components/Profile/Info/info.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/navigationItems.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  // Variable to hold profile information
  Map<String, dynamic>? profileInfo;
  Map<String, dynamic>? statusInfo;
  CustomLogger? customLogger;

  @override
  void initState() {
    super.initState();
    customLogger = CustomLogger();
    // Fetch the profile info when the page loads
    fetchProfileInfo();
  }

  // Function to fetch profile info from the API
  Future<void> fetchProfileInfo() async {
    try {
      dynamic response = await getRequestWithToken('user/info/profileInfo');

      if (response['statusCode'] == 200) {
        setState(() {
          profileInfo = response['body']['profileInfo'];
          statusInfo = response['body']['statusInfo'];
        });
      } else {
        handleErrors(response, alertFunction: (string) {
          showErrorAlertDialog(context, string);
        });
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      customLogger!.logError(error);
    } finally {}
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            HeaderProfile(
              profileInfo: profileInfo,
            ),
            Info(statusInfo: statusInfo),
            NavigationItems(
              profileInfo: profileInfo,
            ),
          ],
        ),
      ),
    );
  }
}
