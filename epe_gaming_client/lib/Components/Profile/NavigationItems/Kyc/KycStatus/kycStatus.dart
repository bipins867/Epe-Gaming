import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class KycStatus extends StatelessWidget {
  final Map<String, dynamic>? kycDetails;

  const KycStatus({super.key, required this.kycDetails});

  @override
  Widget build(BuildContext context) {
    final status = kycDetails?['status'];
    final statusColor = {
          'pending': Colors.yellow,
          'rejected': Colors.red,
          'verified': Colors.green,
        }[status] ??
        Colors.grey;

    return Container(
      width: double.infinity,
      child: Card(
        color: statusColor,
        elevation: 4,
        margin: const EdgeInsets.symmetric(vertical: 8.0),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Status: ${status[0].toUpperCase() + status.substring(1)}',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              _buildDetailRow("PAN Number", kycDetails?['panNumber'] ?? 'N/A'),
              _buildDetailRow(
                "Upload Time",
                DateFormat('yyyy-MM-dd HH:mm')
                    .format(DateTime.parse(kycDetails!['updatedAt'])),
              ),
              if (status != 'verified')
                _buildDetailRow("Remark", kycDetails?['adminMessage'] ?? 'N/A'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "$label:",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(value),
        ],
      ),
    );
  }
}
