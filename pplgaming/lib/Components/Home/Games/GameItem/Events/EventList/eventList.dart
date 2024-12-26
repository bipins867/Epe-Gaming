import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:flutter/material.dart';

class EventsList extends StatelessWidget {
  final String category;
  final String type;
  final List? eventLists;

  const EventsList({
    super.key,
    required this.category,
    required this.type,
    required this.eventLists,
  });

  @override
  Widget build(BuildContext context) {
    // If eventLists is null or empty, show a message with the background image
    if (eventLists == null || eventLists!.isEmpty) {
      return Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                "assets/Background/bgmi-event.jpg"), // Background image
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: Container(
            padding: const EdgeInsets.all(16),
            // ignore: deprecated_member_use
            color: Colors.black.withOpacity(
                0.5), // Semi-transparent background for text visibility
            child: Text(
              "No records found",
              style: TextStyle(
                  fontSize: 18,
                  color: Colors.white), // White text for visibility
            ),
          ),
        ),
      );
    }

    // If eventLists is not null, display the events
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage(
              "assets/Background/bgmi-event.jpg"), // Background image
          fit: BoxFit.cover,
        ),
      ),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: eventLists!.length,
        itemBuilder: (context, index) {
          dynamic eventInfo = eventLists![index];
          eventInfo = eventInfo as Map<String, dynamic>;
          return EventCard(eventInfo: eventInfo);
        },
      ),
    );
  }
}
