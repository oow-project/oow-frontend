import { MessageSquare } from "lucide-react";

export const ConversationEmpty = () => (
  <div className="py-8 text-center text-oow-gray">
    <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
    <p>대화 기록이 없습니다</p>
  </div>
);
