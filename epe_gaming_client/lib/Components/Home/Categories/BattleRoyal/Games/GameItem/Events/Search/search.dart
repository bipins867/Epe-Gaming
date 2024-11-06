import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class SearchEvent extends StatefulWidget {
  final String gameId;
  const SearchEvent({super.key, required this.gameId});

  @override
  _SearchEventState createState() => _SearchEventState();
}

class _SearchEventState extends State<SearchEvent> {
  final TextEditingController _searchController = TextEditingController();
  Map<String, dynamic>? _filteredEvent; // List of event info maps

  @override
  void initState() {
    super.initState();
  }

  Future<void> _searchEvents() async {
    String eventId = '';
    if (_searchController.text == '') {
      return;
    }
    eventId = _searchController.text;

    try {
      Map<String, dynamic> payload = {
        "GameId": widget.gameId,
        "eventId": eventId
      };

      dynamic response =
          await postRequestWithToken('user/events/searchEvent', payload);

      if (response['statusCode'] == 200) {
        //setState(() {});
        setState(() {
          _filteredEvent = response['body']['event'];
          print(_filteredEvent);
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
            _filteredEvent == null
                ? Center(
                    child: Text(
                      'No Event found.',
                      style: TextStyle(fontSize: 18),
                    ),
                  )
                : EventCard(eventInfo: _filteredEvent!),
          ],
        ),
      ),
    );
  }
}
