import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppConfig {
  // Static instance variables
  static late String remoteAddr;
  static late String? authToken;
  static late String baseUrl;

  static SharedPreferences? preferences;
  static CustomLogger? customLogger;

  // Static async initialization function
  static Future<void> initializeAppInformation() async {
    // Load environment-dependent address
    remoteAddr = dotenv.env['REMOTE_ADDRESS']!;

    // Initialize SharedPreferences
    preferences = await SharedPreferences.getInstance();
    baseUrl = '$remoteAddr/';
    customLogger = CustomLogger();

    String? token = getLocalStorageItem('authToken');

    authToken = token;
  }

  // Static methods for SharedPreferences
  static Future<void> setLocalStorageItem(String key, String val) async {
    await preferences!.setString(key, val);
  }

  static String? getLocalStorageItem(String key) {
    return preferences!.getString(key);
  }

  static void removeLocalStorageItem(String key) {
    preferences!.remove(key);
  }

  static String? getAuthToken() {
    if (authToken != null) {
      return authToken;
    } else {
      return null;
    }
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
