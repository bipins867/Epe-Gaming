import 'dart:io';

import 'package:epe_gaming_client/Utils/alertHandler.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:epe_gaming_client/Store/baseStoreProvider.dart';
import 'package:epe_gaming_client/Utils/apiRequestHandler.dart';

class UserProfileApiHandler {
  static Future<void> updateProfileInfo(BuildContext context) async {
    // Get the provider instance outside the async call
    final provider = Provider.of<BaseStoreProvider>(context, listen: false);

    try {
      dynamic response = await getRequestWithToken('user/info/profileInfo');

      if (response['statusCode'] == 200) {
        Map<String, dynamic> responseBody = {
          "userProfile": response['body']['profileInfo'],
          "statusInfo": response['body']['statusInfo']
        };

        // Use the captured provider
        provider.updateUserProfileInfo(responseBody);
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      String error = 'System Error: ${e.toString()}';
      handleErrors(context, error);
    }
  }

  static Future<void> uploadProfileImage(
      BuildContext context, File? _imageFile) async {
    try {
      dynamic response =
          await uploadImageHandler('user/info/updateProfileImage', _imageFile!);

      if (response['statusCode'] == 200) {
        updateProfileInfo(context);
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  static Future<void> updateProfile(
      BuildContext context, String name, String email) async {
    try {
      dynamic response = await postRequestWithToken(
        'user/info/updateProfileInfo',
        {
          'name': name,
          'email': email,
        },
      );

      if (response['statusCode'] == 200) {
        updateProfileInfo(context);
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  static Future<void> resetPassword(
      BuildContext context, String oldPassword, String newPassword) async {
    try {
      dynamic response = await postRequestWithToken(
        'user/auth/changePassword',
        {
          'oldPassword': oldPassword,
          'newPassword': newPassword,
        },
      );

      if (response['statusCode'] == 200) {
        updateProfileInfo(context);
        showInfoAlertDialog(context, "Info updated!");
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  static Future<void> updateKyc(BuildContext context, panNumber) async {
    try {
      dynamic response = await postRequestWithToken(
        'user/kyc/update',
        {'panNumber': panNumber},
      );

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, 'KYC updated successfully.');
        updateProfileInfo(context);
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }

  static Future<void> updateBankStatus(
      BuildContext context, Map<String, dynamic> requestData) async {
    try {
      dynamic response =
          await postRequestWithToken('user/bankDetails/update', requestData);

      if (response['statusCode'] == 200) {
        showInfoAlertDialog(context, 'Bank details updated successfully.');
        updateProfileInfo(context);
      } else {
        handleErrors(context, response);
      }
    } catch (e) {
      handleErrors(context, {'body': 'System error: ${e.toString()}'});
    }
  }
}
