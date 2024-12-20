import 'package:flutter/material.dart';

class ResponsiblePlayPolicyPage extends StatelessWidget {
  const ResponsiblePlayPolicyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'PPL Responsible Play Policy',
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

          // Introduction text
          Text(
            'Techfin Innovations Private Limited (“PPL”, “We”, “Our”, “Us”) is the ultimate gaming App that lets you play online and win rewards. '
            'We always have our users’ best interests in mind and our Responsible Play Policy aims to promote responsible gaming practices while ensuring that the platform remains a skill-based, legal, and well-managed experience.',
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 16),

          // Ensuring a Safe and Secure Gaming Experience Section
          _buildSectionTitle('Ensuring a Safe and Secure Gaming Experience'),
          _buildSectionText(
            'Users\' safety and security are vital to us. Certain measures have been adopted to ensure each player\'s financial security while playing on PPL.',
          ),
          SizedBox(height: 16),

          // Promoting Skill-Based Gameplay Section
          _buildSectionTitle('Promoting Skill-Based Gameplay'),
          _buildSectionText(
            'Our gaming app is designed to be entirely skill-based, where success is determined by your knowledge of the game and your strategic decisions. '
            'We encourage users to improve their online gaming knowledge and analytical skills to enhance their gameplay experience.',
          ),
          SizedBox(height: 16),

          // Compliance with Applicable Laws Section
          _buildSectionTitle('Compliance with Applicable Laws'),
          _buildSectionText(
            'Our platform operates within the bounds of local laws and regulations related to online gaming and are not available to those under the age of 18 or from Assam, Andhra Pradesh, Odisha, Telangana, Nagaland and Sikkim.',
          ),
          SizedBox(height: 16),

          // Time and Money Management Skills Section
          _buildSectionTitle('Time and Money Management Skills'),
          _buildSectionText(
            'We encourage users to exercise responsible time and money management while using our app. Set limits on the time you spend on gaming and establish budgets to prevent excessive spending. '
            'Remember, responsible gaming is about enjoyment and entertainment, not excessive financial strain.',
          ),
          SizedBox(height: 16),

          // Not a Regular Source of Income Section
          _buildSectionTitle('Not a Regular Source of Income'),
          _buildSectionText(
            'While winning in our gaming app is possible through skilful gameplay, it is important to note that this is not a guaranteed source of income. '
            'Users should view the platform as a form of entertainment rather than a means to generate regular earnings.',
          ),
          SizedBox(height: 16),

          // Making Decisions Wisely Section
          _buildSectionTitle('Making Decisions Wisely'),
          _buildSectionText(
            'Every decision you make in the game has an impact on your gameplay experience. We encourage users to make thoughtful and informed decisions, '
            'focusing on the strategic aspect of the game rather than solely aiming for financial gains.',
          ),
          SizedBox(height: 16),

          // Game Rules Section
          _buildSectionTitle('Game Rules: BGMI, FREEFIRE, COD MOBILE'),
          _buildSectionText(
            'PPL Reserves right to cancel any match at any time without any prior notice or reason.\n'
            'By participating in PPL Matches, you accept and agree that you are above 18 years in age.\n'
            'In case the investigators or spectators find any suspicious player in the gameplay, PPL reserves the right to disqualify, suspend or put the doer\'s account on hold and also cancel their winning prizes or amount.\n'
            'In case of any technical glitch, the match may get cancelled and in such cases the entry fees will be refunded to the participants or re-match may take place.\n'
            'In case any player fails to submit correct details while participating in any match then the reward/prize amount will be cancelled for that player and no refund will be processed.\n'
            'Players are not allowed to use any Mod or Hack in the Gameplay. If anyone is found suspicious, immediate action will be taken, the account will be suspended, all the pending withdrawals will be cancelled and wallet balance will become useless.\n'
            'Mis-using any in-game glitches or errors will result in disqualification of that player from the match and no reward for the same match will be considered.\n'
            'Do not use any Emulator to Play in non-emulator matches. Such players will be kicked and if remains un-kicked then they may not get the match rewards/prizes.\n'
            'Participants need to make sure to grab Match Details such as Room ID and Password before the match start time. The Room Id and Password are shared in the app and also through SMS. Grab them and join the room quickly. In case the participants fail to join the room before the match start time, they won\'t be able to join the match later-on and no refund will be processed for the same.\n'
            'In case participants fail to join the room due to any external issues from participants end (incl. Slow internet, multi-tasking, minimizing game, Receiving Calls or SMS, etc.) then no refund will be processed.\n'
            'If the participants are kicked or auto-kicked from the room without any reasons then the refund will be issued upon submitting proper valid evidences such as a Screenshot of the Error Screen or Message.\n'
            'Any of the policies mentioned here can change, get updates or removed at any time, so keep checking here for the latest policies and rules.\n'
            'Before participating in any match at PPL, you agree to the Fair Play Policy and accept it.',
          ),
        ],
      ),
    );
  }

  // Helper method to build section titles
  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.blueAccent,
      ),
    );
  }

  // Helper method to build section text
  Widget _buildSectionText(String text) {
    return Text(
      text,
      style: TextStyle(fontSize: 16),
      textAlign: TextAlign.justify,
    );
  }
}
