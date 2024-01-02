import CreateLinkSection from "./CreateLinkSection";
import LinkListSection from "./list/LinkListSection";

export default function AdminLinksPage() {
  return (
    <div className="p-10">
      <CreateLinkSection />
      <LinkListSection className="mt-10" />
    </div>
  );
}
