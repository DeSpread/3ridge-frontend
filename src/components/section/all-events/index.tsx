import TicketsSection from "../tickets-section/index";

export const AllEvents = () => {
  return (
    <section className="flex flex-col">
      <div className="mt-8">
        <div className="text-h4">전체 이벤트</div>
      </div>
      <div className="mt-4">
        <TicketsSection />
      </div>
    </section>
  );
};
