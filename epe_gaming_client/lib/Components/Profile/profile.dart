import 'package:epe_gaming_client/Components/Profile/HeaderProfile/headerProfile.dart';
import 'package:epe_gaming_client/Components/Profile/Info/info.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/navigationItems.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

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

  bool _isLoading = false;

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
      setState(() {
        _isLoading = true;
      });
      dynamic response = await getRequestWithToken('user/info/profileInfo');

      if (response['statusCode'] == 200) {
        setState(() {
          profileInfo = response['body']['profileInfo'];
          statusInfo = response['body']['statusInfo'];
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
      customLogger!.logError(error);
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: _isLoading
            ? Center(
                child: CircularProgressIndicator(),
              )
            : Column(
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
