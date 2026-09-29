import { QuestionPaperViewer } from "@/components/question-papers/question-paper-viewer";

export default async function QuestionPaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestionPaperViewer paperId={id} />;
}
