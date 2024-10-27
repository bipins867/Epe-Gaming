import 'package:flutter/material.dart';

class TermsAndConditionsPage extends StatelessWidget {
  const TermsAndConditionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Terms and Conditions',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(
              '1. Introduction\n\n'
              'Welcome to the EPE Gaming app. By accessing or using our app, you agree to comply with and be bound by these Terms and Conditions...',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              '2. Use of Services\n\n'
              'You agree to use the services for lawful purposes only...',
              style: TextStyle(fontSize: 16),
            ),
            // Add more terms and conditions sections as needed
          ],
        ),
      ),
    );
  }
}
