import 'package:flutter/material.dart';

class NavigationItems extends StatelessWidget {
  const NavigationItems({super.key});

  Widget getListItem(String title, Icon icon, {VoidCallback? onClickFun}) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: ListTile(
        leading: icon,
        title: Text(title),
        trailing: const Icon(Icons.arrow_forward_ios,
            color: Colors.grey), // Add arrow
        onTap: onClickFun,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          getListItem(
              "My Profile", const Icon(Icons.person, color: Colors.blue)),
          getListItem(
              "KYC", const Icon(Icons.verified_user, color: Colors.green)),
          getListItem("My Wallet",
              const Icon(Icons.account_balance_wallet, color: Colors.purple)),
          getListItem("Notifications",
              const Icon(Icons.notifications, color: Colors.orange)),
          getListItem("About Us", const Icon(Icons.info, color: Colors.teal)),
          getListItem("Share App", const Icon(Icons.share, color: Colors.red)),
          getListItem("Legality", const Icon(Icons.gavel, color: Colors.brown)),
          getListItem("Logout", const Icon(Icons.logout, color: Colors.black)),
        ],
      ),
    );
  }
}
