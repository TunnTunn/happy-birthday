import { Lexend, Dancing_Script } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

const dancingScript = Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"],
});

export const metadata = {
    title: "Happy Birthday Sally! 💖",
    description: "A special birthday celebration for the most amazing girlfriend",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${lexend.variable} ${dancingScript.variable} antialiased`}>{children}</body>
        </html>
    );
}
