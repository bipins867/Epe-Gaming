import 'package:pplgaming/ApiHandler/UserProfile/userProfileApiHandler.dart';
import 'package:pplgaming/Components/Profile/HeaderProfile/headerProfile.dart';
import 'package:pplgaming/Components/Profile/Info/info.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/navigationItems.dart';
import 'package:pplgaming/Store/baseStoreProvider.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  CustomLogger? customLogger;

  @override
  void initState() {
    customLogger = CustomLogger();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<BaseStoreProvider>(context, listen: false)
          .updateIsProfileLoadingStatus(true);
      UserProfileApiHandler.updateProfileInfo(context);
    });
    // Fetch the profile info when the page loads

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    bool isLoading = Provider.of<BaseStoreProvider>(context).isProfileLoading;

    return SafeArea(
      child: Scaffold(
        body: isLoading
            ? Center(
                child: CircularProgressIndicator(),
              )
            : Container(
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(
                        "assets/Background/background-v1.jpg"), // Background image
                    fit: BoxFit.cover,
                  ),
                ),
                child: Column(
                  children: [
                    HeaderProfile(),
                    Info(),
                    NavigationItems(),
                  ],
                ),
              ),
      ),
    );
  }
}
