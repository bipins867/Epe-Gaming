import 'package:epe_gaming_client/Components/Home/Categories/BattleRoyal/Games/GameItem/gameItem.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:flutter/material.dart';

class Games extends StatelessWidget {
  const Games({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: [
        _buildGameCard('BGMI', 'assets/BattleRoyal/BGMI/bgmi.jpg',
            callbackFunc: () {
          Navigator.of(context).push(
            MaterialPageRoute(
                builder: (context) => const GameItem(
                      gameId: '1',
                      gameTitle: 'BGMI',
                    )),
          );
        }),
        _buildGameCard('Free Fire', 'assets/BattleRoyal/FreeFire/freefire.jpg',
            callbackFunc: () {
          showInfoAlertDialog(context, "Comming Soon!");
        }),
        _buildGameCard('Call of Duty', 'assets/BattleRoyal/COD/cod.jpg',
            callbackFunc: () {
          showInfoAlertDialog(context, "Comming Soon!");
        }),
      ],
    );
  }

  Widget _buildGameCard(String title, String imagePath,
      {VoidCallback? callbackFunc}) {
    return GestureDetector(
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
