import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/JoinTeam/joinTeam.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class TeamInfoPage extends StatelessWidget {
  final int totalTeamSize = 10; // Example values
  final int currentTeamSize = 5;
  final int perTeamSize = 2;
  final int totalPlayerJoined = 8;

  final List<Team> teams = [
    Team(
      id: 'Team001',
      members: [
        Player(customerId: 'C001', name: 'Alice'),
        Player(customerId: 'C002', name: 'Bob')
      ],
      isFree: true,
      isAmountDistributed: false,
    ),
    Team(
      id: 'Team002',
      members: [Player(customerId: 'C003', name: 'Charlie')],
      isFree: false,
      isAmountDistributed: true,
    ),
    // Add more teams as needed
  ];

  TeamInfoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Statistics Card
          Card(
            elevation: 4,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Team Statistics',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  _buildStatisticRow(
                      'Total Team Size:', totalTeamSize.toString()),
                  _buildStatisticRow(
                      'Current Team Size:', currentTeamSize.toString()),
                  _buildStatisticRow('Per Team Size:', perTeamSize.toString()),
                  _buildStatisticRow(
                      'Total Players Joined:', totalPlayerJoined.toString()),
                ],
              ),
            ),
          ),
          SizedBox(height: 20),

          // Team List Heading
          Text('Teams List',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          SizedBox(height: 10),

          // List of Team Cards
          Expanded(
            child: ListView.builder(
              itemCount: teams.length,
              itemBuilder: (context, index) {
                return _buildTeamCard(context, teams[index]);
              },
            ),
          ),
        ],
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

  Widget _buildTeamCard(BuildContext context, Team team) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Team ID with Copy Button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Team ID: ${team.id}', style: TextStyle(fontSize: 16)),
                IconButton(
                  icon: Icon(Icons.copy),
                  onPressed: () => _copyToClipboard(context, team.id),
                ),
              ],
            ),
            SizedBox(height: 10),
            Text('Team Members: ${team.members.length}',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 10),

            // Is Free Info
            Row(
              children: [
                Text('Is Free: ${team.isFree ? "Yes" : "No"}',
                    style: TextStyle(fontSize: 16)),
                IconButton(
                  icon: Icon(Icons.info),
                  onPressed: () => _showInfoPopup(context,
                      'If the leaders paid your amount, it will be free.'),
                ),
              ],
            ),
            // Is Amount Distributed Info
            Row(
              children: [
                Text(
                    'Is Amount Distributed: ${team.isAmountDistributed ? "Yes" : "No"}',
                    style: TextStyle(fontSize: 16)),
                IconButton(
                  icon: Icon(Icons.info),
                  onPressed: () => _showInfoPopup(context,
                      'If your team wins, the amount will be distributed among the teams or only to the leaders.'),
                ),
              ],
            ),
            SizedBox(height: 10),

            // List of Team Members in a DataTable
            Text('Team Members:',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            DataTable(
              columns: [
                DataColumn(label: Text('Customer ID')),
                DataColumn(label: Text('Name')),
              ],
              rows: team.members
                  .map(
                    (member) => DataRow(cells: [
                      DataCell(
                        Text(member.customerId),
                        onTap: () =>
                            _copyToClipboard(context, member.customerId),
                      ),
                      DataCell(Text(member.name)),
                    ]),
                  )
                  .toList(),
            ),

            SizedBox(height: 10),
            // Join Team Button
            ElevatedButton(
              onPressed: () {
                // Handle join team action
                _joinTeam(context, team);
              },
              child: Text('Join Team'),
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

  void _showInfoPopup(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _joinTeam(BuildContext context, Team team) {
    // Add your join team logic here

    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => JoinTeamPage()),
    );
    // ScaffoldMessenger.of(context).showSnackBar(
    //   SnackBar(content: Text('Joined ${team.id}')),
    // );
  }
}

class Team {
  final String id;
  final List<Player> members;
  final bool isFree;
  final bool isAmountDistributed;

  Team(
      {required this.id,
      required this.members,
      required this.isFree,
      required this.isAmountDistributed});
}

class Player {
  final String customerId;
  final String name;

  Player({required this.customerId, required this.name});
}

void main() {
  runApp(MaterialApp(
    home: TeamInfoPage(),
  ));
}
