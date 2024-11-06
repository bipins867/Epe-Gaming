import 'package:flutter/material.dart';

class TermsAndConditionsPage extends StatelessWidget {
  const TermsAndConditionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Terms & Conditions',
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
          _sectionTitle('Introduction'),
          const SizedBox(
            height: 10,
          ),
          _sectionContent(
              'Techfin Innovations Private Limited (“PPL”, “We”, “Our”, “Us”, “Company”) individually and collectively refer to PPL App and the terms "Visitor" "User" refer to the users.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              'This page states the Terms and Conditions under which you (Visitor) may visit this website (https://www.pplgaming.com) & App (PPL). Please read this page carefully. If you do not accept the Terms and Conditions stated here, we would request you to exit this site & app. The business, any of its business divisions and / or its subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in India or abroad) reserve their respective rights to revise these Terms and Conditions at any time by updating this posting. You should visit this page periodically to re-appraise yourself of the Terms and Conditions, because they are binding on all users of this Website & app.'),
          const SizedBox(
            height: 16,
          ),
          _sectionTitle('Use of Content'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              'All logos, brands, marks headings, labels, names, signatures, numerals, shapes or any combinations thereof, appearing in this site, except as otherwise noted, are properties either owned, or used under license, by the business and / or its associate entities who feature on this Website. The use of these properties or any other content on this site, except as provided in these terms and conditions or in the site content, is strictly prohibited.'),
          const SizedBox(height: 16),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              'You may not sell or modify the content of this Website or reproduce, display, publicly perform, distribute, or otherwise use the materials in any way for any public or commercial purpose without the respective organizations or entity’s written permission.'),
          const SizedBox(
            height: 8,
          ),
          _sectionTitle('Acceptable Website Use'),
          const SizedBox(
            height: 8,
          ),
          _sectionSubtitle('A) Security Rules'),
          _sectionContent(
              'Visitors are prohibited from violating or attempting to violate the security of the Website, App, including, without limitation, (1) accessing data not intended for such user or logging into a server or account which the user is not authorised to access, (2) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorisation, (3) attempting to interfere with service to any user, host or network, including, without limitation, via means of submitting a virus or "Trojan horse" to the Website, overloading, "flooding", "mail bombing" or "crashing", or (4) sending unsolicited electronic mail, including promotions and/or advertising of products or services. Violations of system or network security may result in civil or criminal liability. The business and / or its associate entities will have the right to investigate occurrences that they suspect as involving such violations and will have the right to involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations.'),
          const SizedBox(height: 8),
          _sectionSubtitle('B) General Rules'),
          _sectionContent(
              'Visitors may not use the Web Site in order to transmit, distribute, store or destroy material (a) that could constitute or encourage conduct that would be considered a criminal offence or violate any applicable law or regulation, (b) in a manner that will infringe the copyright, trademark, trade secret or other intellectual property rights of others or violate the privacy or publicity of other personal rights of others, or (c) that is libellous, defamatory, pornographic, profane, obscene, threatening, abusive or hateful.'),
          const SizedBox(height: 8),
          _sectionSubtitle('C) Indemnity'),
          _sectionContent(
              "The User unilaterally agree to indemnify and hold harmless, without objection, the Company, its officers, directors, employees and agents from and against any claims, actions and/or demands and/or liabilities and/or losses and/or damages whatsoever arising from or resulting from their use of https://www.pplgaming.com or their breach of the terms."),
          const SizedBox(
            height: 8,
          ),
          _sectionSubtitle('D)	Liability'),
          _sectionContent(
              "User agrees that neither Company nor its group companies, directors, officers or employee shall be liable for any direct or/and indirect or/and incidental or/and special or/and consequential or/and exemplary damages, resulting from the use or/and the inability to use the service or/and for cost of procurement of substitute goods or/and services or resulting from any goods or/and data or/and information or/and services purchased or/and obtained or/and messages received or/and transactions entered into through or/and from the service or/and resulting from unauthorized access to or/and alteration of user's transmissions or/and data or/and arising from any other matter relating to the service, including but not limited to, damages for loss of profits or/and use or/and data or other intangible, even if Company has been advised of the possibility of such damages.\nUser further agrees that Company shall not be liable for any damages arising from interruption, suspension or termination of service, including but not limited to direct or/and indirect or/and incidental or/and special consequential or/and exemplary damages, whether such interruption or/and suspension or/and termination was justified or not, negligent or intentional, inadvertent or advertent.\nUser agrees that Company shall not be responsible or liable to user, or anyone, for the statements or conduct of any third party of the service. In sum, in no event shall Company's total liability to the User for all damages or/and losses or/and causes of action exceed the amount paid by the User to Company, if any, that is related to the cause of action.\n"),
          const SizedBox(
            height: 16,
          ),
          const SizedBox(
            height: 16,
          ),
          _sectionTitle('Users Approval'),
          _sectionContent(
              'All the users who are interested in taking part at our platform agree to the terms and conditions given below.\nUsers may accept this Agreement only:\n1. if such User is a natural Person, is of the legal age (18 years or more),eligibility and mental capacity to form a binding contract with us.\n2. if such User is a not a resident of Tamil Nadu, Andhra Pradesh, Telangana, Assam, Orissa, Kerala, Sikkim, Nagaland or Gujarat.\n3. if such User is a juristic Person, is lawfully existing and has all the authorizations, permits and allowances to enter into this Agreement and form a binding contract.\n4. such User is not legally barred, suspended or restricted from using the App.'),
          const SizedBox(height: 16),
          _sectionTitle('Provision of the App'),
          _sectionContent(
              "1. Section 12 of the Public Gambling Act, 1867 provides that games of mere skill are exempt from the application of the Act. The Supreme Court of India and various High Courts in India have opined that a game of mere skill is a game “in which, although the element of chance necessarily cannot be entirely eliminated, success depends principally upon the superior knowledge, training, attention, experience and adroitness of the player. A game of skill is one in which the element of skill predominates over the element of chance.” No penalty can be imposed upon a person for playing such games of skill."),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              "2. Users and Players must note that Games such as Battlegrounds India, Garena Free Fire, COD Mobile, Ludo, etc. which are available on our platform are ‘Games of Skill’, under Indian law, and that we do not support, endorse or offer users ‘games of chance’ for money. While ‘Games of Skill’ do not have a comprehensive definition, they are those games where the impact of a player’s effort and skill on the outcome of a game is higher than the impact of luck and chance."),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '3. It may be noted that States are permitted, by the Indian Constitution, to enact laws regulating betting and gambling in their respective jurisdictions. In furtherance of these powers, various States have enacted anti- gambling legislations. Such legislations are largely in concert with the Public Gambling Act of 1867 (and include the exception of “games of skill”). Where a state legislation on gambling exists, it prevails over the Public Gambling Act of 1867. In this regard, the Assam Game and Betting Act, 1970 and Orissa (Prevention of) Gambling Act, 1955 and Telangana State Gaming (Amendment) Ordinance and High Court Judgment in Gujarat, 2017 prohibits games with money stakes and also does not create an exception for games of skill. Therefore, currently, residents of Assam, Odisha, Telangana and Gujarat are not permitted to play and take part in any events on our platform.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '4. The games rules are clearly defined on this platform and all the users and participants are encouraged to read, understand and follow these rules to be successful in these games.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '5. The games on our platform are ‘Games of Skills’, such that the outcome / success in the games is directly dependent on the User’s effort, performance and skills. By choosing how to play, the actions of Users shall have direct impact on the game.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '6. Every game will have some elements of chance, but in the form of challenges, obstacles or levels that a User would be able to overcome using his/her skills and knowledge of the game. Elements of luck are present in every game to add thrill and excitement, but no two attempts at a game are identical so Users must use their skills in order to be successful.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '7. Since the games available on our platform can be won through Users’ skills and such skills may be enhanced with practice and experience, the performance of a User may improve with time and practice.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '8. Certain games may have pre-determined outcomes (such as in Ludo Board Game), and these outcomes are achievable by Users using their skills.'),
          const SizedBox(
            height: 8,
          ),
          _sectionContent(
              '9. These games involves an element of financial risk and may be addictive. Please play responsibly and at your own risk.'),
          const SizedBox(
            height: 16,
          ),
          _sectionTitle('Disclaimer of Consequential Damages'),
          _sectionContent(
              "In no event shall Company or any parties, organizations or entities associated with the corporate brand name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of data information or business interruption) resulting from the use or inability to use the Website and the Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or not, such organization or entities were advised of the possibility of such damages."),
          const SizedBox(height: 32),
          Text(
            'Please read these terms carefully before using the platform.',
            style: TextStyle(fontSize: 14, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: Colors.black87,
      ),
    );
  }

  Widget _sectionSubtitle(String subtitle) {
    return Text(
      subtitle,
      style: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: Colors.black87,
      ),
    );
  }

  Widget _sectionContent(String content) {
    return Text(
      content,
      style: TextStyle(fontSize: 14, color: Colors.black87, height: 1.5),
      textAlign: TextAlign.justify,
    );
  }
}
