import 'package:flutter/material.dart';

class PrivacyPolicyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(16),
      children: [
        Text(
          'Privacy Policy',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Date of Last Update: 06-11-2024',
          style: TextStyle(fontSize: 16, color: Colors.grey[700]),
        ),
        const SizedBox(height: 16),
        sectionOne(),
        sectionTwo(),
        sectionThree(),
        sectionFour(),
        sectionFive(),
        sectionSix(),
        sectionSeven(),
        sectionEight(),
        sectionNine(),
        sectionTen(),
      ],
    );
  }

  Widget sectionOne() {
    return Section(
      title: '1. GENERAL',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              "1.1 Techfin Innovations Private Limited (“PPL”, “We”, “Our”, “Us”) is committed to the protection of personal information provided by the users (“You”, “Your”, “User”) to PPL. You agree that Your use of PPL mobile application (“App”) implies your consent to the collection, retention and use of Your personal information in accordance with the terms of this Privacy Policy (“Privacy Policy”)."),
          bulletPoint(
              "1.2 This Privacy Policy is an electronic record in the form of an electronic contract formed under the information Technology Act, 2000 and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the information Technology Act, 2000. This Privacy Policy does not require any physical, electronic or digital signature and is a legally binding document between You and PPL."),
          bulletPoint(
              "1.3 We take the privacy of Our Users seriously. We are committed to safeguarding the privacy of Our Users while providing a personalized and valuable service."),
          bulletPoint(
              "1.4 No User information is rented or sold to any third party. When You use the App, the App may collect Your device number and other personal information. A high standard of security is maintained by Us for Our Users. However, the transmission of information via the internet or telephone networks is not completely secure. While We do Our best to protect Your information, particularly with respect to protection of Your personal data, PPL cannot ensure the security of Your data transmitted via the internet, telephone or any other networks."),
          bulletPoint(
              '1.5 By visiting the Platform and creating an account on the Platform, You grant PPL and its group companies your irrevocable and informed consent to use your registered mobile number, profile name, profile picture, and Winnings in a Contest and/ or Winnings in total on the Platform (“Your Profile Information“) for advertisements, promotions, offers, and any other sponsored content that PPL and its group companies may display on the Platform or any other marketing channels, including its digital channels, television, print and publication, without requiring any further consent from You and without being required to pay any compensation to You.'),
          bulletPoint(
              "1.6 You further grant to PPL an exclusive, transferable, sub-licensable, royalty-free and worldwide licence to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works from Your Profile Information."),
          bulletPoint(
              "1.7 You understand, represent and accept that Your Profile Information or any related materials will not violate the rights of any third-party rights or give rise to any claim that another party’s rights have been or will be violated as a result of PPL’s use or publication of Your Profile Information. You understand and agree that You will be liable to PPL for any damage or cost (including reasonable attorney fees) it may suffer arising out of its use of Your Profile Information. You also understand that you will not be entitled to receive any royalties for the use of your Profile Information by or through PPL."),
          bulletPoint(
              "1.8 You understand and grant to PPL, its subsidiaries, affiliates, successors and those acting with its authority, with respect to Your Profile Information all copyrights and derivative rights in Your Profile Information and a non-exclusive, perpetual right to use, publish, re-publish or reproduce Your Profile Information by any means PPL sees fit for the purposes stated above."),
          bulletPoint(
              "1.9 By using the Platform, you irrevocably waive any claim against PPL relating to the use of Your Profile Information and promise not to bring any such claim or action in the future. You also waive any right to inspect, modify, approve or disapprove the content, layout, representation, presentation or other aspect of Your Profile Information as recorded by PPL during your use of the Platform."),
          bulletPoint(
              '1.10 Access to the contents available through the App is conditional upon Your approval of this Privacy Policy which should be read together with the terms and conditions of use (“Terms”). You acknowledge that this Privacy Policy, together with our Terms, forms Our agreement with You in relation to Your use of the App (“Agreement”).'),
        ],
      ),
    );
  }

  Widget sectionTwo() {
    return Section(
      title: '2. INFORMATION COLLECTED',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPointHeading('2.1 Traffic Data Collected'),
          bulletPoint(
              "In order to provide the App, we automatically track and collect the following categories of information when You use the App:\n(i) IP addresses;\n(ii) Domain servers; and\n(iii) Other information with respect to Your device, interaction of Your device with the App and applications (collectively “Traffic Data”)"),
          SizedBox(
            height: 8,
          ),
          bulletPointHeading('2.2 Personal Information Collected'),
          bulletPoint(
              'In order to provide the App, we may require You to provide Us with certain information that personally identifies You (“Personal Information “). Personal Information includes the following categories of information:\n(i) Contact data (such as Your email address, phone number and any details of Your contacts); and\n(ii) Demographic data (such as Your time zone, Your postal address and location details); and\nIf You communicate with Us by, for example, e-mail or letter, any information provided in such communication may be collected by PPL.\n(iii) Financial data (such as Your account details, e-wallet details, credit or debit card details etc. that You have provided Us for disbursement of prizes and coupons).'),
          SizedBox(
            height: 8,
          ),
          bulletPointHeading('2.3 Info'),
          bulletPoint(
              'Our App may transmit Your Personal Information to Our internal servers. We have implemented commercially reasonable physical, managerial, operational and technical security measures to protect the loss, misuse and alteration and to preserve the security of the Personally Information in Our care. Finally, this information is used in accordance with applicable law for our business purposes and to provide You with useful features.'),
          SizedBox(
            height: 8,
          ),
          bulletPointHeading('2.4 Info'),
          bulletPoint(
              'Our App may contain links to third party websites or applications. You agree and understand that privacy policies of these websites are not under Our control. You understand that once You leave Our servers, use of any information You provide shall be governed by the privacy policy of the operator of the site used by You.'),
          SizedBox(
            height: 8,
          ),
        ],
      ),
    );
  }

  Widget sectionThree() {
    return Section(
      title: '3. DISCLOSURE OF PERSONAL INFORMATION',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              '3.1 We do not disclose Your Personal Information to any third parties other than to PPL’s affiliates or other trusted business or persons, based on strict adherence and in compliance with Our Privacy Policy and any other appropriate confidentiality and security measures.'),
          SizedBox(height: 16),
          bulletPoint(
              '3.2 We use Our best efforts to use information in aggregate form (so that no individual User is identified) for the following purposes:'),
          Padding(
            padding: const EdgeInsets.only(
                left: 16.0), // Nested bullets with indentation
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                bulletPoint(
                    '1. To build up marketing profiles and issue communications over digital channels such as Whatsapp;'),
                bulletPoint(
                    '2. To aid strategic development, data collection and business analytics;'),
                bulletPoint(
                    '3. To provide seamless and swift delivery of prizes and coupons to You;'),
                bulletPoint(
                    '4. To manage Our relationship with advertisers and partners;'),
                bulletPoint('5. To audit usage of the App; and'),
                bulletPoint(
                    '6. To enhance User experience in relation to the App (“collectively, “Permitted Use”).'),
              ],
            ),
          ),
          SizedBox(height: 16),
          bulletPoint(
              '3.3 We reserve the right to disclose Personal Information if required to do so by law or if We believe that it is necessary to do so to protect and defend the rights, property or personal safety of PPL, the App, or Our Users.'),
        ],
      ),
    );
  }

  Widget sectionFour() {
    return Section(
      title: '4. CONFIDENTIALITY',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              'Except as otherwise provided in this Privacy Policy, we will keep Your Personal Information private and will not share it with third parties, unless We believe in good faith that disclosure of Your Personal Information or any other information, we collect about You is necessary for Permitted Use or to:'),
          Padding(
            padding: const EdgeInsets.only(
                left: 16.0), // Nested bullets with indentation
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                bulletPoint(
                    '1. Comply with a court order or other legal process;'),
                bulletPoint(
                    '2. Protect the rights, property or safety of PPL or another party;'),
                bulletPoint('3. Enforce the Agreement, including Terms; or'),
                bulletPoint(
                    '4. Respond to claims that any posting or other content violates the rights of third-parties.'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget sectionFive() {
    return Section(
      title: '5. SECURITY',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              '5.1 The security of Your Personal Information is important to Us. We follow generally accepted industry standards to protect the Personal Information submitted to Us, both during transmission and once We receive it. All information gathered on Our Website is securely stored within Our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited.'),
          bulletPoint(
              "5.2 Although We make best possible efforts to store Personal Information in a secure operating environment that is not open to the public, you should understand that there is no such thing as complete security, and We do not guarantee that there will be no unintended disclosures of Your Personal Information. If We become aware that Your Personal Information has been disclosed in a manner not in accordance with this Privacy Policy, we will use reasonable efforts to notify You of the nature and extent of such disclosure (to the extent We know that information) as soon as reasonably possible and as permitted by law."),
        ],
      ),
    );
  }

  Widget sectionSix() {
    return Section(
      title: '6. COOKIES',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              '6.1 To improve the responsiveness of the sites for Our Users, we may use “cookies”, or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the User’s individual interests using the Identified Computer. Unless You voluntarily identify yourself (through registration, for example), We will have no way of knowing who You are, even if We assign a cookie to Your computer. The only personal information a cookie can contain is information You supply. A cookie cannot read data off Your hard drive. Our advertisers may also assign their own cookies to Your browser (if You click on their ads), a process that We do not control.'),
          bulletPoint(
              '6.2 Our web servers automatically collect limited information about Your computer’s connection to the Internet, including Your IP address, when You visit Our site. (Your IP address is a number that lets computers attached to the Internet know where to send You data — such as the web pages You view.) Your IP address does not identify You personally. We use this information to deliver Our web pages to You upon request, to tailor Our site to the interests of Our Users, to measure traffic within Our site and let advertisers know the geographic locations from where Our visitors come.'),
        ],
      ),
    );
  }

  Widget sectionSeven() {
    return Section(
      title: '7. UPDATES AND CHANGES TO PRIVACY POLICY',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              'We reserve the right, at any time, to add to, change, update, or modify this Privacy Policy so please review it frequently. If We do, then We will post these changes on this page. In all cases, use of information We collect is subject to the Privacy Policy in effect at the time such information is collected.'),
        ],
      ),
    );
  }

  Widget sectionEight() {
    return Section(
      title: '8. YOUR RIGHTS',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              'You have a right to correct any errors in Your Personal Information available with Us. You may request Us in writing that We cease to use Your Personal Information.'),
        ],
      ),
    );
  }

  Widget sectionNine() {
    return Section(
      title: '9. RESTRICTION OF LIABILITY',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              '1. PPL makes no claims, promises or guarantees about the accuracy, completeness, or adequacy of the contents available through the App and expressly disclaims liability for errors and omissions in the contents available through the App.'),
          bulletPoint(
              '2. No warranty of any kind, implied, expressed or statutory, including but not limited to the warranties of non-infringement of third-party rights, title, merchantability, fitness for a particular purpose and freedom from computer virus, is given with respect to the contents available through the App or its links to other internet resources as may be available to Your through the App.'),
          bulletPoint(
              "3. Reference in the App to any specific commercial products, processes, or services, or the use of any trade, firm or corporation name is for the information and convenience of the public, and does not constitute endorsement, recommendation, or favouring by PPL.\n\nIf You have questions or concerns, feel free to email Us or to correspond at support@pplgaming.com and We will attempt to address Your concerns."),
        ],
      ),
    );
  }

  Widget sectionTen() {
    return Section(
      title: '10. Account Deletion and Deletion of Personal Data',
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          bulletPoint(
              'a) You can delete your Account, including any personal data that you may have submitted onto out platform, at any time by accessing the “Delete Account” option from the PPL mobile application.\n\nIf you have any issues initiating this request for deletion of your account, including for the deletion of any personal data that you may have submitted, please reach out to us at support@pplgaming.com.'),
          bulletPoint(
              'b) Once you opt for Account Deletion on the Platform, we will process this request as per the timeline communicated to you at the time of submission of the Account Deletion request. In all cases, we will confirm our acceptance of the Account Deletion request within 12 hours of making the request, and Your Account will be deleted within 15 days of acceptance. '),
          bulletPoint(
              'c) Please note that Account Deletion, including deletion of any personal data submitted by you that is associated with that account, is irreversible. Once deleted, your Account cannot be retrieved even if you want to come back onto the Platform or have deleted the Account by accident, including if your Account has been hacked / you have lost control of your Account. '),
          bulletPoint(
              'd) Please note that any Winnings that are not withdrawn from your Account will lapse after your Account Deletion – please ensure that any reward in your Account are withdrawn from your Account prior to opting for Account Deletion;'),
          bulletPoint(
              'e) Here is what happens to Your Content once your Account is deleted, which will also have to be read with our Privacy Policy:'),
          SizedBox(
            height: 10,
          ),
          bulletPoint(
              'All Bonus Coins accumulated in your Account will lapse;'),
          bulletPoint(
              'Subject to (i) above, any balance (including Bonus Coins, Cash Prizes) left in Your Account at the time of deletion will lapse after deletion of your Account;'),
          bulletPoint(
              'Details of transactions carried out in your Account, including KYC verification details and withdrawal beneficiary details, may be retained as per Applicable Laws, including for the purposes listed in the section on "Notices", and working with law enforcement agencies in relation to "PPL Community Guidelines";'),
          bulletPoint(
              'Your gameplay history may be retained as per Applicable Law, including for the purposes listed in "PPL Community Guidelines".'),
        ],
      ),
    );
  }

  Widget bulletPoint(String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          //  Icon(Icons.check_circle, size: 20, color: Colors.green),
          SizedBox(width: 8),
          Expanded(child: Text(text)),
        ],
      ),
    );
  }

  Widget bulletPointHeading(String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          SizedBox(
            height: 8,
          ),
          Expanded(
              child: Text(
            text,
            style: TextStyle(fontWeight: FontWeight.bold),
          )),
        ],
      ),
    );
  }
}

class Section extends StatelessWidget {
  final String title;
  final Widget content;

  Section({required this.title, required this.content});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          content,
        ],
      ),
    );
  }
}
