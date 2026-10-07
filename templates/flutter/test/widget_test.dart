import 'package:flutter_test/flutter_test.dart';
import 'package:{{projectPackageName}}/main.dart';

void main() {
  testWidgets('renders the project welcome message', (tester) async {
    await tester.pumpWidget(const FactoryApp());

    expect(find.text('{{projectTitle}}'), findsOneWidget);
    expect(
      find.text('Your AI-agent-ready Flutter project is running.'),
      findsOneWidget,
    );
  });
}
