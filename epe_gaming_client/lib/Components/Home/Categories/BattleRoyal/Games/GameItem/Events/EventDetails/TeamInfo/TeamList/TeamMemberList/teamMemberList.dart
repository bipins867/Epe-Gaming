import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class TeamMembersList extends StatelessWidget {
  final dynamic team;
  const TeamMembersList({super.key, required this.team});

  @override
  Widget build(BuildContext context) {
    final members = team['UserGames'] ?? [];
    final teamId = team['teamId'];
    final isFree = team['isJoinnersPaid'];
    final isAmountDistributed = team['isAmountDistributed'];
    final createdAt = DateFormat('yyyy-MM-dd HH:mm:ss')
        .format(DateTime.parse(team['createdAt']));

    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Team ID: $teamId', style: TextStyle(fontSize: 16)),
                IconButton(
                  icon: Icon(Icons.copy),
                  onPressed: () => _copyToClipboard(context, teamId),
                ),
              ],
            ),
            Text('Created At: $createdAt', style: TextStyle(fontSize: 14)),
            SizedBox(height: 10),
            Text('Team Members: ${members.length}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),
            Text('Is Free: ${isFree ? "Yes" : "No"}',
                style: TextStyle(fontSize: 16)),
            Text('Is Amount Distributed: ${isAmountDistributed ? "Yes" : "No"}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),

            Text('Team Members:',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

            // Horizontal scroll for team members DataTable only
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columns: [
                  DataColumn(label: Text('Player ID')),
                  DataColumn(label: Text('Player Name')),
                  DataColumn(label: Text('Kills')),
                  DataColumn(label: Text('Winning')),
                  DataColumn(label: Text('Joined At')),
                ],
                rows: members.map<DataRow>((member) {
                  final playerId = member['playerId'].toString();
                  final playerName = member['playerName'];
                  final kills = member['TeamUserGames']['kills'].toString();
                  final winning =
                      member['TeamUserGames']['winningBalance'].toString();
                  final joinedAt = DateFormat('yyyy-MM-dd HH:mm:ss')
                      .format(DateTime.parse(member['createdAt']));

                  return DataRow(cells: [
                    DataCell(Text(playerId),
                        onTap: () => _copyToClipboard(context, playerId)),
                    DataCell(Text(playerName)),
                    DataCell(Text(kills)),
                    DataCell(Text(winning)),
                    DataCell(Text(joinedAt)),
                  ]);
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _copyToClipboard(BuildContext context, String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Copied to clipboard: $text')),
    );
  }
}
