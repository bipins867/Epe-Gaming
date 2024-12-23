import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/EventHome/eventHome.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/SearchTeam/searchTeam.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/TeamInfo/temInfo.dart';
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
            SearchTeamPage(
              eventId: eventInfo['eventId'],
            ), // Third tab for Search Team
          ],
        ),
      ),
    );
  }
}
