import "./globals.css";   // ← make sure this path points at your tailwind entry
import { AppSidebar }    from "@/components/app-sidebar";
import { SiteHeader }    from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col min-h-screen" open={false}>
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="flex-1">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
