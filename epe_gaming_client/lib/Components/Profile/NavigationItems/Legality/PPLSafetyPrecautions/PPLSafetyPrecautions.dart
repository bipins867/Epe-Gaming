import 'package:flutter/material.dart';

class PPLSafetyPrecautionsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: ListView(
        children: [
          Text(
            'PPL Safety Precautions',
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
          _sectionTitle(
              'The following are an integral part of the terms of use between PPL and you:'),
          _bulletPoint(
              '1. All the Mobile Games hosted by PPL on the Platform, where a user needs to pay a participation fee in the form of money, are Games of Skill (defined below). Different Mobile Games will reward different skills, but each game will reward certain skills, such as knowledge of the game, familiarity with rules, experience, reflexes, practice, hand-eye coordination, etc. Certain games may have predetermined outcomes (Sudoku, Crosswords, Brick Breaker, BGMI, Free Fire, COD Mobile etc), which are achievable by the Users using their skills to play the games within the games’ time limits.'),
          _bulletPoint(
              '2. Users must note that all Mobile Games available on PPL are games where the success and/or performance of the Users depends predominantly upon their superior knowledge, training, attention, experience and adroitness (‘Games of Skill’) in playing the game. ‘Games of Skill’, under Indian law, are excluded from the ambit of gambling legislations including the Public Gambling Act of 1867 and other state enactments except in the Restricted States. '),
          _bulletPoint(
              '3. Hence, the individuals residing in the Restricted States should not participate in any paid Contests/tournaments/other gameplay formats or Mobile Games offered on the Platform. Any participation by such individuals shall be at their sole risk and discretion and PPL shall not be liable to refund or reimburse any injury or damages suffered by such individuals.'),
          _bulletPoint(
              '4. PPL reserves the right to monitor all activities from the User’s Account on the Platform. If any User participates in any Contest or Mobile Games in violation of any central and/or state law(s) in India, PPL reserves the right to cooperate with law enforcement agencies of the relevant state and report such participation and/or suspicious activity along with all relevant details of the concerned User.'),
          _bulletPoint(
              '5. PPL does not support, endorse or offer to any User ‘games of chance’ for money. Each Mobile Game and Contest available on the Platform has clearly defined rules and code of conduct. All Users are encouraged to read, understand and follow these rules to be successful in these games. PPL shall not be liable if Users do not adhere to the Game Rules or otherwise do not adhere to PPL’s Terms & Conditions. '),
          _bulletPoint(
              '6. PPL suggests that Users adopt a balanced approach while engaging with any of the Mobile Games on the Platform and be mindful of gaming within their means and limits. If played optimally, Mobile Games (like other forms of sports) aim to encourage Users to develop their mental prowess, hand-eye coordination, competitiveness and encourage teamwork.'),
          _bulletPoint(
              '7. You should take certain standard health and safety measures while playing any Mobile Game, including taking adequate breaks, sitting at a reasonable distance from the screen, playing in a well-lit environment, and avoiding playing when tired, drowsy, intoxicated or under the influence of substances. Avoid playing without breaks over long periods of time as this could affect your performance and could adversely impact hand-eye coordination, balance, and multi-tasking ability. '),
          _bulletPoint(
              '8. The Platform or the Mobile Games offered on the Platform may contain flashing lights, realistic images, patterns and simulations which may cause certain side effects. If your hands, wrists, arms, eyes or other parts of your body become tired or sore while playing, or if you feel symptoms such as tingling, numbness, burning or stiffness, stop and rest before playing again. If you continue to have any of these above symptoms, please stop playing IMMEDIATELY and consult a doctor.'),
          _bulletPoint(
              '9. If you play any Mobile Games on the Platform, give yourself plenty of room to play and always be aware of your surroundings. While playing any Mobile Game you may be moving around the play area and using your hands to control gameplay. You must ensure that you are not near other people, objects, stairs, balconies, windows, walls, furniture or other objects that may pose a danger to you or could be damaged during the play. Never handle sharp or dangerous objects while playing any Mobile Game on the Platform.'),
          _bulletPoint(
              '10. It is your responsibility to control your surroundings and movements at all times when playing the game to ensure that you don’t injure yourself, any other persons, damage any property, etc. Any playing of the Mobile Games is at your own risk and PPL shall not be liable for any death, injury or health complications resulting from your use of the Platform.'),
          _bulletPoint(
              '11. You agree that your use of the Platform and to play the Mobile Games is at your own risk, and it is your responsibility to maintain such health, liability, hazard, personal injury, medical, life, and other insurance policies as you deem reasonably necessary for any injuries that you may incur while using the Platform.'),
          _bulletPoint(
              '12. You hereby agree that if the terms of this Agreement are not adhered by you, PPL will be irreparably damaged, and therefore you agree that the Platform shall be entitled, without bond, other security, proof of damages, to appropriate equitable remedies with respect to any breach of this Agreement, in addition to any other remedies available under Applicable Law.'),
        ],
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
    );
  }

  Widget _bulletPoint(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        children: [
          Icon(Icons.circle, size: 8, color: Colors.black),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              text,
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.justify,
            ),
          ),
        ],
      ),
    );
  }
}
