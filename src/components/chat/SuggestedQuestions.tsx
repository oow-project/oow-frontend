import { Sparkles } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  { text: "오버워치 잘하려면 어떻게 해야해?", query: "오버워치 잘하려면 어떻게 해야해?" },
  { text: "최신 패치노트를 알려줘", query: "최신 패치노트를 알려줘" },
  { text: "포지션별로 영웅을 추천해줘", query: "포지션별로 영웅을 2개씩 추천해줘" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export const SuggestedQuestions = ({ onSelect }: SuggestedQuestionsProps) => (
  <div className="flex flex-wrap items-center justify-center gap-2 px-2 pb-2">
    {SUGGESTED_QUESTIONS.map((suggestion) => (
      <button
        key={suggestion.query}
        type="button"
        onClick={() => onSelect(suggestion.query)}
        className="
          flex items-center gap-1.5
          rounded-full border border-oow-navy-600
          bg-oow-navy-700 px-4 py-2
          text-sm text-oow-white
          hover:border-oow-orange/50 hover:bg-oow-navy-600
          cursor-pointer
        "
      >
        <Sparkles size={16} className="text-blue-400" />
        <span>{suggestion.text}</span>
      </button>
    ))}
  </div>
);
