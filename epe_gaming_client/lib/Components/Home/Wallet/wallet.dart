import 'package:flutter/material.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/TransactionHistory/transactionHistory.dart';
import 'package:epe_gaming_client/Components/Home/Wallet/WalletHome/walletHome.dart';

class WalletPage extends StatefulWidget {
  const WalletPage({super.key});

  @override
  _WalletPageState createState() => _WalletPageState();
}

class _WalletPageState extends State<WalletPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _pageController = PageController();

    // Listen for tab changes to update the page view
    _tabController.addListener(() {
      _pageController.jumpToPage(_tabController.index);
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Wallet'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Home'),
            Tab(text: 'Transaction History'),
          ],
        ),
      ),
      body: PageView(
        controller: _pageController,
        children: [
          WalletHomePage(),
          TransactionHistory(),
        ],
      ),
    );
  }
}
