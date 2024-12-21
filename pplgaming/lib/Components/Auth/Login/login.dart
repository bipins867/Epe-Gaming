import 'package:pplgaming/Components/Auth/OtpVerify/otpVerify.dart';
import 'package:pplgaming/Components/Auth/SignUp/signUp.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _mobileController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false; // State variable for loading
  bool _isPasswordVisible = false; // State variable for password visibility

  AppConfig? appConfig;

  @override
  void initState() {
    appConfig = AppConfig();
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

    setState(() {
      _isLoading = true;
    });

    try {
      Map<String, String> body = {
        "phone": _mobileController.text,
        "password": _passwordController.text,
        "fcmToken": AppConfig.fcmToken,
        "otpType": "login",
      };
      String url = 'user/auth/login';
      dynamic response = await postRequest(
        url,
        body,
      );

      if (response['statusCode'] == 200) {
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => OtpVerifyPage(
                    otpType: "login",
                    url: url,
                    phone: _mobileController.text,
                    otpAuthenticationToken: response['body']
                        ['otpAuthenticationToken'],
                  )),
        );
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
      CustomLogger.logError(error);
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background image
          Positioned.fill(
            child: Image.asset(
              'assets/Background/bgmi-event.jpg', // Replace with your background image path
              fit: BoxFit.cover,
            ),
          ),
          // Content on top of the background image
          Center(
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
                      CircleAvatar(
                        radius: 50,
                        backgroundImage:
                            AssetImage('assets/Home/ppl-logo-half.png'),
                      ),
                      SizedBox(height: 24),
                      TextField(
                        controller: _mobileController,
                        decoration: InputDecoration(
                          labelText: 'Mobile Number',
                          border: OutlineInputBorder(),
                        ),
                        keyboardType: TextInputType.phone,
                      ),
                      SizedBox(height: 16),
                      TextField(
                        controller: _passwordController,
                        obscureText: !_isPasswordVisible,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          border: OutlineInputBorder(),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _isPasswordVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                            ),
                            onPressed: () {
                              setState(() {
                                _isPasswordVisible = !_isPasswordVisible;
                              });
                            },
                          ),
                        ),
                      ),
                      SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _isLoading ? null : loginHandler,
                        style: ElevatedButton.styleFrom(
                          padding: EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 40.0),
                        ),
                        child: _isLoading
                            ? CircularProgressIndicator(color: Colors.white)
                            : Text('Login'),
                      ),
                      SizedBox(height: 8),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => SignUpPage()),
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
        ],
      ),
    );
  }
}
