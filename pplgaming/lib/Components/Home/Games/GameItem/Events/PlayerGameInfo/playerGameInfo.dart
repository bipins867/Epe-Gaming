import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class PlayerGameInfoPage extends StatefulWidget {
  final String gameTitle;
  final String gameId; // Example: "BGMI"
  final String error;

  const PlayerGameInfoPage(
      {super.key,
      required this.gameTitle,
      required this.gameId,
      this.error = ""});

  @override
  _PlayerGameInfoPageState createState() => _PlayerGameInfoPageState();
}

class _PlayerGameInfoPageState extends State<PlayerGameInfoPage> {
  final TextEditingController _inGameIdController = TextEditingController();
  final TextEditingController _inGameNameController = TextEditingController();
  AppConfig? appConfig;

  @override
  void initState() {
    appConfig = AppConfig();

    _fetchPlayerInfo();
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
      CustomLogger.logError(error);
    }
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
      CustomLogger.logError(error);
    }
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
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                'assets/Background/bgmi.jpg'), // Replace with your background image path
            fit: BoxFit.cover, // Cover the entire screen
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (widget.error.isNotEmpty)
                Container(
                  margin: const EdgeInsets.only(bottom: 16.0),
                  padding: const EdgeInsets.all(12.0),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    widget.error,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white
                      .withOpacity(0.7), // Semi-transparent background for text
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  "Game: ${widget.gameTitle}",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors
                        .black, // Ensure text is visible on the background
                  ),
                ),
              ),
              SizedBox(height: 20),
              Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(
                      0.7), // Semi-transparent background for text field
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextField(
                  controller: _inGameIdController,
                  decoration: InputDecoration(
                    labelText: "Player In-Game ID",
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.8),
                  ),
                  keyboardType: TextInputType.number,
                ),
              ),
              SizedBox(height: 20),
              Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(
                      0.7), // Semi-transparent background for text field
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextField(
                  controller: _inGameNameController,
                  decoration: InputDecoration(
                    labelText: "Player In-Game Name",
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.8),
                  ),
                ),
              ),
              SizedBox(height: 30),
              Center(
                child: ElevatedButton(
                  onPressed: _updatePlayerInfo,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blueAccent, // Button color
                    foregroundColor: Colors.white, // Text color
                  ),
                  child: Text("Update"),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
