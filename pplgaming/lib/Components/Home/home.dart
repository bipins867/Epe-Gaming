import 'package:pplgaming/Components/Home/Announcement/announcement.dart';
import 'package:pplgaming/Components/Home/Games/games.dart';
import 'package:pplgaming/Components/Home/ImageSlider/imageSlider.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox.expand(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                  "assets/Background/background-v1.jpg"), // Background image
              fit: BoxFit.cover,
            ),
          ),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .stretch, // Make content stretch to full width
              children: [
                // Marquee Announcement in a Card
                Announcement(),
                const SizedBox(height: 10),

                // Image Slider
                ImageSlider(),
                const SizedBox(height: 20),

                // Category Section
                Games(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
