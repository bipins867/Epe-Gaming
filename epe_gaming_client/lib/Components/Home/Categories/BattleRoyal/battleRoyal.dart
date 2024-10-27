import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/games.dart';
import 'package:flutter/material.dart';

class BattleRoyal extends StatelessWidget {
  const BattleRoyal({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BattleRoyal'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Games',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Games(),
          ],
        ),
      ),
    );
  }
}
