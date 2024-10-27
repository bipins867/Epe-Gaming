import 'package:flutter/material.dart';

class ImageSlider extends StatefulWidget {
  const ImageSlider({super.key});

  @override
  State<ImageSlider> createState() => _ImageSliderState();
}

class _ImageSliderState extends State<ImageSlider> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    // Auto-scroll functionality
    Future.delayed(Duration(seconds: 2), _autoScroll);
  }

  void _autoScroll() {
    if (_pageController.hasClients) {
      if (_currentIndex < 3) {
        _currentIndex++;
      } else {
        _currentIndex = 0;
      }
      _pageController.animateToPage(
        _currentIndex,
        duration: Duration(milliseconds: 300),
        curve: Curves.easeIn,
      );
    }
    // Schedule next auto-scroll
    Future.delayed(Duration(seconds: 2), _autoScroll);
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200, // Fixed height for the slider
      child: Column(
        children: [
          Expanded(
            child: PageView(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              children: [
                _buildImageCard('assets/BGMI/bgmi1.jpg'),
                _buildImageCard('assets/BGMI/bgmi2.jpg'),
                _buildImageCard('assets/BGMI/bgmi3.jpg'),
                _buildImageCard('assets/BGMI/bgmi4.jpg'),
              ],
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          // Dots Indicator
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(4, (index) {
              return Container(
                margin: EdgeInsets.symmetric(horizontal: 4),
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: _currentIndex == index ? Colors.blue : Colors.grey,
                  shape: BoxShape.circle,
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildImageCard(String imagePath) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 8),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: Image.asset(imagePath, fit: BoxFit.cover),
      ),
    );
  }
}
