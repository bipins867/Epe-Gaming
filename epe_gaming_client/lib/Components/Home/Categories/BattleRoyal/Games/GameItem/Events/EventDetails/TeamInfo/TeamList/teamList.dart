import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/TeamInfo/TeamList/TeamMemberList/teamMemberList.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class TeamListPage extends StatelessWidget {
  final List<dynamic> teams;
  const TeamListPage({super.key, required this.teams});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Teams List',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 10),
        Column(
          children: teams
              .map<Widget>((team) => TeamMembersList(
                    team: team,
                  ))
              .toList(),
        ),
      ],
    );
  }
}
