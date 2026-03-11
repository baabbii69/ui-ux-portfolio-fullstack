import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import PageLoader from "@/components/layout/PageLoader";
import PageTransition from "@/components/layout/PageTransition";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <PageLoader />
      
      <Nav />

      <PageTransition>
        <main>{children}</main>
      </PageTransition>

      <Footer />
    </>
  );
}
