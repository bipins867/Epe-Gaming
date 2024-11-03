import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class JoinTeamPage extends StatefulWidget {
  final String eventId;
  final String? teamId;

  const JoinTeamPage({super.key, required this.eventId, this.teamId});

  @override
  State<JoinTeamPage> createState() => _JoinTeamPageState();
}

class _JoinTeamPageState extends State<JoinTeamPage> {
  Map<String, dynamic>? eventInfo;
  Map<String, dynamic>? teamInfo;
  double? totalBalance;
  int? totalTeams;
  int? totalPlayersJoined;
  bool? isEventJoined;
  bool purchaseFullSlot = false;
  bool isPublicTeam = true;
  bool isFreeForOthers = false;
  bool isAmountDistributed = true;
  double calculatedFee = 0.0;
  int squadType = 4;

  CustomLogger? customLogger;

  @override
  void initState() {
    customLogger = CustomLogger();

    _getJoinEventTeamInfo();

    super.initState();
  }

  Future<void> _getJoinEventTeamInfo() async {
    Map<String, dynamic> payload;

    // Fetch event and team information
    try {
      dynamic response =
          await postRequestWithToken('user/events/getJoinEventTeamInfo', {
        "eventId": widget.eventId,
      });
//"teamId": "EGNNK29986"
      if (response['statusCode'] == 200) {
        setState(() {
          Map<String, dynamic> body = response['body']['data'];
          eventInfo = body['event'];
          teamInfo = body['team'];

          totalBalance = double.parse('${body['totalBalance']}');
          totalTeams = int.parse('${body['totalTeams']}');
          squadType = int.parse('${eventInfo!['squadType']}');
          totalPlayersJoined = int.parse('${body['totalPlayersJoined']}');
          isEventJoined = bool.tryParse('${body['isEventJoined']}');
          _calculateFee();
          _updateToogleFunctions();
        });
      } else {
        handleErrors(response, alertFunction: (string) {
          showErrorAlertDialog(context, string);
        });
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

  void _updateToogleFunctions() {
    //onload

    setState(() {
      if (teamInfo != null) {
        isPublicTeam = teamInfo!['isPublic'];
        isFreeForOthers = teamInfo!['isJoinnersPaid'];
        isAmountDistributed = teamInfo!['isAmountDistributed'];
      }
    });
  }

  void _calculateFee() {
    setState(() {
      if (teamInfo != null) {
        calculatedFee = teamInfo!['isJoinnersPaid']
            ? 0.0
            : (eventInfo!['entryFee'] as num).toDouble();
      } else {
        calculatedFee = isFreeForOthers
            ? (eventInfo!['squadType'] * (eventInfo!['entryFee'] as num))
                .toDouble()
            : (eventInfo!['entryFee'] as num).toDouble();
      }
    });
  }

  void _onSwitchChanged(String switchName, bool value) {
    setState(() {
      switch (switchName) {
        case 'purchaseFullSlot':
          purchaseFullSlot = value;
          if (!value) {
            isPublicTeam = true;
            isFreeForOthers = false;
            isAmountDistributed = true;
          }
          break;
        case 'isPublicTeam':
          isPublicTeam = value;
          break;
        case 'isFreeForOthers':
          isFreeForOthers = value;
          if (!value) {
            isAmountDistributed = true;
          }
          break;
        case 'isAmountDistributed':
          isAmountDistributed = value;
          break;
      }
      _calculateFee();
    });
  }

  @override
  Widget build(BuildContext context) {
    String calcuatedDescriptionText = '';

    if (eventInfo != null &&
        eventInfo!['squadType'] != null &&
        eventInfo!['entryFee'] != null) {
      if (teamInfo != null) {
        if (teamInfo!['isJoinnersPaid']) {
          calcuatedDescriptionText =
              '0 * Entry Fee => 0 * 🪙${eventInfo!['entryFee']} = 🪙0';
          calculatedFee = 0;
        } else {
          calcuatedDescriptionText =
              'Solo * Entry Fee => 1 * 🪙${eventInfo!['entryFee']} = 🪙${calculatedFee.toStringAsFixed(2)}';
        }
      } else if (purchaseFullSlot && isFreeForOthers) {
        calcuatedDescriptionText =
            'Team Size * Entry Fee => ${eventInfo!['squadType']} * 🪙${eventInfo!['entryFee']} = 🪙${calculatedFee.toStringAsFixed(2)}';
      } else {
        calcuatedDescriptionText =
            'Solo * Entry Fee => 1 * 🪙${eventInfo!['entryFee']} = 🪙${calculatedFee.toStringAsFixed(2)}';
      }
    } else {
      // Default message if `eventInfo` or its keys are null
      calcuatedDescriptionText = 'Event information is not available.';
    }

    return Scaffold(
      appBar: AppBar(title: Text('Join Team')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // First Card: Wallet Balance and Entry Fee
            Card(
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Wallet Balance
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Wallet Balance:',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold)),
                        Text(
                          totalBalance != null
                              ? '🪙${totalBalance ?? 0.toStringAsFixed(2)}'
                              : '🪙0.00',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Entry Fee
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Entry Fee:',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold)),
                        Text(
                          eventInfo != null && eventInfo!['entryFee'] != null
                              ? '🪙${eventInfo!['entryFee'].toStringAsFixed(2)}'
                              : '🪙0.00', // Provide a default value like 'N/A' if entryFee is null
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Remaining Team Slot Left
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Remaining Team Slot Left:',
                            style: TextStyle(fontSize: 16)),
                        Text(
                          (eventInfo != null &&
                                  eventInfo!['noOfPlayers'] != null &&
                                  eventInfo!['squadType'] != null &&
                                  totalTeams != null)
                              ? '${((eventInfo!['noOfPlayers'] / eventInfo!['squadType']) - totalTeams!).toInt()}'
                              : 'N/A',
                          style: TextStyle(fontSize: 16),
                        ),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Number of Joined Teams
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Number of Joined Teams:',
                            style: TextStyle(fontSize: 16)),
                        Text(totalTeams != null ? '$totalTeams' : 'N/A',
                            style: TextStyle(fontSize: 16)),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Remaining Slots for Players
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Remaining Slots for Players:',
                            style: TextStyle(fontSize: 16)),
                        Text(
                          (eventInfo != null &&
                                  eventInfo!['noOfPlayers'] != null &&
                                  totalTeams != null &&
                                  eventInfo!['squadType'] != null)
                              ? '${eventInfo!['noOfPlayers'] - totalTeams! * eventInfo!['squadType']}'
                              : 'N/A',
                          style: TextStyle(fontSize: 16),
                        ),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Number of Players Joined
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Number of Players Joined:',
                            style: TextStyle(fontSize: 16)),
                        Text(
                            totalPlayersJoined != null
                                ? '$totalPlayersJoined'
                                : 'N/A',
                            style: TextStyle(fontSize: 16)),
                      ],
                    ),
                    SizedBox(height: 10),

                    // Number of Players Joined
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Team Slot Size:', style: TextStyle(fontSize: 16)),
                        Text('$squadType', style: TextStyle(fontSize: 16)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 20),

            // Second Card: Switches and Pay Button
            if (isEventJoined == false)
              Card(
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      _buildSwitch(
                          'Purchase Full Slot',
                          purchaseFullSlot,
                          'purchaseFullSlot',
                          purchaseFullSlot || teamInfo == null),
                      _buildSwitch('Is Public Team', isPublicTeam,
                          'isPublicTeam', teamInfo == null && purchaseFullSlot),
                      _buildSwitch(
                          'Is Free for Others',
                          isFreeForOthers,
                          'isFreeForOthers',
                          teamInfo == null && purchaseFullSlot),
                      _buildSwitch(
                          'Is Amount Distributed',
                          isAmountDistributed,
                          'isAmountDistributed',
                          teamInfo == null &&
                              purchaseFullSlot &&
                              isFreeForOthers),
                      SizedBox(height: 10),
                      Text(
                          'Calculated Fee: 🪙${calculatedFee.toStringAsFixed(2)}',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold)),
                      SizedBox(height: 10),
                      Text(calcuatedDescriptionText),
                      SizedBox(
                        height: 10,
                      ),
                      Center(
                        child: ElevatedButton(
                          onPressed: _payAndJoin,
                          child: Text('Pay and Join'),
                        ),
                      ),
                    ],
                  ),
                ),
              )
            else
              Text('You have already joined the event.',
                  style: TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }

  Widget _buildSwitch(
      String title, bool value, String switchName, bool isEnabled) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: TextStyle(fontSize: 16)),
        Row(
          children: [
            Switch(
              value: value,
              onChanged:
                  isEnabled ? (val) => _onSwitchChanged(switchName, val) : null,
            ),
            IconButton(
              icon: Icon(Icons.info),
              onPressed: () => _showInfoPopup(context, title),
            ),
          ],
        ),
      ],
    );
  }

  void _showInfoPopup(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _payAndJoin() {
    // Handle pay and join logic here
    print(
        "Paying and joining the event with fee: 🪙${calculatedFee.toStringAsFixed(2)}");
  }
}
