import 'package:flutter/material.dart';

class BaseStoreProvider extends ChangeNotifier {
  Map<String, dynamic>? userProfileInfo;
  bool isProfileLoading = false;

  updateUserProfileInfo(Map<String, dynamic> userProfileInfo) {
    this.userProfileInfo = userProfileInfo;
    notifyListeners();
  }

  updateIsProfileLoadingStatus(bool cond) {
    isProfileLoading = cond;
    notifyListeners();
  }
}
