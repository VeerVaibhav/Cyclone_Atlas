import "./globals.css";

import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
