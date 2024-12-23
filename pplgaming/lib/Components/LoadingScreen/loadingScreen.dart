import 'package:flutter/material.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

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
  final Connectivity _connectivity = Connectivity();

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _fadeAnimation =
        CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut);

    _checkConnectivityAndStartAnimation();
  }

  Future<void> _checkConnectivityAndStartAnimation() async {
    final List<ConnectivityResult> result =
        await _connectivity.checkConnectivity();

    if (!(result.contains(ConnectivityResult.mobile) ||
        result.contains(ConnectivityResult.wifi) ||
        result.contains(ConnectivityResult.ethernet))) {
      // Redirect to noInternet page if there's no connection
      Navigator.pushNamedAndRemoveUntil(
          context, '/noInternet', (Route<dynamic> route) => false);
    } else {
      // Start animation sequence if internet is available
      _startAnimationSequence();
    }
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
    await _changeScreen();
  }

  _changeScreen() async {
    dynamic cond = await _fetchAppInfo();

    if (cond != null) {
      return;
    }

    String path = '/login';

    if (AppConfig.authToken != null) {
      path = '/';
    }

    Navigator.pushNamedAndRemoveUntil(
        context, path, (Route<dynamic> route) => false);
  }

  _fetchAppInfo() async {
    try {
      dynamic response = await getRequest(
        'app/getAppInfo',
      );

      if (response['statusCode'] == 200) {
        String version = response['body']['version'];

        if (AppConfig.appVersion != version) {
          Navigator.pushNamedAndRemoveUntil(
              context, '/updateAvailable', (Route<dynamic> route) => false);

          return true;
        }
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    } finally {}
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
