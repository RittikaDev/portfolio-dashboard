import type { Metadata } from "next";
import "./globals.css";
import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import { ThemeContextProvider } from "@/context/theme-context";
import { ThemeSwitch } from "@/components/modules/theme-switch";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/Providers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Outfit: any = OutfitFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Ovo: any = OvoFont({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Rittika Dev | Personal Portfolio",
  description:
    "Rittika is a full-stack developer with more than 3 years of experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      data-theme="dark"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${Outfit.className} ${Ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        <Providers>
          <ThemeContextProvider>
            {/* IF YOU SHOW NAVBAR ALL THE TIME EVEN DURING DASHBOARD, IF NOT COMMENT OUT */}
            {/* <Navbar session={session} /> */}
            <div className="min-h-screen dark:bg-darkTheme bg-lightTheme">
              {children}
            </div>
            <Toaster position="top-right" />
            <ThemeSwitch />
          </ThemeContextProvider>
        </Providers>
      </body>
    </html>
  );
}

// THIS COMPONENT IS CREATED IF SIDEBAR AND TOP MENU IS NOT SHOWN TOGETHER
