import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class LoadingScreenPage extends StatefulWidget {
  const LoadingScreenPage({super.key});

  @override
  State<LoadingScreenPage> createState() => _LoadingScreenPageState();
}

class _LoadingScreenPageState extends State<LoadingScreenPage>
    with TickerProviderStateMixin {
  // Animation controllers for the logo and the "Powered by" text
  late AnimationController _logoController;
  late Animation<double> _logoAnimation;

  @override
  void initState() {
    super.initState();
    _logoController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this, // TickerProviderStateMixin provides the vsync
    );

    _logoAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.easeInOut),
    );

    // Start the animation
    _logoController.forward();

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
  void dispose() {
    _logoController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: FadeTransition(
            opacity: _logoAnimation,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo image with scaling animation
                ScaleTransition(
                  scale: _logoAnimation,
                  child: Image.asset(
                    'assets/Home/epe-logo.png',
                    height: 200,
                  ),
                ),
                SizedBox(height: 20),
                // "Powered by" text with scaling effect
                ScaleTransition(
                  scale: _logoAnimation,
                  child: Text(
                    'Powered by',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueAccent,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
