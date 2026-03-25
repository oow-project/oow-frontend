import { useChatStore } from "../../stores/chatStore";

const TOOL_LABELS: Record<string, string> = {
  search_rag: "관련 정보 조회 중",
  search_web: "웹 검색 중",
  get_patch_notes: "패치노트 조회 중",
  get_hero_stats: "영웅 통계 조회 중",
  get_hero_counters: "카운터 정보 조회 중",
  get_hero_abilities: "스킬 정보 조회 중",
};

export const ToolStatusList = () => {
  const toolStatuses = useChatStore((state) => state.toolStatuses);

  if (toolStatuses.length === 0) return null;

  return (
    <div className="flex justify-start">
      <div className="rounded-lg bg-oow-navy-600 px-3 py-2 space-y-1.5">
        {toolStatuses.map((ts, index) => (
          <div
            key={`${ts.tool}-${index}`}
            className="flex items-center gap-2 text-sm text-oow-gray"
          >
            {ts.status === "running" ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-oow-gray border-t-transparent" />
            ) : (
              <svg className="h-3.5 w-3.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{TOOL_LABELS[ts.tool] ?? ts.tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
