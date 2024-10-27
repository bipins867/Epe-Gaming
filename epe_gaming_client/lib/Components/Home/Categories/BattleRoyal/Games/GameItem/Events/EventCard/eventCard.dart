import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/EventDetails/eventDetails.dart';
import 'package:flutter/material.dart';

class EventCard extends StatelessWidget {
  final String title;
  final String eventId;
  final String regStartTime;
  final String regCloseTime;
  final String matchStartTime;
  final String prizePool;
  final String perKill;
  final String entryFee;
  final String squadType;
  final String version;
  final String map;

  const EventCard({
    super.key,
    required this.title,
    required this.eventId,
    required this.regStartTime,
    required this.regCloseTime,
    required this.matchStartTime,
    required this.prizePool,
    required this.perKill,
    required this.entryFee,
    required this.squadType,
    required this.version,
    required this.map,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title at the top
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            // Row layout for Start, Close, and Match Start times
            _buildTimeRow('Registration Start:', regStartTime),
            _buildTimeRow('Registration Close:', regCloseTime),
            _buildTimeRow('Match Start:', matchStartTime),

            const SizedBox(height: 16),

            // Grid layout for other event details
            GridView.count(
              crossAxisCount: 3,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              childAspectRatio: 1.5,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              children: [
                _buildDetailItem('Prize Pool', prizePool),
                _buildDetailItem('Per Kill', perKill),
                _buildDetailItem('Entry Fee', entryFee),
                _buildDetailItem('Squad Type', squadType),
                _buildDetailItem('Version', version),
                _buildDetailItem('Map', map),
              ],
            ),

            const SizedBox(height: 16),

            // View More button at the bottom right
            Align(
              alignment: Alignment.bottomRight,
              child: TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) {
                        return EventDetailsPage();
                      },
                    ),
                  );
                },
                child: const Text(
                  'View More',
                  style: TextStyle(color: Colors.blue),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helper method to build each time row
  Widget _buildTimeRow(String title, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 14, color: Colors.grey),
          ),
          Text(
            value,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  // Helper method to build each item in the grid
  Widget _buildDetailItem(String title, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}
