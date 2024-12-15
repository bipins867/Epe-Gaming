import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventCard/eventCard.dart';
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
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                "assets/Background/bgmi-search.jpg"), // Background image
            fit: BoxFit.cover, // Cover the entire screen with the image
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Input field with a semi-transparent background
              Container(
                padding:
                    const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
                decoration: BoxDecoration(
                  color: Colors.black
                      .withOpacity(0.5), // Semi-transparent background
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    labelText: 'Enter event id',
                    border: InputBorder.none, // Remove the default border
                    hintStyle:
                        TextStyle(color: Colors.white), // Hint text color
                    labelStyle:
                        TextStyle(color: Colors.white), // Label text color
                  ),
                  style: TextStyle(color: Colors.white), // Text color
                ),
              ),
              SizedBox(height: 10),
              ElevatedButton(
                onPressed: _searchEvents,
                child: Text('Search'),
              ),
              SizedBox(height: 20),
              // No records found with a semi-transparent background for text visibility
              _filteredEvent == null
                  ? Center(
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        color: Colors.black.withOpacity(
                            0.5), // Semi-transparent background for text
                        child: Text(
                          'No Event found.',
                          style: TextStyle(
                              fontSize: 18,
                              color: Colors.white), // White text for visibility
                        ),
                      ),
                    )
                  : EventCard(eventInfo: _filteredEvent!),
            ],
          ),
        ),
      ),
    );
  }
}
