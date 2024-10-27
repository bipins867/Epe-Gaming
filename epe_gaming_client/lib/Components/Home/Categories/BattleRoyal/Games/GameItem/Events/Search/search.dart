import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:flutter/material.dart';

class SearchEvent extends StatefulWidget {
  const SearchEvent({super.key});

  @override
  _SearchEventState createState() => _SearchEventState();
}

class _SearchEventState extends State<SearchEvent> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _events = []; // This will hold the event data
  List<String> _filteredEvents = []; // This will hold the filtered results

  void _searchEvents() {
    // Simulated event list (you would typically fetch this from an API)
    List<String> allEvents = [
      'BGMI Tournament',
      'Free Fire Challenge',
      'Call of Duty League',
      'Valorant Showdown',
      'FIFA 22 Cup',
    ];

    // Filtering events based on the search input
    setState(() {
      _filteredEvents = allEvents
          .where((event) => event
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
                labelText: 'Enter event Id',
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
                        return EventCard(
                            title: _filteredEvents[index],
                            eventId: 'AXFFERT',
                            regStartTime: "12/03/34-12:35",
                            regCloseTime: "12/03/34-12:35",
                            matchStartTime: "12/03/34-12:35",
                            prizePool: "\$100",
                            perKill: "\$5",
                            entryFee: "\$10",
                            squadType: "4",
                            version: "TPP",
                            map: "Erangle");
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
