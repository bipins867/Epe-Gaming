import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventList/eventList.dart';
import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/Search/search.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class Hosted extends StatefulWidget {
  final String gameId;
  const Hosted({super.key, required this.gameId});

  @override
  State<Hosted> createState() => _HostedState();
}

class _HostedState extends State<Hosted> {
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
      dynamic response = await postRequestWithToken('user/events/getEventsList',
          {"GameId": widget.gameId, "eventType": "hosted"});

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
        body: TabBarView(
          children: [
            // Each of these widgets represents a page for the respective tab
            EventsList(
              category: 'OnGoing Events',
              type: "ongoing",
              eventLists: ongoingEvents,
            ), // Ongoing Events tab
            EventsList(
              category: 'Upcoming Events',
              type: "upcoming",
              eventLists: upcommingEvents,
            ), // Upcoming Events tab
            EventsList(
              category: 'Past Events',
              type: "past",
              eventLists: pastEvents,
            ),

            SearchEvent(
              gameId: widget.gameId,
            ) // Past Events tab
          ],
        ),
      ),
    );
  }
}
