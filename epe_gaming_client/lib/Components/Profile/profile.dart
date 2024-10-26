import 'package:epe_gaming_client/Components/Profile/HeaderProfile/headerProfile.dart';
import 'package:epe_gaming_client/Components/Profile/Info/info.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/navigationItems.dart';
import 'package:flutter/material.dart';

class Profile extends StatelessWidget {
  const Profile({super.key});
  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            // Part 1: Top Card with Avatar and User Info
            HeaderProfile(),
            // Part 2: Statistics Row over Part 1 and Part 3
            Info(),
            // Part 3: List of Options
            NavigationItems()
          ],
        ),
      ),
    );
  }
}
