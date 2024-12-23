import 'package:pplgaming/Components/Home/Games/GameItem/Events/Hosted/hosted.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/PlayerGameInfo/playerGameInfo.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:flutter/material.dart';

class Events extends StatelessWidget {
  final String gameTitle;
  final String gameId;
  const Events({super.key, required this.gameId, required this.gameTitle});

  @override
  Widget build(BuildContext context) {
    return ListView(
      shrinkWrap: true, // Helps avoid layout issues when nested
      children: [
        _buildInfoCard(
          context,
          icon: Icons.person,
          title: 'Add/Update Player Id',
          description: 'Add or update player Id of this game',
          callbackFunc: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                  builder: (context) => PlayerGameInfoPage(
                        gameTitle: gameTitle,
                        gameId: gameId,
                      )),
            );
          },
        ),
        SizedBox(
          height: 30,
        ),
        _buildInfoCard(
          context,
          icon: Icons.videogame_asset,
          title: 'Hosted',
          description:
              'The server hosts events with various challenges and rewards.',
          callbackFunc: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                  builder: (context) => Hosted(
                        gameId: gameId,
                      )),
            );
          },
        ),
        _buildInfoCard(context,
            icon: Icons.group,
            title: 'Challenge',
            description:
                'Users can join or host an event created by other users. Compete to be the best!',
            callbackFunc: () {
          showInfoAlertDialog(context, "Comming Soon!");
        }),
        _buildInfoCard(context,
            icon: Icons.business,
            title: 'Sponsored',
            description:
                'Sponsored events are hosted by partner companies with exclusive rewards.',
            callbackFunc: () {
          showInfoAlertDialog(context, "Comming Soon!");
        }),
      ],
    );
  }

  Widget _buildInfoCard(BuildContext context,
      {required IconData icon,
      required String title,
      required String description,
      VoidCallback? callbackFunc}) {
    return GestureDetector(
      onTap: callbackFunc,
      child: Card(
        elevation: 4,
        margin: const EdgeInsets.symmetric(vertical: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Icon(icon, size: 40, color: Colors.blueAccent),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.black54,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
