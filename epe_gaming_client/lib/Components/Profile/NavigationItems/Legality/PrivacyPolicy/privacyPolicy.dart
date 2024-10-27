import 'package:flutter/material.dart';

class PrivacyPolicyPage extends StatelessWidget {
  const PrivacyPolicyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Privacy Policy',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(
              '1. Introduction\n\n'
              'Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your information...',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              '2. Information We Collect\n\n'
              'We collect information to provide better services to our users...',
              style: TextStyle(fontSize: 16),
            ),
            // Add more privacy policy sections as needed
          ],
        ),
      ),
    );
  }
}
