import 'package:pplgaming/Store/baseStoreProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Info extends StatelessWidget {
  const Info({super.key});

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic>? userProfileInfo =
        Provider.of<BaseStoreProvider>(context).userProfileInfo;
    Map<String, dynamic>? statusInfo =
        userProfileInfo != null && userProfileInfo.containsKey('statusInfo')
            ? userProfileInfo['statusInfo']
            : null;

    // Get data from statusInfo or use "N/A" if null
    String matchesPlayed = statusInfo?['matchesPlayed']?.toString() ?? '0';
    String totalKills = statusInfo?['totalKills']?.toString() ?? '0';
    String totalWinnings = statusInfo?['totalWinning']?.toString() ?? '0';

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      elevation: 6, // Adds a shadow effect
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // Matches Played
            Column(
              children: [
                const Text(
                  "Match Played",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(matchesPlayed),
              ],
            ),
            // Total Kills
            Column(
              children: [
                const Text(
                  "Total Kill",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(totalKills),
              ],
            ),
            // Winnings
            Column(
              children: [
                const Text(
                  "Winnings",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text("🪙$totalWinnings"),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
