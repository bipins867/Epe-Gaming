import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SearchTeamPage extends StatefulWidget {
  @override
  _SearchTeamPageState createState() => _SearchTeamPageState();
}

class _SearchTeamPageState extends State<SearchTeamPage> {
  final TextEditingController _teamIdController = TextEditingController();
  Team? _foundTeam; // Make this nullable

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

  void _searchTeam() {
    String searchId = _teamIdController.text.trim();
    setState(() {
      _foundTeam = teams.firstWhere(
        (team) => team.id == searchId,
        orElse: () => Team(
            id: '',
            members: [],
            isFree: false,
            isAmountDistributed: false), // Return a default team
      );

      // Check if foundTeam is a default team
      if (_foundTeam!.id.isEmpty) {
        _foundTeam = null; // Reset to null if no valid team is found
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Input field for Team ID
          TextField(
            controller: _teamIdController,
            decoration: InputDecoration(
              labelText: 'Enter Team ID',
              border: OutlineInputBorder(),
            ),
          ),
          SizedBox(height: 10),
          ElevatedButton(
            onPressed: _searchTeam,
            child: Text('Search'),
          ),
          SizedBox(height: 20),

          // Display search results
          if (_foundTeam == null)
            Text(
              'No records found.',
              style: TextStyle(color: Colors.red, fontSize: 16),
            )
          else
            _buildTeamCard(context, _foundTeam!),
        ],
      ),
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
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Joined ${team.id}')),
    );
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
