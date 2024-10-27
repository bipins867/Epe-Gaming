import 'package:flutter/material.dart';

class AboutUsPage extends StatelessWidget {
  const AboutUsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About Us'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 4,
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text(
                    'EPE Gaming',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueAccent,
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  'App Information',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Version: 1.0.0',
                  style: TextStyle(fontSize: 16),
                ),
                Text(
                  'Last Updated: October 2024',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
                Divider(thickness: 1.2),
                SizedBox(height: 20),
                Text(
                  'About EPE Gaming',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'EPE Gaming is dedicated to bringing competitive gaming to a larger audience. Our platform organizes and sponsors esports tournaments for popular games such as BGMI, FreeFire, and Call of Duty. We aim to create a community where gamers can test their skills, compete for prizes, and be recognized in the esports community.',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
                Text(
                  'Tournaments and Sponsorships',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Through our tournaments, players of all levels can participate in well-organized competitions. EPE Gaming actively sponsors these events, providing opportunities for gamers to showcase their talents and connect with sponsors and teams.',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
