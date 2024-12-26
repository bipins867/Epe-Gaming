import 'package:flutter/material.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

class ReviewPage extends StatefulWidget {
  final String map;
  final double entryFee;
  final String squadType;
  final DateTime startTime;
  final bool isPurchasedFullSlot;
  final double calculatedFee;
  final String feeDescription;
  final String gameId;

  ReviewPage(
      {required this.map,
      required this.entryFee,
      required this.squadType,
      required this.startTime,
      required this.isPurchasedFullSlot,
      required this.calculatedFee,
      required this.feeDescription,
      required this.gameId});

  @override
  State<ReviewPage> createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> {
  Future<void> _createEventHandler() async {
    try {
      dynamic response = await postRequestWithToken(
        'user/events/createChallengeEvent',
        {
          "gameId": widget.gameId,
          "map": widget.map,
          "squadType": widget.squadType,
          "startTime": widget.startTime.toIso8601String(),
          "entryFee": widget.entryFee,
          "isTotalPaid": widget.isPurchasedFullSlot
        },
      );

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Challenge Successfully Created!",
            callbackFunction: () {
          Navigator.pop(context);
          Navigator.pop(context);
        });
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Review Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildDetailRow('Map:', widget.map),
                    _buildDetailRow('Entry Fee:', '🪙 ${widget.entryFee}'),
                    _buildDetailRow('Squad Type:', widget.squadType),
                    _buildDetailRow(
                      'Start Time:',
                      '${widget.startTime.toLocal()}'.split(' ')[0] +
                          ' at ${widget.startTime.hour}:${widget.startTime.minute.toString().padLeft(2, '0')}',
                    ),
                    _buildDetailRow(
                      'Purchased Full Slot:',
                      widget.isPurchasedFullSlot ? 'Yes' : 'No',
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildDetailRow(
                        'Calculated Fee:', '🪙 ${widget.calculatedFee}'),
                    SizedBox(height: 8),
                    Text(
                      'Fee Summary:',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      widget.feeDescription,
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            ElevatedButton(
              onPressed: _createEventHandler,
              child: Text('Pay Now'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String title, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
          Flexible(
            child: Text(
              value,
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.end,
            ),
          ),
        ],
      ),
    );
  }
}
