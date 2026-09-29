import { SubjectDetailView } from "@/components/subjects/subject-detail-view";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SubjectDetailView subjectId={id} />;
}
