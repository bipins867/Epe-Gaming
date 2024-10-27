import 'package:flutter/material.dart';

class KYCPage extends StatelessWidget {
  const KYCPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('KYC Verification'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 4,
          margin: const EdgeInsets.symmetric(vertical: 8.0),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Enter PAN Number',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 16),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'PAN Number',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.text,
                  maxLength: 10, // Assuming PAN number has 10 characters
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    // Add your update logic here
                  },
                  child: Text('Update KYC'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
