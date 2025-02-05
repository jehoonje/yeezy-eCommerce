import "../styles/globals.css";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";

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
        {/* 페이지 전환 시 애니메이션 효과를 주기 위한 AnimatePresence */}
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
