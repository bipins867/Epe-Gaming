import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppConfig {
  static final AppConfig _instance = AppConfig._internal();

  // Singleton factory constructor
  factory AppConfig() => _instance;

  // Private internal constructor
  AppConfig._internal();

  late String remoteAddr;
  late String authToken;
  late String baseUrl;

  SharedPreferences? preferences;
  CustomLogger? customLogger;

  // Async initialization function
  Future<void> initializeAppInformation() async {
    // Load environment-dependent address
    remoteAddr = dotenv.env['REMOTE_ADDRESS']!;

    // Initialize SharedPreferences
    preferences = await SharedPreferences.getInstance();
    baseUrl = '$remoteAddr/';
    customLogger = CustomLogger();

    String? token = getLocalStorageItem('token');

    if (token != null) {
      authToken = token;
    }
  }

  // Set and get methods for SharedPreferences
  Future<void> setLocalStorageItem(String key, String val) async {
    await preferences!.setString(key, val);
  }

  String? getLocalStorageItem(String key) {
    return preferences!.getString(key);
  }
}

class CustomLogger {
  // Create a logger instance
  final Logger _logger = Logger();

  // Method to log messages based on the environment
  void logDebug(String message) {
    if (kDebugMode) {
      _logger.d(message); // Log debug messages only in debug mode
    }
  }

  void logInfo(String message) {
    if (kDebugMode) {
      _logger.i(message); // Log info messages only in debug mode
    }
  }

  void logWarning(String message) {
    if (kDebugMode) {
      _logger.w(message); // Log warning messages only in debug mode
    }
  }

  void logError(String message) {
    if (kDebugMode) {
      _logger.e(message); // Log error messages only in debug mode
    }
  }
}
