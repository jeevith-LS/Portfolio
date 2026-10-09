import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jeevith | Full-Stack Software Engineer & Creative Developer',
  description: 'Full-stack software engineer specializing in scalable Next.js/React applications, Node.js/Python microservices, distributed systems, and modern UX.',
  keywords: ['Full-Stack Developer', 'Next.js', 'React', 'Node.js', 'TypeScript', 'Software Engineer', 'Light Theme Portfolio', 'PostgreSQL', 'AI Engineering'],
  authors: [{ name: 'Jeevith' }],
  openGraph: {
    title: 'Jeevith | Full-Stack Software Engineer & Creative Developer',
    description: 'High-performance web applications, resilient backend architectures, and modern digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-blue-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
