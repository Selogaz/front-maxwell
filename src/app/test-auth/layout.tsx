import Footer from "@/components/layouts/Footer";

export default function TestAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}