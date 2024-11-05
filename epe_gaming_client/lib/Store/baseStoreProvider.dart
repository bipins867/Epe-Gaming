import 'package:flutter/material.dart';

class BaseStoreProvider extends ChangeNotifier {
  Map<String, dynamic>? userProfileInfo;

  updateUserProfileInfo(Map<String, dynamic> userProfileInfo) {
    this.userProfileInfo = userProfileInfo;
    notifyListeners();
  }
}
