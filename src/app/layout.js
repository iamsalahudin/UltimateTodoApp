import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Now you don't forget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqlLg0Q=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
      </head>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
