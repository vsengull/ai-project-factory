const definitions = [
  {
    key: 'nextjs',
    label: 'Next.js',
    installCommand: 'npm install',
    startCommand: 'npm run dev',
    testCommand: 'npm test',
    lintCommand: 'npm run lint',
    buildCommand: 'npm run build',
    sourceDirectory: 'app/',
  },
  {
    key: 'nestjs',
    label: 'NestJS',
    installCommand: 'npm install',
    startCommand: 'npm run start:dev',
    testCommand: 'npm test',
    lintCommand: 'npm run lint',
    buildCommand: 'npm run build',
    sourceDirectory: 'src/',
  },
  {
    key: 'flutter',
    label: 'Flutter',
    installCommand: 'flutter pub get',
    startCommand: 'flutter run -d chrome',
    testCommand: 'flutter test',
    lintCommand: 'flutter analyze',
    buildCommand: 'flutter build web',
    sourceDirectory: 'lib/',
  },
];

export const STACKS = Object.freeze(definitions.map(Object.freeze));

export function getStack(key) {
  const stack = STACKS.find((candidate) => candidate.key === key);
  if (!stack) {
    throw new Error(
      `Unsupported stack "${key}". Choose: ${STACKS.map((item) => item.key).join(', ')}.`,
    );
  }
  return stack;
}
