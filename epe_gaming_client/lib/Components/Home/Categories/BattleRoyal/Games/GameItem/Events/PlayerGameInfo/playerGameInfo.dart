import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class PlayerGameInfoPage extends StatefulWidget {
  final String gameTitle;
  final String gameId; // Example: "BGMI"

  const PlayerGameInfoPage(
      {super.key, required this.gameTitle, required this.gameId});

  @override
  _PlayerGameInfoPageState createState() => _PlayerGameInfoPageState();
}

class _PlayerGameInfoPageState extends State<PlayerGameInfoPage> {
  final TextEditingController _inGameIdController = TextEditingController();
  final TextEditingController _inGameNameController = TextEditingController();
  AppConfig? appConfig;
  CustomLogger? customLogger;

  @override
  void initState() {
    appConfig = AppConfig();
    customLogger = CustomLogger();
    _fetchPlayerInfo();
    // TODO: implement initState
    super.initState();
  }

  Future<void> _fetchPlayerInfo() async {
    try {
      dynamic response = await postRequestWithToken(
          'user/events/getUserGameInfo', {'GameId': widget.gameId});

      if (response['statusCode'] == 200) {
        Map<String, dynamic> userGameInfo = response['body']['userGameInfo'];
        setState(() {
          String playerName = userGameInfo['playerName'];
          String playerId = '${userGameInfo['playerId']}';

          _inGameIdController.text = playerId;
          _inGameNameController.text = playerName;
        });
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      customLogger!.logError(error);
    } finally {}
  }

  void _updatePlayerInfo() async {
    // Handle the update logic here, for example, print to console or send to backend
    String inGameId = _inGameIdController.text;
    String inGameName = _inGameNameController.text;

    try {
      dynamic response = await postRequestWithToken(
          'user/events/updateUserGameInfo', {
        'GameId': widget.gameId,
        "playerId": inGameId,
        "playerName": inGameName
      });

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Info updated Successfully!");
        _fetchPlayerInfo();
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      customLogger!.logError(error);
    } finally {}
  }

  @override
  void dispose() {
    _inGameIdController.dispose();
    _inGameNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${widget.gameTitle} - Player Information"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Game: ${widget.gameTitle}",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _inGameIdController,
              decoration: InputDecoration(
                labelText: "Player In-Game ID",
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            TextField(
              controller: _inGameNameController,
              decoration: InputDecoration(
                labelText: "Player In-Game Name",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                onPressed: _updatePlayerInfo,
                child: Text("Update"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
