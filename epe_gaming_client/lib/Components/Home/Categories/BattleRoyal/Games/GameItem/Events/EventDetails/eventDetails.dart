import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/EventHome/eventHome.dart';
import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/SearchTeam/searchTeam.dart';
import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/TeamInfo/temInfo.dart';
import 'package:flutter/material.dart';

class EventDetailsPage extends StatelessWidget {
  final Map<String, dynamic> eventInfo;
  const EventDetailsPage({super.key, required this.eventInfo});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3, // Number of tabs
      child: Scaffold(
        appBar: AppBar(
          elevation: 5,
          title: Text('Event Details'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Home'),
              Tab(text: 'Team'),
              Tab(text: 'Search'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            EventDetailsHome(
              eventInfo: eventInfo,
            ), // First tab for Event Details
            TeamInfoPage(
              eventId: eventInfo['eventId'],
            ), // Second tab for Team Info
            SearchTeamPage(), // Third tab for Search Team
          ],
        ),
      ),
    );
  }
}
