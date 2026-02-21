import Nav from "./components/Nav";
import "../styles/globals.css";
import StoreProvider from "./StoreProvider";
import SessionWrapper from "./SessionProvider";
import SessionManager from "./components/SessionManager";

export const metadata = {
  title: "Letterboxd",
  description: "Social film discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="relative z-0 min-h-screen font-[Roboto] text-[13px] text-primary-gray">
          <SessionWrapper>
            <StoreProvider>
              <SessionManager>
                <Nav />
                {children}
              </SessionManager>
            </StoreProvider>
          </SessionWrapper>
        </main>
      </body>
    </html>
  );
}
