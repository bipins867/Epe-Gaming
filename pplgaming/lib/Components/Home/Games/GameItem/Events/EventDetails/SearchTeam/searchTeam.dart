import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/TeamInfo/TeamList/TeamMemberList/teamMemberList.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class SearchTeamPage extends StatefulWidget {
  final String eventId;
  const SearchTeamPage({super.key, required this.eventId});

  @override
  _SearchTeamPageState createState() => _SearchTeamPageState();
}

class _SearchTeamPageState extends State<SearchTeamPage> {
  final TextEditingController _teamIdController = TextEditingController();
  Map<String, dynamic>? teamInfo;
  Map<String, dynamic>? userEventInfo;

  @override
  void initState() {
    super.initState();
  }

  Future<void> _searchTeam() async {
    String teamId = '';
    if (_teamIdController.text == '') {
      return;
    }
    teamId = _teamIdController.text;

    try {
      Map<String, dynamic> payload = {
        "eventId": widget.eventId,
        "teamId": teamId
      };

      dynamic response =
          await postRequestWithToken('user/events/searchTeamInfo', payload);

      if (response['statusCode'] == 200) {
        setState(() {
          teamInfo = response['body']['team'];
          userEventInfo = response['body']['userEventInfo'];
        });
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    } finally {}
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
          if (userEventInfo == null || teamInfo == null)
            Text(
              'No records found.',
              style: TextStyle(color: Colors.red, fontSize: 16),
            )
          else
            TeamMembersList(
              team: teamInfo,
              userEventInfo: userEventInfo!,
              isSearched: true,
            )
        ],
      ),
    );
  }
}
