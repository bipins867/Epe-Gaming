import 'package:pplgaming/Components/Home/Games/GameItem/Events/events.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/ImageSlider/imageSlider.dart';
import 'package:flutter/material.dart';

class GameItem extends StatelessWidget {
  final String gameId;
  final String gameTitle;

  const GameItem({super.key, required this.gameId, required this.gameTitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(gameTitle),
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                'assets/Background/bgmi.jpg'), // Your background image path
            fit: BoxFit.cover, // Ensures the image covers the whole screen
            opacity:
                0.5, // Optional: You can set the opacity if you want the content to stand out more
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: ListView(
            children: [
              GameItemImageSlider(),
              SizedBox(height: 10),
              Events(
                gameId: gameId,
                gameTitle: gameTitle,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
