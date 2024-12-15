import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventCard/eventCard.dart';
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

  Widget _buildEventCard(
    BuildContext context, {
    required String title,
    required String description,
  }) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: const TextStyle(fontSize: 14, color: Colors.black54),
            ),
          ],
        ),
      ),
    );
  }
}
