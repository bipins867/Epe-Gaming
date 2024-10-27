import 'package:epe_gaming_client/Components/Home/Notifications/notifications.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/wallet.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/AboutUs/aboutUs.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/BankDetails/bankDetails.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Kyc/kyc.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/legality.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/MyProfile/myProfile.dart';
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

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
            "My Profile",
            const Icon(Icons.person, color: Colors.blue),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => MyProfilePage()),
              );
            },
          ),
          getListItem(
            "KYC",
            const Icon(Icons.verified_user, color: Colors.green),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => KYCPage()),
              );
            },
          ),
          getListItem(
            "Bank Details",
            const Icon(Icons.account_balance, color: Colors.grey),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => BankDetailsPage()),
              );
            },
          ), // New Bank Details Item

          getListItem(
            "My Wallet",
            const Icon(Icons.account_balance_wallet, color: Colors.purple),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => WalletPage()),
              );
            },
          ),
          getListItem(
            "Notifications",
            const Icon(Icons.notifications, color: Colors.orange),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => NotificationsPage()),
              );
            },
          ),
          getListItem(
            "About Us",
            const Icon(Icons.info, color: Colors.teal),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => AboutUsPage()),
              );
            },
          ),
          getListItem(
            "Share App",
            const Icon(Icons.share, color: Colors.red),
            onClickFun: () {
              Share.share(
                'Check out the EPE Gaming app for tournaments and competitions! Download here: https://example.com',
              );
            },
          ),
          getListItem(
            "Legality",
            const Icon(Icons.gavel, color: Colors.brown),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => LegalityPage()),
              );
            },
          ),
          getListItem(
            "Logout",
            const Icon(Icons.logout, color: Colors.black),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => KYCPage()),
              );
            },
          ),
        ],
      ),
    );
  }
}
