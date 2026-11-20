import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { ByteCursor, MotionProvider, Preloader } from "@/shared/motion";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <Preloader />
        <Header />
        {children}
        <Footer />
        <ByteCursor />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
