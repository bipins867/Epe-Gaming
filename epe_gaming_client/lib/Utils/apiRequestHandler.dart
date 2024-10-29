import 'dart:convert';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:http/http.dart' as http;

dynamic errorLogger = CustomLogger().logError;

// Function to simulate an alert (errorLoggers to console)
void alertFunction(String message) {
  CustomLogger().logInfo('ALERT: $message');
}

// Handle errors function// Map<int, Function(dynamic)> mapFunction
Future<void> handleErrors(dynamic err,
    {bool log = true, Function(String)? alertFunction}) async {
  String logMessage = '';
  String alertMessage = '';

  // Check if the error has no response (network/server issue)
  if (err is Exception) {
    logMessage = "Network error or server is not responding: ${err.toString()}";
    alertMessage =
        "Network error or server is not responding. Please try again later.";
  } else {
    // Assume `err` has a response property
    dynamic response = err['body'];

    // Check if response exists
    if (response != null) {
      // Check if the response contains specific error details
      if (response['errors'] != null) {
        alertMessage = "Please fix the following errors:\n";
        response['errors'].forEach((key, value) {
          alertMessage += '$value\n';
        });
      } else if (response['message'] != null) {
        alertMessage = response['message']; // Message from server
      } else if (response['error'] != null) {
        alertMessage = response['error']; // Error message from server
      } else {
        alertMessage = "An unexpected error occurred. Please try again.";
      }

      logMessage =
          "Status: ${err["statusCode"]}  Error response: ${jsonEncode(response)}";

      // Log the error if log argument is true and logMessage exists
      if (log) {
        errorLogger(logMessage);
      }

      // Call the alertFunction if it exists and alertMessage has content
      if (alertFunction != null) {
        alertFunction(alertMessage);
      }
    }
  }
}

// Type alias for error callback function
typedef ErrorCallback = void Function(dynamic error);

// Function to retrieve token from local storage
String? getTokenHeaders() {
  return AppConfig().getLocalStorageItem('token');
}

// GET request without token
Future<Map<String, dynamic>> getRequest(String url) async {
  url = AppConfig().baseUrl + url;

  dynamic response = await http.get(Uri.parse(url));

  dynamic bodyResponse = jsonDecode(response.body);

  return {"body": bodyResponse, "statusCode": response.statusCode};
}

// POST request without token
Future<Map<String, dynamic>> postRequest(
    String url, Map<String, dynamic>? body) async {
  url = AppConfig().baseUrl + url;

  dynamic response = await http.post(
    Uri.parse(url),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode(body ?? {}),
  );

  dynamic bodyResponse = jsonDecode(response.body);

  return {"body": bodyResponse, "statusCode": response.statusCode};
}

// GET request with token in headers
Future<Map<String, dynamic>> getRequestWithToken(String url) async {
  url = AppConfig().baseUrl + url;

  String? token = getTokenHeaders();

  dynamic response = await http.get(
    Uri.parse(url),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "$token", // Assuming Bearer token is needed
    },
  );

  dynamic bodyResponse = jsonDecode(response.body);

  return {"body": bodyResponse, "statusCode": response.statusCode};
}

// POST request with token in headers
Future<Map<String, dynamic>> postRequestWithToken(
    String url, Map<String, dynamic>? body) async {
  url = AppConfig().baseUrl + url;

  String? token = getTokenHeaders();

  dynamic response = await http.post(
    Uri.parse(url),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "$token", // Assuming Bearer token is needed
    },
    body: jsonEncode(body ?? {}),
  );

  dynamic bodyResponse = jsonDecode(response.body);

  return {"body": bodyResponse, "statusCode": response.statusCode};
}
