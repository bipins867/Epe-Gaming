import 'package:epe_gaming_client/ApiHandler/UserProfile/userProfileApiHandler.dart';
import 'package:epe_gaming_client/Components/Profile/HeaderProfile/headerProfile.dart';
import 'package:epe_gaming_client/Components/Profile/Info/info.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/navigationItems.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  CustomLogger? customLogger;

  bool _isLoading = false;

  @override
  void initState() {
    super.initState();

    customLogger = CustomLogger();
    // Fetch the profile info when the page loads
    UserProfileApiHandler.updateProfileInfo(context);
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
                  HeaderProfile(),
                  Info(),
                  NavigationItems(),
                ],
              ),
      ),
    );
  }
}
