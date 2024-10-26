import 'package:flutter/material.dart';

class Categories extends StatelessWidget {
  const Categories({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Categories',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          GridView.count(
            crossAxisCount: 3,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            children: [
              _buildCategoryCard(
                  'BattleRoyal', 'assets/BattleRoyal/battleRoyal.jpg'),
              _buildCategoryCard('PC Games', 'assets/feature.jpg'),
              _buildCategoryCard('Board Games', 'assets/feature.jpg'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(String title, String imagePath) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(8), // Added margin for category cards
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Column(
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(imagePath,
                  fit: BoxFit.cover), // Fixed height image
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              title,
              style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold), // Decreased font size
            ),
          ),
        ],
      ),
    );
  }
}
