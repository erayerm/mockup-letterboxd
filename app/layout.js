
export const metadata = {
  title: "Letterboxd",
  description: "Social film discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
