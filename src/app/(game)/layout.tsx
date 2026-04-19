import CreateCharHeader from "@/components/layouts/CreateCharHeader";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CreateCharHeader />
      <main className="flex-1 pt-16">
        {children}
      </main>
    </>
  );
}