import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:flutter/material.dart';

// Widget for displaying the event list based on the category
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
    // Check if the list is empty and display a message if it is
    if (eventLists == null || eventLists!.isEmpty) {
      return Center(
        child: Text(
          "No records found",
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: eventLists!.length,
      itemBuilder: (context, index) {
        dynamic eventInfo = eventLists![index];

        eventInfo = eventInfo as Map<String, dynamic>;

        return EventCard(eventInfo: eventInfo);
      },
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
