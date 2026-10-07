const definitions = [
  {
    key: 'nextjs',
    label: 'Next.js',
    installCommand: 'npm install',
    startCommand: 'npm run dev',
  },
  {
    key: 'nestjs',
    label: 'NestJS',
    installCommand: 'npm install',
    startCommand: 'npm run start:dev',
  },
  {
    key: 'flutter',
    label: 'Flutter',
    installCommand: 'flutter pub get',
    startCommand: 'flutter run',
  },
];

export const STACKS = Object.freeze(definitions.map(Object.freeze));

export function getStack(key) {
  const stack = STACKS.find((candidate) => candidate.key === key);
  if (!stack) {
    throw new Error(`Unsupported stack "${key}". Choose: ${STACKS.map((item) => item.key).join(', ')}.`);
  }
  return stack;
}
