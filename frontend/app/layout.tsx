import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { CartProvider } from "@/context/CartContex";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "linear-gradient(90deg, #fff 60%, #ffe5e7 100%)",
                  color: "#F86D72",
                  border: "1.5px solid #F86D72",
                  borderRadius: "1rem",
                  boxShadow:
                    "0 4px 24px 0 rgba(248,109,114,0.10), 0 1.5px 0 0 #F86D72",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  padding: "0.8rem 1.5rem",
                  letterSpacing: "0.01em",
                  textShadow: "0 1px 0 #fff8",
                  backdropFilter: "blur(2px)",
                },
                iconTheme: {
                  primary: "#F86D72",
                  secondary: "#fff",
                },
                success: {
                  style: {
                    background:
                      "linear-gradient(90deg, #fff 60%, #eaffea 100%)",
                    color: "#1db954",
                    border: "1.5px solid #1db954",
                    boxShadow:
                      "0 4px 24px 0 rgba(29,185,84,0.10), 0 1.5px 0 0 #1db954",
                  },
                  iconTheme: {
                    primary: "#1db954",
                    secondary: "#fff",
                  },
                },
                error: {
                  style: {
                    background:
                      "linear-gradient(90deg, #fff 60%, #ffe5e7 100%)",
                    color: "#F86D72",
                    border: "1.5px solid #F86D72",
                    boxShadow:
                      "0 4px 24px 0 rgba(248,109,114,0.10), 0 1.5px 0 0 #F86D72",
                  },
                  iconTheme: {
                    primary: "#F86D72",
                    secondary: "#fff",
                  },
                },
              }}
              containerStyle={{
                top: 24,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
