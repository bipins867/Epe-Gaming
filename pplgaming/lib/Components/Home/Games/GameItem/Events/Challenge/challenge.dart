import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/CreateEvent/createEvent.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventList/eventList.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/Search/search.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class Challenge extends StatefulWidget {
  final String gameId;
  final int? defaultTabIndex; // Optional parameter for default tab index

  const Challenge({super.key, required this.gameId, this.defaultTabIndex});

  @override
  State<Challenge> createState() => _ChallengeState();
}

class _ChallengeState extends State<Challenge> {
  AppConfig? appConfig;

  List? upcommingEvents;
  List? ongoingEvents;
  List? pastEvents;

  @override
  void initState() {
    appConfig = AppConfig();
    super.initState();
    _fetchEventList();
  }

  Future<void> _fetchEventList() async {
    try {
      dynamic response = await postRequestWithToken(
        'user/events/getEventsList',
        {"GameId": widget.gameId, "eventType": "challenge"},
      );

      if (response['statusCode'] == 200) {
        setState(() {
          upcommingEvents = response['body']['upcomingEvents'];
          ongoingEvents = response['body']['ongoingEvents'];
          pastEvents = response['body']['pastEvents'];
        });
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      // Use the provided index or default to 0
      initialIndex: widget.defaultTabIndex ?? 0,
      length: 5,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Challenge Events'),
          elevation: 5,
          bottom: const TabBar(
            indicatorColor: Colors.white,
            tabs: [
              Tab(text: 'OnGoing'),
              Tab(text: 'Create'),
              Tab(text: 'Upcoming'),
              Tab(text: 'Past'),
              Tab(text: 'Search'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            EventsList(
              category: 'OnGoing Events',
              type: "ongoing",
              eventLists: ongoingEvents,
            ),
            CreateEvent(
              gameId: widget.gameId,
            ), // Create Events tab
            EventsList(
              category: 'Upcoming Events',
              type: "upcoming",
              eventLists: upcommingEvents,
            ),
            EventsList(
              category: 'Past Events',
              type: "past",
              eventLists: pastEvents,
            ),
            SearchEvent(
              gameId: widget.gameId,
            ), // Search tab
          ],
        ),
      ),
    );
  }
}
