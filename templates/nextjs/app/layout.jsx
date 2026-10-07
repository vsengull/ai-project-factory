import './globals.css';

export const metadata = {
  title: '{{projectTitle}}',
  description: 'Built with AI Project Factory',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
