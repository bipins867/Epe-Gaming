import 'package:flutter/material.dart';

class ReturnRefundCancellationPolicy extends StatelessWidget {
  const ReturnRefundCancellationPolicy({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Return, Refund & Cancellation Policy',
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
            Text(
              'a) In the event, that there is an error in the Services provided by us, we may refund the Entry Fee, provided the reasons are genuine and proved after investigation by PPL.',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'b) Please read the rules of each Mobile Game and Contest before participating.',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'c) We do not cancel registrations once entered, however, in case of exceptional circumstances wherein the fault may lie with the payment gateway or from Our side, we will cancel your participation on request and refund the Entry Fee to You within a reasonable amount of time.',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'd) In case we cancel your participation in any Mobile Game or Contest as a result of this, we will return Your Entry Fee to You within a reasonable amount of time for You to redeem the same by playing other Contests on PPL.',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'e) We will try Our best to create the best user experience for You. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payments made through a payment gateway, payment refunds will be made to the same account.',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'Users must use any money in their Account within 365 days. PPL shall have the right to directly forfeit any such unused amount after 365 (three hundred and sixty-five) days. The idle Balance amount lying in your account may be withdrawn only in exceptional circumstances, determined on a case-to-case basis on the sole discretion of PPL.',
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}
