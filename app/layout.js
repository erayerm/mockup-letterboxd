import Nav from "./components/Nav";
import "../styles/globals.css"

export const metadata = {
  title: "Letterboxd",
  description: "Social film discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
        </style>
      </head>
      <body>
        <main className="w-screen min-h-screen font-[Roboto]">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
