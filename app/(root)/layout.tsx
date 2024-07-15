

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        SIDEBAR   {/*because all components contain sidebar its root layout */}
        {children}
    </main>
  );
}
