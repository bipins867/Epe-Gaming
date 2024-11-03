import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/events.dart';
import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/ImageSlider/imageSlider.dart';
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
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            GameItemImageSlider(),
            SizedBox(
              height: 10,
            ),
            Events(
              gameId: gameId,
              gameTitle: gameTitle,
            )
          ],
        ),
      ),
    );
  }
}
