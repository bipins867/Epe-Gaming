import 'package:flutter/material.dart';
import 'package:marquee/marquee.dart';

class Announcement extends StatelessWidget {
  const Announcement({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(
          horizontal: 10, vertical: 10), // Margin for the card
      elevation: 4, // Elevation for shadow effect
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10)), // Rounded corners
      child: Container(
        height: 30, // Increased height for better visibility
        color: Colors.blueAccent,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        alignment: Alignment.centerLeft,
        child: Marquee(
          text: '🚨 Pro Play League Welcomes you! 🚨',
          style: TextStyle(fontSize: 20, color: Colors.white),
          scrollAxis: Axis.horizontal,
          crossAxisAlignment: CrossAxisAlignment.start,
          blankSpace: 20.0,
          velocity: 50.0,
          pauseAfterRound: Duration(seconds: 1),
          startAfter: Duration(seconds: 0),
          accelerationDuration: Duration(seconds: 1),
          accelerationCurve: Curves.linear,
        ),
      ),
    );
  }
}
