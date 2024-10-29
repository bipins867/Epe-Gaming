import 'package:epe_gaming_client/Components/Auth/Login/login.dart';
import 'package:epe_gaming_client/Components/LoadingScreen/loadingScreen.dart';
import 'package:epe_gaming_client/Components/base.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  await dotenv.load(fileName: '.env'); // Load environment variables
  await AppConfig().initializeAppInformation(); // Initialize AppConfig
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "EPE Gaming",
      debugShowCheckedModeBanner: false,
      initialRoute: '/splash', // Sets the initial route to the splash screen

      // Defining routes for each screen
      routes: {
        '/': (context) => BaseScreen(), // Home route
        '/login': (context) => LoginPage(), // Login route
        '/splash': (context) => LoadingScreenPage(), // Splash route
      },
    );
  }
}
