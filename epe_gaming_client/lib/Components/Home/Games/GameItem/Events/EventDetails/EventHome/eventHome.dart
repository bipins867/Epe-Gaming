import 'package:epe_gaming_client/Components/Home/Games/GameItem/Events/EventDetails/JoinTeam/joinTeam.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart'; // Import the intl package for date formatting

class EventDetailsHome extends StatelessWidget {
  final Map<String, dynamic> eventInfo;
  const EventDetailsHome({super.key, required this.eventInfo});

  void _copyToClipboard(BuildContext context, String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Copied to clipboard: $text')),
    );
  }

  String _formatDateTime(String dateTime) {
    DateTime parsedDate = DateTime.parse(dateTime);
    return DateFormat('yyyy-MM-dd HH:mm').format(parsedDate);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Event ID with Copy Button
          Row(
            children: [
              _buildCopyField(context, 'Event ID', eventInfo['eventId']),
            ],
          ),
          SizedBox(height: 10),

          // Event Description
          Text(
            'Description',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 5),
          Text(
            eventInfo['description'],
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 20),

          // Event Timings
          _buildDetailTimeItem(
            _formatDateTime(eventInfo['regStartTime']),
            _formatDateTime(eventInfo['regCloseTime']),
            _formatDateTime(eventInfo['startTime']),
          ),
          SizedBox(height: 20),

          // Event Info in 3x3 grid
          GridView.count(
            crossAxisCount: 3,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            childAspectRatio: 1.5,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            children: [
              _buildDetailItem(
                  'Prize Pool 1', '🪙${eventInfo['prizePool_1'] ?? 0}'),
              _buildDetailItem(
                  'Prize Pool 2', '🪙${eventInfo['prizePool_2'] ?? 0}'),
              _buildDetailItem(
                  'Prize Pool 3', '🪙${eventInfo['prizePool_3'] ?? 0}'),
              _buildDetailItem('Per Kill', '🪙${eventInfo['perKill'] ?? 0}'),
              _buildDetailItem('Entry Fee', '🪙${eventInfo['entryFee'] ?? 0}'),
              _buildDetailItem('Squad Type', eventInfo['squadType'].toString()),
              _buildDetailItem('Version', eventInfo['version']),
              _buildDetailItem('Map', eventInfo['map']),
              _buildDetailItem(
                  'No. of Players', eventInfo['noOfPlayers'].toString()),
              _buildDetailItem('Status', eventInfo['status']),
              _buildDetailItem(
                  'Public Event', eventInfo['isPublic'] ? 'Yes' : 'No'),
              _buildDetailItem(
                  'Joined', eventInfo['isUserJoined'] ? 'Yes' : 'No'),
            ],
          ),
          SizedBox(height: 20),

          // Room Information with Copy Buttons
          if (eventInfo['roomId'] != null) ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCopyField(
                    context, 'Room ID', eventInfo['roomId'] ?? 'N/A'),
                _buildCopyField(context, 'Room Password',
                    eventInfo['roomPassword'] ?? 'N/A'),
              ],
            ),
            SizedBox(height: 30),
          ],

          // Join Event and Play Now Buttons
          Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                if (!eventInfo['isUserJoined'])
                  ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                            builder: (context) => JoinTeamPage(
                                  eventId: eventInfo['eventId'],
                                )),
                      );
                    },
                    child: Text('Join Event'),
                  ),

                // ElevatedButton(
                //   onPressed: () {},
                //   child: Text('Play Now'),
                // ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailTimeItem(
      String regStartTime, String regCloseTime, String matchStartTime) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Registration Start',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(regStartTime, style: TextStyle(fontSize: 16)),
              ],
            ),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Registration Close',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(regCloseTime, style: TextStyle(fontSize: 16)),
              ],
            ),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Match Start',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(matchStartTime, style: TextStyle(fontSize: 16)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailItem(String label, String value) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(label,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            SizedBox(height: 5),
            Text(value, style: TextStyle(fontSize: 12)),
          ],
        ),
      ),
    );
  }

  Widget _buildCopyField(BuildContext context, String label, String value) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          SizedBox(height: 5),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: TextEditingController(text: value),
                  readOnly: true,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    isDense: true,
                  ),
                ),
              ),
              IconButton(
                icon: Icon(Icons.copy),
                onPressed: () => _copyToClipboard(context, value),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
