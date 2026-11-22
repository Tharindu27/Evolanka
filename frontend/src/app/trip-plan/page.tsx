import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import TripPlannerEntry from '@/components/trip-plan/trip-planner-entry';

export default async function TripPlanPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;

  return (
    <div className="bg-[#f9f9ff] text-[#001a43]">
      <Navbar />

      <main className="mx-auto max-w-[1100px] px-6 pb-24 pt-32 md:px-12">
        <TripPlannerEntry key={edit ?? 'new'} editId={edit} />
      </main>

      <Footer />
    </div>
  );
}
