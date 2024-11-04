import 'dart:io';

import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';
import 'package:epe_gaming_client/Utils/appConfig.dart';
import 'package:epe_gaming_client/Utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class MyProfilePage extends StatefulWidget {
  final Map<String, dynamic>? profileInfo;

  const MyProfilePage({super.key, required this.profileInfo});

  @override
  _MyProfilePageState createState() => _MyProfilePageState();
}

class _MyProfilePageState extends State<MyProfilePage> {
  late TextEditingController nameController;
  late TextEditingController emailController;
  late TextEditingController oldPasswordController;
  late TextEditingController newPasswordController;
  late TextEditingController confirmPasswordController;
  File? _imageFile;

  @override
  void initState() {
    super.initState();
    nameController = TextEditingController(text: widget.profileInfo?['name']);
    emailController = TextEditingController(text: widget.profileInfo?['email']);
    oldPasswordController = TextEditingController();
    newPasswordController = TextEditingController();
    confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    oldPasswordController.dispose();
    newPasswordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    try {
      final picker = ImagePicker();
      XFile? pickedFile = await picker.pickImage(source: ImageSource.gallery);

      if (pickedFile != null) {
        pickedFile = await compressImage(pickedFile);

        _imageFile = File(pickedFile!.path);

        await _uploadProfileImage(); // Make sure you implement this method
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  Future<void> _uploadProfileImage() async {
    try {
      dynamic response =
          await uploadImageHandler('user/info/updateProfileImage', _imageFile!);

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  Future<void> _updateProfile() async {
    try {
      dynamic response = await postRequestWithToken(
        'user/info/updateProfileInfo',
        {
          'name': nameController.text,
          'email': emailController.text,
        },
      );

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  Future<void> _resetPassword() async {
    if (newPasswordController.text != confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Passwords do not match")),
      );
      return;
    }

    try {
      dynamic response = await postRequestWithToken(
        'user/auth/changePassword',
        {
          'oldPassword': oldPasswordController.text,
          'newPassword': newPasswordController.text,
        },
      );

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  @override
  Widget build(BuildContext context) {
    String baseImageUrl = AppConfig.fileBaseUrl;

    String profileUrl =
        widget.profileInfo?['profileUrl'] ?? ''; // URL of the profile image

    if (profileUrl != '') {
      profileUrl = '$baseImageUrl$profileUrl';
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Information Card with Update Feature
            Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8.0),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Text(
                      'Profile Information',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    GestureDetector(
                      onTap: _pickImage,
                      child: Stack(
                        children: [
                          CircleAvatar(
                            radius: 40,
                            backgroundColor: Colors.grey.shade300,
                            backgroundImage: profileUrl.isNotEmpty
                                ? NetworkImage(profileUrl)
                                : null, // Load image from URL
                            child: profileUrl.isEmpty
                                ? const Icon(
                                    Icons.person,
                                    size: 40,
                                    color: Colors.blue,
                                  )
                                : null, // Show icon if no image is available
                          ),
                          Positioned(
                            bottom: 0,
                            right: 0,
                            child: Container(
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.white,
                              ),
                              padding: const EdgeInsets.all(4),
                              child: Icon(
                                Icons.edit,
                                color: Colors.blue,
                                size: 20,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildInfoRow('Customer ID:',
                        widget.profileInfo?['customerId'] ?? 'N/A'),
                    _buildInfoRow(
                        'Phone Number:', widget.profileInfo?['phone'] ?? 'N/A'),
                    const SizedBox(
                      height: 16,
                    ),
                    TextField(
                      controller: nameController,
                      decoration: const InputDecoration(labelText: 'Name'),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: emailController,
                      decoration: const InputDecoration(labelText: 'Email'),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _updateProfile,
                      child: const Text('Update Profile'),
                    ),
                  ],
                ),
              ),
            ),

            // Account Status Information
            Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8.0),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Account Status',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    _buildInfoRow('Bank Status:',
                        widget.profileInfo?['bankStatus'] ?? 'N/A'),
                    _buildInfoRow('KYC Status:',
                        widget.profileInfo?['kycStatus'] ?? 'N/A'),
                  ],
                ),
              ),
            ),

            // Reset Password Section
            Card(
              elevation: 4,
              margin: const EdgeInsets.symmetric(vertical: 8.0),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Reset Password',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: oldPasswordController,
                      decoration: const InputDecoration(
                        labelText: 'Old Password',
                        border: OutlineInputBorder(),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: newPasswordController,
                      decoration: const InputDecoration(
                        labelText: 'New Password',
                        border: OutlineInputBorder(),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: confirmPasswordController,
                      decoration: const InputDecoration(
                        labelText: 'Confirm Password',
                        border: OutlineInputBorder(),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _resetPassword,
                      child: const Text('Reset Password'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helper method to create information rows with default 'N/A' for null values
  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 16)),
          Text(value, style: const TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}
