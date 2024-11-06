import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/PPLSafetyPrecautions/PPLSafetyPrecautions.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/ResponsiblePlayPolicy/responsiblePlayPolicy.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/ReturnRefundAndCancellationPolicy/returnRefundAndCancellationPolicy.dart';
import 'package:flutter/material.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/PrivacyPolicy/privacyPolicy.dart';
import 'package:epe_gaming_client/Components/Profile/NavigationItems/Legality/TermsAndConditions/termsAndCondtions.dart';

class LegalityPage extends StatefulWidget {
  final int currentIndex;
  const LegalityPage({super.key, required this.currentIndex});

  @override
  _LegalityPageState createState() => _LegalityPageState();
}

class _LegalityPageState extends State<LegalityPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late PageController _pageController;
  int _currentPageIndex = 0;

  @override
  void initState() {
    super.initState();
    // Initialize the _tabController and _pageController with the currentIndex from the parent widget.
    _currentPageIndex = widget.currentIndex;
    _tabController =
        TabController(length: 5, vsync: this, initialIndex: _currentPageIndex);
    _pageController = PageController(initialPage: _currentPageIndex);
  }

  @override
  void didUpdateWidget(covariant LegalityPage oldWidget) {
    super.didUpdateWidget(oldWidget);

    // If the currentIndex from the parent widget has changed, update the TabController and PageController
    if (oldWidget.currentIndex != widget.currentIndex) {
      setState(() {
        _currentPageIndex = widget.currentIndex;
        _tabController.index = _currentPageIndex; // Update TabController index
        _pageController
            .jumpToPage(_currentPageIndex); // Update PageController page
      });
    }
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
        title: Text('Legality'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          onTap: (index) {
            _pageController.animateToPage(
              index,
              duration: Duration(milliseconds: 300),
              curve: Curves.ease,
            );
          },
          tabs: [
            Tab(text: 'Terms and Conditions'),
            Tab(text: 'Privacy Policy'),
            Tab(text: 'PPL Safety Precautions'),
            Tab(text: 'Responsible Play Policy'),
            Tab(text: 'Return, Refund & Cancellation Policy'),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: PageView(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  _currentPageIndex = index;
                  _tabController.animateTo(index);
                });
              },
              children: [
                TermsAndConditionsPage(),
                PrivacyPolicyPage(),
                PPLSafetyPrecautionsPage(),
                ResponsiblePlayPolicyPage(),
                ReturnRefundCancellationPolicy()
              ],
            ),
          ),
          SizedBox(height: 5),
          // Dots Indicator Row
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(5, (index) {
              return AnimatedContainer(
                duration: Duration(milliseconds: 300),
                margin: EdgeInsets.symmetric(horizontal: 4.0),
                height: 8.0,
                width: _currentPageIndex == index ? 16.0 : 8.0,
                decoration: BoxDecoration(
                  color: _currentPageIndex == index ? Colors.blue : Colors.grey,
                  borderRadius: BorderRadius.circular(4.0),
                ),
              );
            }),
          ),
          SizedBox(height: 10),
        ],
      ),
    );
  }
}
