import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventList/eventList.dart';
import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/Search/search.dart';
import 'package:flutter/material.dart';

class Hosted extends StatelessWidget {
  const Hosted({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Hosted Events'),
          elevation: 5,
          bottom: const TabBar(
            indicatorColor: Colors.white,
            tabs: [
              Tab(text: 'OnGoing'),
              Tab(text: 'Upcoming'),
              Tab(text: 'Past'),
              Tab(text: "Search"),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            // Each of these widgets represents a page for the respective tab
            EventsList(
              category: 'OnGoing Events',
              type: "ongoing",
            ), // Ongoing Events tab
            EventsList(
              category: 'Upcoming Events',
              type: "upcoming",
            ), // Upcoming Events tab
            EventsList(
              category: 'Past Events',
              type: "past",
            ),

            SearchEvent() // Past Events tab
          ],
        ),
      ),
    );
  }
}
