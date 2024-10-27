import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventCard/eventCard.dart';
import 'package:flutter/material.dart';

// Widget for displaying the event list based on the category
class EventsList extends StatelessWidget {
  final String category;
  final String type;

  const EventsList({super.key, required this.category, required this.type});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Placeholder for events, can be replaced with actual event data

        EventCard(
            title: "Title of the Event!",
            eventId: 'AXFFERT',
            regStartTime: "12/03/34-12:35",
            regCloseTime: "12/03/34-12:35",
            matchStartTime: "12/03/34-12:35",
            prizePool: "\$100",
            perKill: "\$5",
            entryFee: "\$10",
            squadType: "4",
            version: "TPP",
            map: "Erangle"),
        EventCard(
            title: "100 v 1",
            eventId: 'AXFFERT',
            regStartTime: "12/03/34-12:35",
            regCloseTime: "12/03/34-12:35",
            matchStartTime: "12/03/34-12:35",
            prizePool: "\$100",
            perKill: "\$5",
            entryFee: "\$10",
            squadType: "4",
            version: "TPP",
            map: "Erangle"),
        EventCard(
            title: "100 v 1",
            eventId: 'AXFFERT',
            regStartTime: "12/03/34-12:35",
            regCloseTime: "12/03/34-12:35",
            matchStartTime: "12/03/34-12:35",
            prizePool: "\$100",
            perKill: "\$5",
            entryFee: "\$10",
            squadType: "4",
            version: "TPP",
            map: "Erangle"),
      ],
    );
  }

  Widget _buildEventCard(BuildContext context,
      {required String title, required String description}) {
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
