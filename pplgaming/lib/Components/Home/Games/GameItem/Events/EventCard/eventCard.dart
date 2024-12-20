import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/eventDetails.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class EventCard extends StatelessWidget {
  final Map<String, dynamic> eventInfo;

  const EventCard({
    super.key,
    required this.eventInfo,
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
            // Title at the top with a join status indicator

            _buildTitleWithJoinStatus(
                eventInfo['tittle'], eventInfo['isUserJoined']),
            const SizedBox(height: 16),

            // Row layout for Start, Close, and Match Start times
            _buildTimeRow('Registration Start:', eventInfo['regStartTime']),
            _buildTimeRow('Registration Close:', eventInfo['regCloseTime']),
            _buildTimeRow('Match Start:', eventInfo['startTime']),

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
                _buildDetailItem(
                    'Prize Pool 1', '🪙${eventInfo['prizePool_1']}'),
                _buildDetailItem('Per Kill', '🪙${eventInfo['perKill']}'),
                _buildDetailItem('Entry Fee', '🪙${eventInfo['entryFee']}'),
                _buildDetailItem('Squad Type', eventInfo['squadType']),
                _buildDetailItem('Version', eventInfo['version']),
                _buildDetailItem('Map', eventInfo['map']),
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
                        return EventDetailsPage(
                          eventInfo: eventInfo,
                        );
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

  // Helper method to build the title with join status indicator
  Widget _buildTitleWithJoinStatus(String? title, bool? isUserJoined) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Text(
            title ?? 'No Title Available',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        // Icon to indicate if user has joined
        if (isUserJoined == true)
          const Icon(
            Icons.check_circle,
            color: Colors.green,
            size: 20,
          ),
      ],
    );
  }

  // Helper method to build each time row with null-checker for 'N/A'
  Widget _buildTimeRow(String title, String? value) {
    final dateTime = _formatDateTime(value);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 14, color: Colors.grey),
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                dateTime['date'] ?? 'N/A',
                style:
                    const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(width: 10),
              Text(
                dateTime['time'] ?? 'N/A',
                style:
                    const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // Helper method to format the date-time string into separate date and time
  Map<String, String?> _formatDateTime(String? dateTime) {
    if (dateTime == null) {
      return {'date': null, 'time': null};
    }
    try {
      DateTime parsedDate = DateTime.parse(dateTime);
      String formattedDate =
          DateFormat('yyyy-MM-dd').format(parsedDate); // Format Date
      String formattedTime =
          DateFormat('hh:mm a').format(parsedDate); // Format Time in AM/PM
      return {'date': formattedDate, 'time': formattedTime}; // Return as a Map
    } catch (e) {
      return {'date': 'Invalid Date', 'time': null};
    }
  }

  // Helper method to build each item in the grid with null-checker for 'N/A'
  Widget _buildDetailItem(String title, dynamic value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ),
        const SizedBox(height: 4),
        Text(
          '${value ?? 'N/A'}',
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}
