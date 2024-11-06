import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/legality.dart';
import 'package:flutter/material.dart';

class LegalityItemsList extends StatelessWidget {
  const LegalityItemsList({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: ExpansionTile(
        leading: Icon(Icons.gavel, color: Colors.brown),
        title: Text("Legality"),
        trailing: Icon(Icons.arrow_drop_down, color: Colors.grey),
        children: [
          ListTile(
            leading: Icon(Icons.rule, color: Colors.blue),
            title: Text('Terms and Conditions'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => LegalityPage(
                          currentIndex: 0,
                        )),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.lock, color: Colors.green),
            title: Text('Privacy Policy'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => LegalityPage(
                          currentIndex: 1,
                        )),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.shield, color: Colors.orange),
            title: Text('PPL Safety Precautions'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => LegalityPage(
                          currentIndex: 2,
                        )),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.volunteer_activism, color: Colors.purple),
            title: Text('Responsible Play Policy'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => LegalityPage(
                          currentIndex: 3,
                        )),
              );
            },
          ),
          ListTile(
            leading: Icon(Icons.receipt, color: Colors.red),
            title: Text('Return, Refund & Cancellation Policy'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => LegalityPage(currentIndex: 4)),
              );
            },
          ),
        ],
      ),
    );
  }
}
