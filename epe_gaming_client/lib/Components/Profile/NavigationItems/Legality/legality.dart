import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/PrivacyPolicy/privacyPolicy.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/TermsAndConditions/termsAndCondtions.dart';
import 'package:flutter/material.dart';

class LegalityPage extends StatefulWidget {
  const LegalityPage({super.key});

  @override
  _LegalityPageState createState() => _LegalityPageState();
}

class _LegalityPageState extends State<LegalityPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
        length: 2, vsync: this); // Initialize tab controller for 2 tabs
  }

  @override
  void dispose() {
    _tabController.dispose(); // Dispose of the tab controller when not in use
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Legality'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Terms and Conditions'),
            Tab(text: 'Privacy Policy'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          TermsAndConditionsPage(),
          PrivacyPolicyPage(),
        ],
      ),
    );
  }
}
