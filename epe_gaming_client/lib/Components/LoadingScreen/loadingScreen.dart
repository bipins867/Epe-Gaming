import 'package:epe_gaming_client/Utils/appConfig.dart';
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
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _changeScreen();
    });
  }

  _changeScreen() {
    String path = '/login';

    if (AppConfig.authToken != null) {
      path = '/';
    }

    Future.delayed(
      const Duration(seconds: 2),
      () {
        Navigator.pushNamedAndRemoveUntil(
            context, path, (Route<dynamic> route) => false);
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
