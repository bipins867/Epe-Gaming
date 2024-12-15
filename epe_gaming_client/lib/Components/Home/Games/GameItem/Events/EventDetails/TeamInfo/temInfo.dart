import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventDetails/TeamInfo/TeamList/teamList.dart';
import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventDetails/TeamInfo/TeamStatistics/teamStatistics.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:flutter/material.dart';

class TeamInfoPage extends StatefulWidget {
  final String eventId;
  const TeamInfoPage({super.key, required this.eventId});

  @override
  State<TeamInfoPage> createState() => _TeamInfoPageState();
}

class _TeamInfoPageState extends State<TeamInfoPage> {
  Map<String, dynamic>? dataInfo;

  @override
  void initState() {
    super.initState();
    _fetchTeamInfo();
  }

  Future<void> _fetchTeamInfo() async {
    try {
      dynamic response = await postRequestWithToken(
          'user/events/getTeamInfo', {"eventId": widget.eventId});

      if (response['statusCode'] == 200) {
        setState(() {
          dataInfo = response['body']['data'];
        });
      } else {
        // Handle errors
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('System Error: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (dataInfo == null) {
      return Center(child: CircularProgressIndicator());
    }

    final teams = dataInfo!['teams'] ?? [];

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TeamStatisticsPage(
              dataInfo: dataInfo,
            ),
            SizedBox(height: 20),
            TeamListPage(
              teams: teams,
              userEventInfo: dataInfo!,
            )
          ],
        ),
      ),
    );
  }
}
