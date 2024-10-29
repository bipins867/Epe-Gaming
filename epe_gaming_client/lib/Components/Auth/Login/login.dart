import 'package:epe_gaming_client/Components/Auth/SignUp/signUp.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:flutter/material.dart';

// Login Page
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _mobileController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false; // State variable for loading
  CustomLogger? customLogger;
  AppConfig? appConfig;
  @override
  void initState() {
    appConfig = AppConfig();
    customLogger = CustomLogger();
    super.initState();
  }

  void loginHandler() async {
    if (_mobileController.text == '') {
      return showInfoAlertDialog(context, "Please enter the mobile Number!",
          type: "Required!");
    }
    if (_passwordController.text == '') {
      return showInfoAlertDialog(context, "Please enter the password!",
          type: "Required!");
    }
    // Show loading indicator
    setState(() {
      _isLoading = true;
    });

    // Example API requestfgdgdg
    try {
      Map<String, String> body = {
        "phone": _mobileController.text,
        "password": _passwordController.text
      };
      dynamic response = await postRequest(
        'user/auth/login',
        body,
      );

      if (response['statusCode'] == 200) {
        AppConfig.setLocalStorageItem('authToken', response['body']['token']);
        Navigator.of(context).pushNamedAndRemoveUntil(
          '/', // Navigates to the base route
          (Route<dynamic> route) =>
              false, // Removes all previous routes from the stack
        );
      } else {
        handleErrors(response, alertFunction: (string) {
          showErrorAlertDialog(context, string);
        });
      }
    } catch (e) {
      // Handle exceptions
      String error = 'System Error: ${e.toString()}';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      customLogger!.logError(error);
    } finally {
      // Hide loading indicator
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200], // Background color for contrast
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Card(
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16.0),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Logo
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: NetworkImage(
                      'https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png', // Placeholder image
                    ),
                  ),
                  SizedBox(height: 24),
                  // Mobile Number Field
                  TextField(
                    controller: _mobileController,
                    decoration: InputDecoration(
                      labelText: 'Mobile Number',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.phone,
                  ),
                  SizedBox(height: 16),
                  // Password Field
                  TextField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
                  ),
                  SizedBox(height: 16),
                  // Login Button
                  ElevatedButton(
                    onPressed: _isLoading
                        ? null
                        : loginHandler, // Disable button during loading
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(
                          vertical: 12.0, horizontal: 40.0),
                    ),
                    child: _isLoading
                        ? CircularProgressIndicator(
                            color: Colors.white) // Show loading indicator
                        : Text('Login'),
                  ),
                  SizedBox(height: 8),
                  // Link to SignUp Page
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => SignUpPage()),
                      );
                    },
                    child: Text("Don't have an account? Sign Up"),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
