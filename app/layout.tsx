export const metadata = {
  title: "One-Line Advice",
  description:
    "A quiet place on the internet that gives you one thoughtful line when you need it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#000",
        }}
      >
        {children}
      </body>
    </html>
  );
}
