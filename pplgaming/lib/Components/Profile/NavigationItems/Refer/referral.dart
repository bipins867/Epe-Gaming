import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pplgaming/Store/baseStoreProvider.dart';
import 'package:pplgaming/Utils/utils.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

class ReferralPage extends StatelessWidget {
  late String referralId;
  void _copyToClipboard(BuildContext context, String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Referral ID copied to clipboard')),
    );
  }

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic>? userProfileInfo =
        Provider.of<BaseStoreProvider>(context).userProfileInfo;
    Map<String, dynamic>? referralInfo =
        userProfileInfo != null && userProfileInfo.containsKey('referralInfo')
            ? userProfileInfo['referralInfo']
            : null;

    print(referralInfo);

    String referralId =
        referralInfo != null && referralInfo.containsKey('referralId')
            ? referralInfo['referralId']
            : 'N/A'; // Default referral ID

    final int numOfReferrals =
        referralInfo != null && referralInfo.containsKey('noOfReferrals')
            ? referralInfo['noOfReferrals']
            : 0; // Default number of referrals

    final int pendingReferrals =
        referralInfo != null && referralInfo.containsKey('pendingReferrals')
            ? referralInfo['pendingReferrals']
            : 0; // Default number of pending referrals

    List<dynamic> referredUsers =
        referralInfo != null && referralInfo.containsKey('ReferredUsers')
            ? (referralInfo['ReferredUsers'] as List<dynamic>?)
                    ?.where((user) => user != null)
                    .toList() ??
                []
            : [];
    print(referredUsers);

    return Scaffold(
      appBar: AppBar(
        title: Text("Referral Program"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Referral Card
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Referral ID",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          referralId,
                          style:
                              TextStyle(fontSize: 16, color: Colors.blueAccent),
                        ),
                        IconButton(
                          icon: Icon(Icons.copy),
                          onPressed: () =>
                              _copyToClipboard(context, referralId),
                        ),
                      ],
                    ),
                    SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        String message =
                            "Pro Play League app for tournaments and competitions! Download here: https://pplgaming.com\n\nYour referral ID: $referralId\nInvite your friends to join and compete!";
                        Share.share(message);
                      },
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 12,
                        ),
                      ),
                      child: Text("Refer Now"),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 24),

            // Statistics Card
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      children: [
                        Text(
                          "No. of Referrals",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "$numOfReferrals",
                          style: TextStyle(fontSize: 20, color: Colors.green),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        Text(
                          "Pending Referrals",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "$pendingReferrals",
                          style: TextStyle(fontSize: 20, color: Colors.red),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 24),

            // Referred Users List
            Text(
              "Referred Users",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: referredUsers.isEmpty
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Text(
                            "No referred users found.",
                            style: TextStyle(fontSize: 16, color: Colors.grey),
                          ),
                        ),
                      )
                    : SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: DataTable(
                          columnSpacing: 20,
                          headingRowColor: MaterialStateColor.resolveWith(
                            (states) => Colors.grey.shade300,
                          ),
                          columns: [
                            DataColumn(label: Text("#")),
                            DataColumn(label: Text("Player ID")),
                            DataColumn(label: Text("Name")),
                            DataColumn(label: Text("Status")),
                            DataColumn(label: Text("Date of Joining")),
                            DataColumn(label: Text("Date of Completion")),
                          ],
                          rows: referredUsers
                              .asMap()
                              .entries
                              .map(
                                (entry) => DataRow(
                                  cells: [
                                    DataCell(Text(
                                        "${entry.key + 1}")), // Index for #
                                    DataCell(Text(
                                        entry.value["customerId"] ?? "N/A")),
                                    DataCell(
                                        Text(entry.value["name"] ?? "N/A")),
                                    DataCell(
                                        Text(entry.value["status"] ?? "N/A")),
                                    DataCell(Text(formatDate(
                                        entry.value["dateOfJoining"]))),
                                    DataCell(Text(formatDate(
                                        entry.value["dateOfCompletion"]))),
                                  ],
                                ),
                              )
                              .toList(),
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
