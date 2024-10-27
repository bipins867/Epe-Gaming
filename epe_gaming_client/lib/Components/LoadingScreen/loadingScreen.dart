import 'package:epe_gaming_client/Components/base.dart';
import 'package:flutter/material.dart';

class LoadingScreenPage extends StatefulWidget {
  const LoadingScreenPage({super.key});

  @override
  State<LoadingScreenPage> createState() => _LoadingScreenPageState();
}

class _LoadingScreenPageState extends State<LoadingScreenPage> {
  @override
  void initState() {
    super.initState();
    _changeScreen();
  }

  _changeScreen() {
    Future.delayed(
      const Duration(seconds: 2),
      () {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (context) => const BaseScreen(),
        ));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Image.asset(
            'assets/Home/epe-logo.png',
            height: 200,
          ),
        ),
      ),
    );
  }
}
