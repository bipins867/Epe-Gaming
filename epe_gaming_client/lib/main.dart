import 'package:epe_gaming_client/Components/LoadingScreen/loadingScreen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LoadingScreenPage(),
      title: "EPE Gaming",
      debugShowCheckedModeBanner: false,
    );
  }
}
