import 'package:pplgaming/Components/Home/Notifications/notifications.dart';
import 'package:pplgaming/Components/Home/Wallet/wallet.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/AboutUs/aboutUs.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/BankDetails/bankDetails.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/Kyc/kyc.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/Legality/legalityItems.dart';
import 'package:pplgaming/Components/Profile/NavigationItems/MyProfile/myProfile.dart';
import 'package:pplgaming/Store/baseStoreProvider.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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
        trailing: const Icon(Icons.arrow_forward_ios, color: Colors.grey),
        onTap: onClickFun,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic>? userProfileInfo =
        Provider.of<BaseStoreProvider>(context).userProfileInfo;
    Map<String, dynamic>? profileInfo =
        userProfileInfo != null && userProfileInfo.containsKey('userProfile')
            ? userProfileInfo['userProfile']
            : null;

    String kycStatus = profileInfo?['kycStatus'] ?? 'pending';
    String bankStatus = profileInfo?['bankStatus'] ?? 'pending';

    return Expanded(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          getListItem(
            "My Profile",
            const Icon(Icons.person, color: Colors.blue),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => MyProfilePage(
                          profileInfo: profileInfo,
                        )),
              );
            },
          ),
          getListItem(
            "KYC",
            Icon(
              Icons.verified_user,
              color: kycStatus == 'verified' ? Colors.green : Colors.red,
            ),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => KYCPage()),
              );
            },
          ),
          getListItem(
            "Bank Details",
            Icon(
              Icons.account_balance,
              color: bankStatus == 'updated' ? Colors.green : Colors.red,
            ),
            onClickFun: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => BankDetailsPage()),
              );
            },
          ),
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
                'Check out the Pro Play League app for tournaments and competitions! Download here: https://example.com',
              );
            },
          ),
          // Dropdown for Legality Options using ExpansionTile
          LegalityItemsList(),
          getListItem(
            "Logout",
            const Icon(Icons.logout, color: Colors.black),
            onClickFun: () {
              AppConfig.removeLocalStorageItem('authToken');
              Navigator.pushNamedAndRemoveUntil(
                  context, '/login', (Route<dynamic> route) => false);
            },
          ),
        ],
      ),
    );
  }
}
