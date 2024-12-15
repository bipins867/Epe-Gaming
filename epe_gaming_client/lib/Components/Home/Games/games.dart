import 'package:epe_gaming_client/Components/Home/Games/GameItem/gameItem.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:flutter/material.dart';

class Games extends StatelessWidget {
  const Games({super.key});

  @override
  Widget build(BuildContext context) {
    final games = [
      "BGMI",
      "Free Fire Max",
      "Call of Duty",
      "Valorant",
      "PUBG PC",
      "PUBG New State"
    ];
    final images = [
      "assets/BattleRoyal/bgmi.jpg",
      "assets/BattleRoyal/freefire.jpg",
      "assets/BattleRoyal/cod.jpg",
      "assets/BattleRoyal/valorant.jpg",
      "assets/BattleRoyal/pubgpc.jpg",
      "assets/BattleRoyal/newstate.png",
    ];
    final functions = [
      () {
        Navigator.of(context).push(
          MaterialPageRoute(
              builder: (context) => const GameItem(
                    gameId: '1',
                    gameTitle: 'BGMI',
                  )),
        );
      },
      () {
        showInfoAlertDialog(context, "Comming Soon!");
      },
      () {
        showInfoAlertDialog(context, "Comming Soon!");
      },
      () {
        showInfoAlertDialog(context, "Comming Soon!");
      },
      () {
        showInfoAlertDialog(context, "Comming Soon!");
      },
      () {
        showInfoAlertDialog(context, "Comming Soon!");
      },
    ];
    return Container(
      decoration: BoxDecoration(
        color:
            Colors.white.withOpacity(0.7), // Semi-transparent dark background
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          const Text(
            "All Games",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 10,
              childAspectRatio: 1,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: 6, // Number of games
            itemBuilder: (context, index) {
              return _buildGameCard(games[index], images[index],
                  callbackFunc: functions[index]);
            },
          )
        ],
      ),
    );
  }

  Widget _buildGameCard(String title, String imagePath,
      {VoidCallback? callbackFunc}) {
    return InkWell(
      onTap: callbackFunc,
      child: Card(
        elevation: 4,
        margin: const EdgeInsets.all(8), // Added margin for game cards
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          children: [
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.asset(
                  imagePath,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
