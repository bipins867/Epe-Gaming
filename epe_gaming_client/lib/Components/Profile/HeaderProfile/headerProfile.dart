import 'package:epe_gaming_client/Store/baseStoreProvider.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HeaderProfile extends StatelessWidget {
  const HeaderProfile({super.key});

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic>? userProfileInfo =
        Provider.of<BaseStoreProvider>(context).userProfileInfo;
    Map<String, dynamic>? profileInfo =
        userProfileInfo != null && userProfileInfo.containsKey('userProfile')
            ? userProfileInfo['userProfile']
            : null;

    // Extract the relevant information from profileInfo
    final String name =
        profileInfo?['name'] ?? 'No Name'; // Provide a default value
    final String username =
        profileInfo?['customerId'] ?? 'No Username'; // Provide a default value
    final String walletBalance =
        '${profileInfo?['walletBalance']}'; // Provide a default value

    String baseImageUrl = AppConfig.fileBaseUrl;

    String profileUrl =
        profileInfo?['profileUrl'] ?? ''; // URL of the profile image

    if (profileUrl != '') {
      profileUrl = '$baseImageUrl$profileUrl';
    }

    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            // Left part with Circular Avatar
            Expanded(
              flex: 1,
              child: CircleAvatar(
                radius: 40,
                backgroundColor: Colors.grey.shade300,
                backgroundImage: profileUrl.isNotEmpty
                    ? NetworkImage(profileUrl)
                    : null, // Load image from URL
                child: profileUrl.isEmpty
                    ? const Icon(
                        Icons.person,
                        size: 40,
                        color: Colors.blue,
                      )
                    : null, // Show icon if no image is available
              ),
            ),
            const SizedBox(width: 16),
            // Right part with Name, Username, Wallet Balance
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Username: $username',
                    style: const TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Coin Balance: 🪙$walletBalance', // Format balance to 2 decimal places
                    style: const TextStyle(fontSize: 16, color: Colors.green),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
