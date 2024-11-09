import 'package:epe_gaming_client/Components/Home/Notifications/notifications.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/wallet.dart';
import 'package:epe_gaming_client/Components/Home/home.dart';
import 'package:epe_gaming_client/Components/Profile/profile.dart';
import 'package:flutter/material.dart';

class BaseScreen extends StatefulWidget {
  const BaseScreen({super.key});

  @override
  _BaseScreenState createState() => _BaseScreenState();
}

class _BaseScreenState extends State<BaseScreen> {
  final PageController _pageController = PageController();
  int _selectedIndex = 0;

  final List<Widget> _pages = [Home(), const Profile()];

  void _onItemTapped(int index) {
    _pageController.jumpToPage(index);
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _selectedIndex == 0
          ? AppBar(
              title: Row(
                children: [
                  Image.asset(
                    'assets/Home/ppl-logo-half.png', // Update with your asset path
                    height: 30, // Set appropriate height for the icon
                    width: 30,
                  ),
                  const SizedBox(width: 8), // Add spacing between icon and text
                  const Text("Pro Play League"),
                ],
              ),
              actions: [
                IconButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) => NotificationsPage()),
                    );
                  },
                  icon: const Icon(Icons.notifications),
                ),
                IconButton(
                  icon: const Icon(Icons.wallet),
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => WalletPage()),
                    );
                  },
                ),
              ],
            )
          : null, // Hide AppBar if not on the Home page
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}
