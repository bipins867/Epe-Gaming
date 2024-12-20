import 'package:pplgaming/Utils/appConfig.dart';
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
    CustomLogger.logInfo('$dataInfo');
    final event = dataInfo!['event'] ?? {};
    final totalPlayersJoined = dataInfo!['totalPlayersJoined'] ?? 0;
    final totalNumberOfTeams = dataInfo!['totalNumberOfTeams'] ?? 0;
    final totalTeamSize = (event['noOfPlayers'] / event['squadType']).round();
    final perTeamSize = event['squadType'];
    String RemainingTeamSize = (totalTeamSize - totalNumberOfTeams).toString();
    //print();
    //!int.parse(totalTeamSize) - int.parse(totalNumberOfTeams);

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
            _buildStatisticRow('Remaining Team Space:', RemainingTeamSize),
            _buildStatisticRow(
                'Current Team Space:', totalNumberOfTeams.toString()),
            _buildStatisticRow('Squad Type:', perTeamSize.toString()),
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
