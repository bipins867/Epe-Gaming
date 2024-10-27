import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/Events/events.dart';
import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/ImageSlider/imageSlider.dart';
import 'package:flutter/material.dart';

class GameItem extends StatelessWidget {
  const GameItem({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BGMI'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            GameItemImageSlider(),
            SizedBox(
              height: 10,
            ),
            Events()
          ],
        ),
      ),
    );
  }
}
