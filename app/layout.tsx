// app/layout.tsx
import "../styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "My E-commerce App",
  description: "An e-commerce site built with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
