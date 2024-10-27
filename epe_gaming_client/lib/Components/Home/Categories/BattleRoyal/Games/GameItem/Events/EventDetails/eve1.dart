import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class EventDetailsPage extends StatelessWidget {
  const EventDetailsPage({
    Key? key,
  }) : super(key: key);

  void _copyToClipboard(BuildContext context, String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Copied to clipboard: $text')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Title"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Event Details',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text('Wallet Balance: \$500.00', style: TextStyle(fontSize: 16)),
            SizedBox(height: 20),

            // Event ID with Copy Button
            Row(
              children: [
                Expanded(
                    child: _buildCopyField(context, 'Event ID', 'EVT12345')),
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
                'Join the ultimate BGMI Invitational event with a grand prize pool. Top teams across the nation will compete for glory and rewards.',
                style: TextStyle(fontSize: 16)),
            SizedBox(height: 20),

            // Event Timings
            _buildDetailTimeItem(
                '2024-10-10 10:00', '2024-10-10 10:00', '2024-10-10 10:00'),
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
                _buildDetailItem('Prize Pool', '₹50,000'),
                _buildDetailItem('Per Kill', '₹100'),
                _buildDetailItem('Entry Fee', '₹500'),
                _buildDetailItem('Squad Type', 'Squad'),
                _buildDetailItem('Version', 'TPP'),
                _buildDetailItem('Map', 'Erangel'),
                _buildDetailItem('No. of Players', '100'),
                _buildDetailItem('Team Length', '4'),
                _buildDetailItem('Prize Pool 1', '₹25,000'),
                _buildDetailItem('Prize Pool 2', '₹15,000'),
                _buildDetailItem('Prize Pool 3', '₹10,000'),
                _buildDetailItem('Status', 'Open'),
                _buildDetailItem('Public Event', 'No'),
              ],
            ),
            SizedBox(height: 20),

            // Room Information with Copy Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCopyField(context, 'Room ID', 'ROOM123'),
                _buildCopyField(context, 'Room Password', 'PASS123'),
              ],
            ),
            SizedBox(height: 30),

            // Join Event and Play Now Buttons
            Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Handle Join Event action
                    },
                    child: Text('Join Event'),
                  ),
                  SizedBox(height: 10),
                  ElevatedButton(
                    onPressed: () {
                      // Handle Play Now action
                    },
                    child: Text('Play Now'),
                  ),
                ],
              ),
            ),
          ],
        ),
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
            Text(
              label,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
            ),
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
          Text(
            label,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
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
