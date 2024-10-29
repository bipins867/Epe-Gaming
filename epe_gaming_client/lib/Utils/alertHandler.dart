import 'package:flutter/material.dart';

void showErrorAlertDialog(BuildContext context, String message,
    {String type = "Error"}) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(type),
        content: Text(
          message,
          style: TextStyle(color: Colors.red),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(); // Closes the dialog
            },
            child: Text("OK"),
          ),
        ],
      );
    },
  );
}

void showInfoAlertDialog(BuildContext context, String message,
    {String type = "Info"}) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(type),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(); // Closes the dialog
            },
            child: Text("OK"),
          ),
        ],
      );
    },
  );
}
