import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children};
      <Footer />
    </NextIntlClientProvider>
  );
}
