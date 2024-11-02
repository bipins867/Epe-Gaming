import 'package:flutter/material.dart';

class TeamStatisticsPage extends StatelessWidget {
  final Map<String, dynamic>? dataInfo;
  const TeamStatisticsPage({super.key, required this.dataInfo});

  @override
  Widget build(BuildContext context) {
    if (dataInfo == null) {
      return Center(
        child: CircularProgressIndicator(),
      );
    }

    final event = dataInfo!['event'] ?? {};
    final totalPlayersJoined = dataInfo!['totalPlayersJoined'] ?? 0;
    final totalNumberOfTeams = dataInfo!['totalNumberOfTeams'] ?? 0;
    final totalTeamSize = (event['noOfPlayers'] / event['squadType']).round();
    final perTeamSize = event['squadType'];

    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Team Statistics',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            _buildStatisticRow('Total Team Size:', totalTeamSize.toString()),
            _buildStatisticRow(
                'Current Team Size:', totalNumberOfTeams.toString()),
            _buildStatisticRow('Per Team Size:', perTeamSize.toString()),
            _buildStatisticRow(
                'Total Players Joined:', totalPlayersJoined.toString()),
          ],
        ),
      ),
    );
  }

  Widget _buildStatisticRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(fontSize: 16)),
        Text(value, style: TextStyle(fontSize: 16)),
      ],
    );
  }
}
