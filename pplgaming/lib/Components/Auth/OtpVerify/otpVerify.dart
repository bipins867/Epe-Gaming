import 'dart:async';
import 'package:flutter/material.dart';
import 'package:pplgaming/Components/Auth/Login/login.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

class OtpVerifyPage extends StatefulWidget {
  final String otpType;
  final String phone;
  final String otpAuthenticationToken;
  final String url;

  const OtpVerifyPage(
      {super.key,
      required this.url,
      required this.phone,
      required this.otpType,
      required this.otpAuthenticationToken});

  @override
  _OtpVerifyPageState createState() => _OtpVerifyPageState();
}

class _OtpVerifyPageState extends State<OtpVerifyPage> {
  int _start = 10;
  bool _resendEnabled = false;
  late Timer _timer;
  bool _isResendLoading = false;
  bool _isVerifyLoading = false;
  final TextEditingController _otpController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    _start = 10;
    _resendEnabled = false;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_start == 0) {
        setState(() {
          _resendEnabled = true;
        });
        _timer.cancel();
      } else {
        setState(() {
          _start--;
        });
      }
    });
  }

  Future<void> _resendOtpHandler() async {
    setState(() {
      _isResendLoading = true;
    });
    try {
      Map<String, String> body = {
        "otpAuthenticationToken": widget.otpAuthenticationToken,
        "otpType": widget.otpType,
      };
      String url = 'user/auth/resendOtp';
      dynamic response = await postRequest(
        url,
        body,
      );

      if (response['statusCode'] == 200) {
        startTimer();
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
    } finally {
      setState(() {
        _isResendLoading = false;
      });
    }
  }

  Future<void> _verifyOtpHandler() async {
    setState(() {
      _isVerifyLoading = true;
    });
    try {
      Map<String, String> body = {
        "otpAuthenticationToken": widget.otpAuthenticationToken,
        "otpType": widget.otpType,
        "userPhoneOtp": _otpController.text, // OTP passed from input
      };

      // If OTP type is forgetPassword, add password and confirm password to the body
      if (widget.otpType == 'forgetPassword') {
        String password = body['password'] = _passwordController.text;
        String confimPassword =
            body['confirmPassword'] = _confirmPasswordController.text;

        if (password != confimPassword) {
          showErrorAlertDialog(context, "Password don't Match!");
          return;
        }

        // Check if password meets strength requirements (optional)
        if (password.length < 6) {
          showErrorAlertDialog(
              context, "Password must be at least 6 characters long.");
          return;
        }
      }

      dynamic response = await postRequest(
        widget.url,
        body,
      );

      if (response['statusCode'] == 200) {
        if (widget.otpType == 'login') {
          AppConfig.setLocalStorageItem('authToken', response['body']['token']);
          Navigator.of(context).pushNamedAndRemoveUntil(
            '/',
            (Route<dynamic> route) => false,
          );
        } else if (widget.otpType == 'signUp') {
          showInfoAlertDialog(
            context,
            "SignUp Successful!",
            callbackFunction: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginPage()),
              );
            },
          );
        } else if (widget.otpType == 'forgetPassword') {
          showInfoAlertDialog(
            context,
            "Password reset successful!",
            callbackFunction: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginPage()),
              );
            },
          );
        }
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
    } finally {
      setState(() {
        _isVerifyLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _timer.cancel();
    _otpController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      body: Stack(
        children: [
          // Background image
          Positioned.fill(
            child: Image.asset(
              'assets/Background/bgmi-event.jpg',
              fit: BoxFit.cover,
            ),
          ),
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
                      // Logo
                      const CircleAvatar(
                        radius: 50,
                        backgroundImage: AssetImage(
                            'assets/Home/ppl-logo-half.png'), // Placeholder image
                      ),
                      const SizedBox(height: 24),
                      // OTP Input Field
                      TextField(
                        controller: _otpController,
                        decoration: const InputDecoration(
                          labelText: 'Enter OTP',
                          border: OutlineInputBorder(),
                        ),
                        keyboardType: TextInputType.number,
                      ),
                      const SizedBox(height: 16),
                      // Password and Confirm Password Fields for 'forgetPassword' otpType
                      if (widget.otpType == 'forgetPassword') ...[
                        TextField(
                          controller: _passwordController,
                          decoration: const InputDecoration(
                            labelText: 'New Password',
                            border: OutlineInputBorder(),
                          ),
                          obscureText: true,
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _confirmPasswordController,
                          decoration: const InputDecoration(
                            labelText: 'Confirm Password',
                            border: OutlineInputBorder(),
                          ),
                          obscureText: true,
                        ),
                      ],
                      const SizedBox(height: 16),
                      // Resend Button with Spinner
                      ElevatedButton(
                        onPressed: _resendEnabled && !_isResendLoading
                            ? _resendOtpHandler
                            : null,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 40.0),
                        ),
                        child: _isResendLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : const Text('Resend OTP'),
                      ),
                      // Countdown Timer Text
                      if (!_resendEnabled)
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8.0),
                          child: Text('You can resend OTP in $_start seconds'),
                        ),
                      const SizedBox(height: 16),
                      // Verify Button with Spinner
                      ElevatedButton(
                        onPressed: !_isVerifyLoading ? _verifyOtpHandler : null,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 40.0),
                        ),
                        child: _isVerifyLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : const Text('Verify'),
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
