import Copyright from '@/app/components/copyright';
import Header from '@/app/components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Copyright />
    </>
  );
}
