import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: ".:: Digimedia ::.",
  description: "Líderes innovadores en marketing digital. Conectamos tu marca con las audiencias del futuro, impulsando tu presencia online hacia el éxito.orres",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect a Google Fonts para mejorar el tiempo de conexión */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />

         {/* Preload de las fuentes para cargarlas rápidamente */}
         <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.cdnfonts.com/css/telegraf"
          as="style"
        />
      </head>

      <body className={`  ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
