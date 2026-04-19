import Header from "@/components/layouts/Header";

export default function LKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
    </>
  );
}