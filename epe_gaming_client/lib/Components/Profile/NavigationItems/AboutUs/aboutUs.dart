import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class AboutUsPage extends StatelessWidget {
  const AboutUsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About Us'),
      ),
      body: SingleChildScrollView(
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
                    'Pro Player League',
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
                  'Version: ${AppConfig.appVersion}',
                  style: TextStyle(fontSize: 16),
                ),
                Text(
                  'Last Updated: ${AppConfig.appUpdateDate}',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
                Divider(thickness: 1.2),
                SizedBox(height: 20),
                Text(
                  'ABOUT US',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'The most reliable eSport app For Indian users!\n\nFounded in 2023 with a single mission to provide a world-class online eSport experience to online gaming enthusiasts out there. It is the most steadfast app any online gaming fanatic can rely on.',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
                Text(
                  'Our Vision',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  '“A strong vision and mission lead you to your intended destination.\n\nOur vision is to make online gaming supercool, thrilling, and winning experience for eSport fans. The eSports industry is booming, and Pro Play League (PPL) is unfurling the magic of online gaming across India.”',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 20),
                Text(
                  'Who We Are',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                RichText(
                  text: TextSpan(
                    style: TextStyle(
                        fontSize: 16,
                        color: Colors.black), // Default text style
                    children: [
                      TextSpan(
                        text:
                            'PPL is an Ultimate Solution to all your eSports Games.\n\nPPL is an Online Portal which Offers Rewards and Unlimited Entertainment for Participating and Playing Games Online. Users can play online multiple games like ',
                      ),
                      TextSpan(
                        text: 'Battlegrounds Mobile India (BGMI)',
                        style: TextStyle(
                            color: Colors.green, fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ', ',
                      ),
                      TextSpan(
                        text: 'Free Fire',
                        style: TextStyle(
                            color: Colors.red, fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ', ',
                      ),
                      TextSpan(
                        text: 'Call Of Duty Mobile',
                        style: TextStyle(
                            color: Colors.blue, fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text:
                            ', etc. and Earn Rewards and Prizes based on their in-game performance.\n\nFounded on 3rd Day of July 2023, by ',
                      ),
                      TextSpan(
                        text: 'Founder Mr. Sanjay Singhania',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ' and ',
                      ),
                      TextSpan(
                        text: 'Co-Founder Mrs. Sandhya',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ' and was developed by two young minds ',
                      ),
                      TextSpan(
                        text: 'Mr. Bipin Singh',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ' & ',
                      ),
                      TextSpan(
                        text: 'Mr. Alok Prajapati',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                        text: ' from Uttar Pradesh, India!',
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  'What We Offer',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'You might be addicted to Online Games but just think what if you can start making money or living by Playing Mobile Games? Well, this is what PPL Offers. Users can participate in the upcoming eSports games and Win Amazing Prizes and Rewards.\n\nParticipate in the Tournaments of Games like Free Fire, Call of Duty Mobile, Fortnite, Battlegrounds Mobile India etc. and Earn Huge Rewards Daily. Users can join Custom Rooms, and Get Rewards for Chicken Dinner and also for each Kill they Score. Sounds cool, huh?? Give it a try!',
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
