import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:pplgaming/Components/Home/Games/GameItem/Events/EventDetails/CreateEvent/reviewPage.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

class CreateEvent extends StatefulWidget {
  final String gameId;

  const CreateEvent({super.key, required this.gameId});

  @override
  State<CreateEvent> createState() => _CreateEventState();
}

class _CreateEventState extends State<CreateEvent> {
  bool purchaseFullSlot = false;
  bool isTeamPublic = true;
  bool isJoinnersPaid = false;
  bool isAmountDistributed = true;
  bool showTeamDetails = false; // Controls visibility of the four buttons
  bool isSwitchesEnabled = true;
  double calculatedFee = 0.0;
  double entryFee = 0.0;
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _startTimeController = TextEditingController();
  final TextEditingController _entryFeeController =
      TextEditingController(text: "20");

  String calcuatedDescriptionText = "What?";
  String? _selectedSquadType = "1";
  DateTime? _selectedDateTime;
  String? _selectedMap = "TDM (Team Death Match)";

  void _pickDateTime() async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (pickedDate != null) {
      TimeOfDay? pickedTime = await showTimePicker(
        context: context,
        initialTime: TimeOfDay.now(),
      );

      if (pickedTime != null) {
        setState(() {
          _selectedDateTime = DateTime(
            pickedDate.year,
            pickedDate.month,
            pickedDate.day,
            pickedTime.hour,
            pickedTime.minute,
          );
          _startTimeController.text =
              DateFormat('yyyy-MM-dd HH:mm').format(_selectedDateTime!);
        });
      }
    }
  }

  void _createEvent() {
    // Validate each required field
    String message = "";
    if (_selectedMap == null || _selectedMap!.isEmpty) {
      message = 'Error: Map selection is required.';
    }

    if (entryFee <= 0) {
      message = 'Error: Entry Fee is required and must be greater than 0.';
    }

    if (_selectedSquadType == null || _selectedSquadType!.isEmpty) {
      message = 'Error: Squad Type selection is required.';
    }

    if (_selectedDateTime == null) {
      message = 'Error: Start time is required.';
    }

    if (message != "") {
      showErrorAlertDialog(context, message);
      return;
    }

    // If all validations pass, navigate to the ReviewPage
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ReviewPage(
          map: _selectedMap!,
          entryFee: entryFee,
          squadType: _selectedSquadType!,
          startTime: _selectedDateTime!,
          isPurchasedFullSlot: purchaseFullSlot,
          calculatedFee: entryFee,
          feeDescription: calcuatedDescriptionText,
          gameId: widget.gameId,
        ),
      ),
    );
  }

  void _calculateFee() {
    if (purchaseFullSlot) {
      calculatedFee = entryFee * num.parse(_selectedSquadType!);
    }
  }

  void _onSwitchChanged(String switchName, bool value) {
    setState(() {
      switch (switchName) {
        case 'purchaseFullSlot':
          purchaseFullSlot = value;
          if (!value) {
            isTeamPublic = true;
            isJoinnersPaid = false;
            isAmountDistributed = true;
          }
          break;
        case 'isTeamPublic':
          isTeamPublic = value;
          break;
        case 'isJoinnersPaid':
          isJoinnersPaid = value;

          if (purchaseFullSlot && !value) {
            isTeamPublic = true;
          }

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
    entryFee = double.parse(_entryFeeController.text);

    if (!purchaseFullSlot) {
      calculatedFee = entryFee;
      calcuatedDescriptionText =
          'Solo * Entry Fee => 1 * 🪙$entryFee = 🪙${entryFee.toStringAsFixed(2)}';
    } else {
      double fee = num.parse(_selectedSquadType!) * entryFee;
      calculatedFee = fee;
      calcuatedDescriptionText =
          'Team Size * Entry Fee => $_selectedSquadType * 🪙$entryFee = 🪙 ${fee.toStringAsFixed(2)}';
    }

    return SingleChildScrollView(
      child: Card(
        margin: const EdgeInsets.all(16),
        elevation: 5,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Map Dropdown Input
                DropdownButtonFormField<String>(
                  value:
                      _selectedMap, // Default value (optional, can be null if no default)
                  decoration: InputDecoration(
                    labelText: 'Map',
                    border: OutlineInputBorder(),
                  ),
                  items: [
                    'TDM (Team Death Match)',
                    'Ultimate Arena - Livik',
                    'Ultimate Arena - Erangle',
                    'Royal Arena - Livik',
                    'Royal Arena - Sanhok',
                    'Royal Arena - Erangle',
                    'Domination',
                    'Ruins'
                  ].map((map) {
                    return DropdownMenuItem<String>(
                      value: map,
                      child: Text(map),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedMap = value; // Update the selected map
                    });
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please select a map';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 16),

                // Entry Fee input
                TextFormField(
                  controller: _entryFeeController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: 'Entry Fee',
                    border: OutlineInputBorder(),
                    prefix: Text("🪙 "),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter the entry fee';
                    }
                    if (double.tryParse(value) == null) {
                      return 'Please enter a valid number';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Squad Type dropdown
                DropdownButtonFormField<String>(
                  value: _selectedSquadType,
                  decoration: InputDecoration(
                    labelText: 'Squad Type (Ex:- Solo, Duo, Squad etc..)',
                    border: OutlineInputBorder(),
                  ),
                  items: ['1', '2', '3', '4']
                      .map((type) => DropdownMenuItem<String>(
                            value: type,
                            child: Text(type),
                          ))
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedSquadType = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Please select a squad type';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Start Time picker
                TextFormField(
                  controller: _startTimeController,
                  readOnly: true,
                  decoration: InputDecoration(
                    labelText: 'Start Time',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.calendar_today),
                  ),
                  onTap: _pickDateTime,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please select a start time';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Edit and Cancel buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    if (!showTeamDetails)
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            showTeamDetails = true;
                          });
                        },
                        child: Text('Edit Team Details'),
                      ),
                    if (showTeamDetails)
                      IconButton(
                        icon: Icon(Icons.cancel),
                        onPressed: () {
                          setState(() {
                            showTeamDetails = false;
                            purchaseFullSlot = false;
                            isTeamPublic = true;
                            isAmountDistributed = true;
                            isJoinnersPaid = false;
                          });
                        },
                      ),
                  ],
                ),

                const SizedBox(height: 16),

                // Team Detail switches
                if (showTeamDetails) ...[
                  _buildSwitch(
                      'Purchase Full Slot',
                      purchaseFullSlot,
                      'purchaseFullSlot',
                      'User is acquiring a new team slot.',
                      purchaseFullSlot || isSwitchesEnabled),
                  _buildSwitch(
                      'Is Public Team',
                      isTeamPublic,
                      'isTeamPublic',
                      'Yes: Team ID will be publicly visible to other members.\nNo: It will be only visible to you.',
                      isSwitchesEnabled && purchaseFullSlot && isJoinnersPaid),
                  _buildSwitch(
                      'Is Free for Others',
                      isJoinnersPaid,
                      'isJoinnersPaid',
                      'You are paying your teammates’ fees. So for them, the entry fee will be 🪙0.00.',
                      isSwitchesEnabled && purchaseFullSlot),
                  _buildSwitch(
                      'Is Amount Distributed',
                      isAmountDistributed,
                      'isAmountDistributed',
                      'Whether the winning amount will be distributed among the teammates or not.',
                      isSwitchesEnabled && purchaseFullSlot && isJoinnersPaid),
                  const SizedBox(height: 20),
                  Text('Calculated Fee: 🪙${calculatedFee.toStringAsFixed(2)}',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Text(calcuatedDescriptionText),
                ],

                SizedBox(height: 30),

                Center(
                  child: ElevatedButton(
                    onPressed: _createEvent,
                    child: Text('Create and Join'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSwitch(String title, bool value, String switchName,
      String description, bool isEnabled) {
    if (switchName == 'purchaseFullSlot') {
      CustomLogger.logInfo(value.toString());
    }
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
              onPressed: () => _showInfoPopup(context, description),
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
}
