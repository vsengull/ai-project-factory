import 'package:flutter/material.dart';

void main() {
  runApp(const FactoryApp());
}

class FactoryApp extends StatelessWidget {
  const FactoryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('{{projectTitle}}')),
        body: const Center(
          child: Text('Your AI-agent-ready Flutter project is running.'),
        ),
      ),
    );
  }
}
