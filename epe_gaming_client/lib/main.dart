import 'package:epe_gaming_client/Components/Auth/Login/login.dart';
import 'package:epe_gaming_client/Components/LoadingScreen/loadingScreen.dart';
import 'package:epe_gaming_client/Components/base.dart';
import 'package:epe_gaming_client/Store/baseStoreProvider.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';
import 'package:epe_gaming_client/Components/Home/Notifications/notifications.dart'; // Import NotificationsPage

// Define background message handler
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  CustomLogger.logInfo("Handling a background message: ${message.messageId}");
}

Future<void> main() async {
  // Load environment variables
  await dotenv.load(fileName: '.env');
  await AppConfig.initializeAppInformation();

  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  // Set up Firebase Messaging
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  await setupFirebaseMessaging(); // Set up foreground messaging

  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(
        create: (context) => BaseStoreProvider(),
      )
    ],
    child: MyApp(),
  ));
}

// Firebase Messaging setup
Future<void> setupFirebaseMessaging() async {
  FirebaseMessaging messaging = FirebaseMessaging.instance;

  // Request permissions for iOS (Optional, for Android 13+ too)
  await messaging.requestPermission(
    alert: true,
    badge: true,
    sound: true,
  );

  // Get the FCM token
  String? token = await messaging.getToken();
  AppConfig.setLocalStorageItem('fcmToken', token ?? '');
  AppConfig.fcmToken = token ?? '';

  CustomLogger.logWarning(token ?? '');

  // Handle foreground notifications
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    if (message.notification != null) {
      // Show in-app alert or update the UI as needed
      CustomLogger.logInfo(
          "Foreground notification: ${message.notification!.title}, ${message.notification!.body}");

      // Optionally navigate to NotificationsPage when the notification icon is clicked
      if (navigatorKey.currentState != null) {
        navigatorKey.currentState!.push(
          MaterialPageRoute(builder: (context) => NotificationsPage()),
        );
      }
    }
  });

  // Handle notification taps when the app is in the background or terminated
  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
    CustomLogger.logInfo("Notification clicked when app is in background!");
    // Navigate to the NotificationsPage when a notification is opened
    navigatorKey.currentState
        ?.push(MaterialPageRoute(builder: (context) => NotificationsPage()));
  });
}

final GlobalKey<NavigatorState> navigatorKey =
    GlobalKey<NavigatorState>(); // Global navigator key

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Pro Player League",
      debugShowCheckedModeBanner: false,
      navigatorKey: navigatorKey, // Assign the global navigator key

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
