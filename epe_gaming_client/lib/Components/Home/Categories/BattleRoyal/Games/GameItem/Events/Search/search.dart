import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:flutter/material.dart';

class SearchEvent extends StatefulWidget {
  const SearchEvent({super.key});

  @override
  _SearchEventState createState() => _SearchEventState();
}

class _SearchEventState extends State<SearchEvent> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _filteredEvents = []; // List of event info maps

  void _searchEvents() {
    // Simulated event list with each event as a Map<String, dynamic>
    List<Map<String, dynamic>> allEvents = [
      {
        'title': 'BGMI Tournament',
        'eventId': 'AXFFERT',
        'regStartTime': '12/03/34-12:35',
        'regCloseTime': '12/03/34-12:35',
        'matchStartTime': '12/03/34-12:35',
        'prizePool': '\$100',
        'perKill': '\$5',
        'entryFee': '\$10',
        'squadType': '4',
        'version': 'TPP',
        'map': 'Erangle',
      },
      {
        'title': 'Free Fire Challenge',
        'eventId': 'AXFFERT',
        'regStartTime': '12/03/34-12:35',
        'regCloseTime': '12/03/34-12:35',
        'matchStartTime': '12/03/34-12:35',
        'prizePool': '\$100',
        'perKill': '\$5',
        'entryFee': '\$10',
        'squadType': '4',
        'version': 'TPP',
        'map': 'Erangle',
      },
      {
        'title': 'Call of Duty League',
        'eventId': 'AXFFERT',
        'regStartTime': '12/03/34-12:35',
        'regCloseTime': '12/03/34-12:35',
        'matchStartTime': '12/03/34-12:35',
        'prizePool': '\$100',
        'perKill': '\$5',
        'entryFee': '\$10',
        'squadType': '4',
        'version': 'TPP',
        'map': 'Erangle',
      },
      {
        'title': 'Valorant Showdown',
        'eventId': 'AXFFERT',
        'regStartTime': '12/03/34-12:35',
        'regCloseTime': '12/03/34-12:35',
        'matchStartTime': '12/03/34-12:35',
        'prizePool': '\$100',
        'perKill': '\$5',
        'entryFee': '\$10',
        'squadType': '4',
        'version': 'TPP',
        'map': 'Erangle',
      },
      {
        'title': 'FIFA 22 Cup',
        'eventId': 'AXFFERT',
        'regStartTime': '12/03/34-12:35',
        'regCloseTime': '12/03/34-12:35',
        'matchStartTime': '12/03/34-12:35',
        'prizePool': '\$100',
        'perKill': '\$5',
        'entryFee': '\$10',
        'squadType': '4',
        'version': 'TPP',
        'map': 'Erangle',
      },
    ];

    // Filtering events based on the search input
    setState(() {
      _filteredEvents = allEvents
          .where((event) => event['title']
              .toString()
              .toLowerCase()
              .contains(_searchController.text.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: 'Enter event id',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: _searchEvents,
              child: Text('Search'),
            ),
            SizedBox(height: 20),
            Expanded(
              child: _filteredEvents.isEmpty
                  ? Center(
                      child: Text(
                        'No records found.',
                        style: TextStyle(fontSize: 18),
                      ),
                    )
                  : ListView.builder(
                      itemCount: _filteredEvents.length,
                      itemBuilder: (context, index) {
                        final eventInfo = _filteredEvents[index];
                        return EventCard(eventInfo: eventInfo);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
