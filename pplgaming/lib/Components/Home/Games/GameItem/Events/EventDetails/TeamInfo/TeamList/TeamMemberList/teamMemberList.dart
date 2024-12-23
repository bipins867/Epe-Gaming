import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/JoinTeam/joinTeam.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class TeamMembersList extends StatelessWidget {
  final dynamic team;
  final Map<String, dynamic> userEventInfo;
  final bool isSearched;

  const TeamMembersList(
      {super.key,
      required this.team,
      required this.userEventInfo,
      required this.isSearched});

  @override
  Widget build(BuildContext context) {
    final members = team['UserGames'] ?? [];
    final teamNumber = team['teamNumber'];
    final teamRank = team['teamRank'];
    final isFree = team['isJoinnersPaid'];
    final isPublic = team['isPublic'];
    final isAmountDistributed = team['isAmountDistributed'];
    final createdAt = DateFormat('yyyy-MM-dd HH:mm:ss')
        .format(DateTime.parse(team['createdAt']));
    final userId = userEventInfo['userId'];
    final isEventJoined = userEventInfo['isEventJoined'];
    final isSlotFull = userEventInfo['event']['squadType'] == members.length;

    String? teamId = team['teamId'];
    // Check if userId exists in the UserGames list

    final userExists = members.any((member) {
      bool cond = member['UserId'] == userId;
      return cond;
    });

    if (!team['isPublic'] && !userExists) {
      teamId = null;
    }

    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Team Number: $teamNumber', style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Team ID: ${teamId ?? "HIDDEN-ID"}', // Show "******" if teamId is null
                  style: TextStyle(fontSize: 16),
                ),
                Row(
                  children: [
                    if (userExists)
                      Icon(Icons.check_circle, color: Colors.green),
                    if (teamId != null)
                      IconButton(
                        icon: Icon(Icons.copy),
                        onPressed: () => _copyToClipboard(context, teamId!),
                      ),
                  ],
                ),
              ],
            ),

            if (teamRank != null)
              Text('Team Rank: $teamRank', style: TextStyle(fontSize: 16)),
            Text('Created At: $createdAt', style: TextStyle(fontSize: 14)),
            SizedBox(height: 10),
            Text('Team Members: ${members.length}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),
            Text('Is Free: ${isFree ? "Yes" : "No"}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),
            Text('Is Public: ${isPublic ? "Yes" : "No"}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),
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
                  DataColumn(label: Text('#')), // New column for numbering
                  DataColumn(label: Text('Player ID')),
                  DataColumn(label: Text('Player Name')),
                  DataColumn(label: Text('Kills')),
                  DataColumn(label: Text('Winning')),
                  DataColumn(label: Text('Joined At')),
                ],
                rows: members.asMap().entries.map<DataRow>((entry) {
                  final index = entry.key;
                  final member = entry.value;

                  final playerId = member['playerId'].toString();
                  final playerName = member['playerName'];
                  final kills = member['TeamUserGames']['kills'].toString();
                  final winning =
                      member['TeamUserGames']['winningBalance'].toString();
                  final joinedAt = DateFormat('yyyy-MM-dd HH:mm:ss')
                      .format(DateTime.parse(member['createdAt']));

                  return DataRow(cells: [
                    DataCell(Text((index + 1).toString())), // Row number
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
            SizedBox(height: 20),

            // Conditionally display Join Team button if isEventJoined is false
            if ((!isEventJoined && !isSlotFull) &&
                (teamId != null || isSearched))
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) => JoinTeamPage(
                                eventId: userEventInfo['event']['eventId'],
                                teamId: teamId,
                              )),
                    );
                  },
                  child: Text("Join Team"),
                ),
              )
            else if (isSlotFull)
              Center(
                child: Text(
                  "Slot is full",
                  style: TextStyle(fontSize: 16, color: Colors.red),
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
