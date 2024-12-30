import 'package:pplgaming/Components/Auth/OtpVerify/otpVerify.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';
import 'package:flutter/material.dart';

class ForgetPasswordPage extends StatefulWidget {
  const ForgetPasswordPage({super.key});

  @override
  _ForgetPasswordPageState createState() => _ForgetPasswordPageState();
}

class _ForgetPasswordPageState extends State<ForgetPasswordPage> {
  final TextEditingController _mobileController = TextEditingController();
  bool _isLoading = false;

  AppConfig? appConfig;

  @override
  void initState() {
    appConfig = AppConfig();
    super.initState();
  }

  void forgotPasswordHandler() async {
    if (_mobileController.text == '') {
      return showInfoAlertDialog(
        context,
        "Please enter the mobile Number for OTP!",
        type: "Required!",
      );
    }

    setState(() {
      _isLoading = true;
    });

    try {
      Map<String, String> body = {
        "phone": _mobileController.text,
        "otpType": "forgetPassword", // Pass "forgetPassword" type
      };
      String url = 'user/auth/forgetPassword';
      dynamic response = await postRequest(
        url,
        body,
      );

      if (response['statusCode'] == 200) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OtpVerifyPage(
              otpType: "forgetPassword",
              url: url,
              phone: _mobileController.text,
              otpAuthenticationToken: response['body']
                  ['otpAuthenticationToken'],
            ),
          ),
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
                      // Mobile number input field
                      TextField(
                        controller: _mobileController,
                        decoration: InputDecoration(
                          labelText: 'Mobile Number',
                          border: OutlineInputBorder(),
                        ),
                        keyboardType: TextInputType.phone,
                      ),
                      SizedBox(height: 16),
                      // Button to submit for OTP
                      ElevatedButton(
                        onPressed: _isLoading ? null : forgotPasswordHandler,
                        style: ElevatedButton.styleFrom(
                          padding: EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 40.0),
                        ),
                        child: _isLoading
                            ? CircularProgressIndicator(color: Colors.white)
                            : Text('Request OTP'),
                      ),
                      SizedBox(height: 8),
                      // Link to go to Login page if needed
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text("Back to Login"),
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
