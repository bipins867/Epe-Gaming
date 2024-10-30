import 'package:flutter/material.dart';

class Info extends StatelessWidget {
  final Map<String, dynamic>? statusInfo;

  const Info({super.key, required this.statusInfo});

  @override
  Widget build(BuildContext context) {
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
