import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class LoadingScreenPage extends StatefulWidget {
  const LoadingScreenPage({super.key});

  @override
  State<LoadingScreenPage> createState() => _LoadingScreenPageState();
}

class _LoadingScreenPageState extends State<LoadingScreenPage>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  bool showFirstImage = true;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _fadeAnimation =
        CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut);

    _startAnimationSequence();
  }

  void _startAnimationSequence() async {
    // First image fade in
    await _fadeController.forward();
    await Future.delayed(const Duration(seconds: 2));

    // First image fade out
    await _fadeController.reverse();
    setState(() {
      showFirstImage = false;
    });

    // Second image fade in
    await _fadeController.forward();
    await Future.delayed(const Duration(seconds: 2));

    // Navigate to the next screen after the splash
    _changeScreen();
  }

  _changeScreen() {
    String path = '/login';

    if (AppConfig.authToken != null) {
      path = '/';
    }

    Navigator.pushNamedAndRemoveUntil(
        context, path, (Route<dynamic> route) => false);
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (showFirstImage) ...[
                  // First image with the "Win Exciting Rewards" text below
                  Image.asset(
                    'assets/Home/ppl-logo-half.png',
                    height: 200,
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'Win Exciting Rewards',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueAccent,
                    ),
                  ),
                ] else ...[
                  // Second image with "Powered by" above and "Unit of Techfin Innovations" below
                  const Text(
                    'Powered by',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueAccent,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Image.asset(
                    'assets/Home/epe-logo.png',
                    height: 200,
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'Unit of Techfin Innovations',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
