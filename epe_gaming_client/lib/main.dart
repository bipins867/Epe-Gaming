import 'package:epe_gaming_client/Components/base.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BaseScreen(),
      title: "EPE Gaming",
      debugShowCheckedModeBanner: false,
    );
  }
}
