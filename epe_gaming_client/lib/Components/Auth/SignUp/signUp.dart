import 'package:flutter/material.dart';
import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';

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
  bool _isLoading = false;
  CustomLogger? customLogger;
  AppConfig? appConfig;

  @override
  void initState() {
    super.initState();
    appConfig = AppConfig();
    customLogger = CustomLogger();
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
          "SignUp Successfulll!",
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
      customLogger!.logError(error);
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      resizeToAvoidBottomInset:
          true, // Allows the widget to adjust when the keyboard appears
      body: Center(
        child: SingleChildScrollView(
          // Makes the entire widget scrollable
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
                    backgroundImage: NetworkImage(
                      'https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png',
                    ),
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
                    ),
                    obscureText: true,
                  ),
                  SizedBox(height: 16),
                  TextField(
                    controller: _confirmPasswordController,
                    decoration: InputDecoration(
                      labelText: 'Confirm Password',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
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
                      Navigator.pop(context);
                    },
                    child: Text("Already have an account? Login"),
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
