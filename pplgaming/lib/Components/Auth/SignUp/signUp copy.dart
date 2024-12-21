import 'package:flutter/material.dart';
import 'package:pplgaming/Utils/alertHandler.dart';
import 'package:pplgaming/Utils/apiRequestHandler.dart';
import 'package:pplgaming/Utils/appConfig.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  final TextEditingController _referralCodeController = TextEditingController();

  bool _isLoading = false;
  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;
  bool _showReferralBox = false; // To toggle referral code box visibility
  String? _referralName; // To store referral name

  AppConfig? appConfig;

  @override
  void initState() {
    super.initState();
    appConfig = AppConfig();
  }

  void signUpHandler() async {
    if (_nameController.text.isEmpty) {
      return showInfoAlertDialog(context, "Name as on your PAN Card!",
          type: "Required!");
    }
    if (_emailController.text.isEmpty) {
      return showInfoAlertDialog(context, "Please enter your email!",
          type: "Required!");
    }
    if (_phoneController.text.isEmpty) {
      return showInfoAlertDialog(context, "Please enter your phone number!",
          type: "Required!");
    }
    if (_passwordController.text.isEmpty) {
      return showInfoAlertDialog(context, "Please enter your password!",
          type: "Required!");
    }
    if (_confirmPasswordController.text != _passwordController.text) {
      return showInfoAlertDialog(context, "Passwords do not match!",
          type: "Error!");
    }

    setState(() {
      _isLoading = true;
    });

    try {
      Map<String, String> body = {
        "name": _nameController.text,
        "email": _emailController.text,
        "phone": _phoneController.text,
        "password": _passwordController.text
      };

      dynamic response = await postRequest(
        'user/auth/signUp',
        body,
      );

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(
          context,
          "SignUp Successful!",
          callbackFunction: () {
            Navigator.pop(context);
          },
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

  void verifyReferralCode() async {
    if (_referralCodeController.text.isEmpty) {
      return showInfoAlertDialog(context, "Please enter a Referral Code!",
          type: "Required!");
    }

    setState(() {
      _isLoading = true;
    });

    try {
      // dynamic response = await postRequest(
      //   'user/auth/verifyReferral',
      //   {"referralId": _referralCodeController.text},
      // );

      // if (response['statusCode'] == 200) {
      //   setState(() {
      //     _referralName = response['data']['name'];
      //   });
      // } else {
      //   setState(() {
      //     _referralName = "Invalid Referral Code!";
      //   });
      // }
      setState(() {
        _referralName = "Bipin Singh";
      });
    } catch (e) {
      showInfoAlertDialog(context, "Error verifying referral code!",
          type: "Error!");
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/Background/bgmi-event.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
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
                      controller: _nameController,
                      decoration: InputDecoration(
                        labelText: 'Name as on your PAN',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 16),
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.emailAddress,
                    ),
                    SizedBox(height: 16),
                    TextField(
                      controller: _phoneController,
                      decoration: InputDecoration(
                        labelText: 'Phone',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.phone,
                    ),
                    SizedBox(height: 16),
                    TextField(
                      controller: _passwordController,
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
                      obscureText: !_isPasswordVisible,
                    ),
                    SizedBox(height: 16),
                    TextField(
                      controller: _confirmPasswordController,
                      decoration: InputDecoration(
                        labelText: 'Confirm Password',
                        border: OutlineInputBorder(),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _isConfirmPasswordVisible
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                          onPressed: () {
                            setState(() {
                              _isConfirmPasswordVisible =
                                  !_isConfirmPasswordVisible;
                            });
                          },
                        ),
                      ),
                      obscureText: !_isConfirmPasswordVisible,
                    ),
                    SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: _isLoading ? null : signUpHandler,
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(
                            vertical: 12.0, horizontal: 40.0),
                      ),
                      child: _isLoading
                          ? CircularProgressIndicator(color: Colors.white)
                          : Text('Sign Up'),
                    ),
                    SizedBox(height: 16),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _showReferralBox = !_showReferralBox;
                        });
                      },
                      child: Text("Have Referral Code?"),
                    ),
                    if (_showReferralBox)
                      Column(
                        children: [
                          TextField(
                            controller: _referralCodeController,
                            decoration: InputDecoration(
                              labelText: 'Referral Code',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: verifyReferralCode,
                            child: _isLoading
                                ? CircularProgressIndicator(color: Colors.white)
                                : Text("Verify"),
                          ),
                          SizedBox(height: 8),
                          if (_referralName != null)
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  _referralName!,
                                  style: TextStyle(
                                    color: _referralName ==
                                            "Invalid Referral Code!"
                                        ? Colors.red
                                        : Colors.green,
                                  ),
                                ),
                                IconButton(
                                  icon: Icon(Icons.close, color: Colors.grey),
                                  onPressed: () {
                                    setState(() {
                                      _referralCodeController.clear();
                                      _referralName = null;
                                    });
                                  },
                                ),
                              ],
                            ),
                        ],
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
