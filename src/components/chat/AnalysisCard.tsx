import { X } from "lucide-react";

import { useChatStore } from "../../stores/chatStore";
import { ROLE_LABELS } from "../../constants/hero";
import { IconButton } from "../ui/IconButton";
import { Button } from "../ui/Button";

import type { AnalysisCard as AnalysisCardType } from "../../types/chat";

interface AnalysisCardProps {
  card: AnalysisCardType;
  onSuggestionClick: (question: string) => void;
}

export const AnalysisCard = ({ card, onSuggestionClick }: AnalysisCardProps) => {
  const setAnalysisCard = useChatStore((state) => state.setAnalysisCard);

  const suggestions = [
    `${card.heroName} 잘하려면 어떻게 해야해?`,
    `${card.heroName} 카운터 영웅과 그 이유는?`,
  ];

  return (
    <div className="rounded-lg bg-oow-navy-600 p-4 border-oow-orange border-2">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-bold text-oow-orange">{card.heroName} 분석</span>
        <IconButton onClick={() => setAnalysisCard(null)} size="sm">
          <X size={16} />
        </IconButton>
      </div>
      <div className="mb-3 space-y-1 text-sm text-oow-white">
        <p>역할: {ROLE_LABELS[card.heroRole]}</p>
        <p>
          승률: {card.winrate}% / 픽률: {card.pickrate}%
        </p>
      </div>
      <div className="border-t border-oow-navy-700 pt-3">
        <p className="mb-2 text-sm text-oow-orange font-bold">아래 질문으로 분석해보세요</p>
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="md"
              onClick={() => onSuggestionClick(suggestion)}
              className="block w-full rounded-lg bg-oow-navy-700 text-left text-oow-white hover:bg-oow-navy-800"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
