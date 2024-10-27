import 'package:flutter/material.dart';

class NotificationsPage extends StatelessWidget {
  final List<Map<String, String>> notifications = [
    {
      'title': 'Team Registration Opened',
      'message': 'You can now register your team for the upcoming tournament.',
      'dateTime': '2024-10-27 10:00 AM',
    },
    {
      'title': 'Match Schedule Released',
      'message': 'The match schedule for the tournament has been released.',
      'dateTime': '2024-10-26 05:30 PM',
    },
    {
      'title': 'New Update Available',
      'message':
          'A new version of the app is available. Please update for new features.',
      'dateTime': '2024-10-25 03:00 PM',
    },
    {
      'title': 'Team Selection Reminder',
      'message': 'Please select your team members by the end of the day.',
      'dateTime': '2024-10-24 12:00 PM',
    },
    {
      'title': 'Payment Successful',
      'message': 'Your payment for the team registration has been successful.',
      'dateTime': '2024-10-23 09:15 AM',
    },
  ];

  NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifications'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: notifications.length,
          itemBuilder: (context, index) {
            return Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8.0),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      notifications[index]['title']!,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      notifications[index]['message']!,
                      style: TextStyle(fontSize: 16),
                    ),
                    SizedBox(height: 8),
                    Align(
                      alignment: Alignment.bottomRight,
                      child: Text(
                        notifications[index]['dateTime']!,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
