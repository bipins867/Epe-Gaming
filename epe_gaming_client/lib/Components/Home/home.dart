import 'package:epe_gaming_client/Components/Home/Announcement/announcement.dart';
import 'package:epe_gaming_client/Components/Home/Categories/categories.dart';
import 'package:epe_gaming_client/Components/Home/ImageSlider/imageSlider.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Marquee Announcement
            // Marquee Announcement in a Card
            Announcement(),
            SizedBox(height: 10),

            // Image Slider

            ImageSlider(),
            SizedBox(height: 20),

            // Category Section
            Categories(),
          ],
        ),
      ),
    );
  }
}
