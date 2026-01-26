import type { SkillRow } from "../types/hero";

interface SkillTableProps {
  title: string;
  rows: SkillRow[];
}

export const SkillTable = ({ title, rows }: SkillTableProps) => (
  <section>
    <h2 className="mb-3 text-lg font-bold text-oow-white">{title}</h2>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-oow-navy-800">
          <th className="w-18 border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            아이콘
          </th>
          <th className="w-42 border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            이름
          </th>
          <th className="border-b border-oow-navy-600 px-4 py-2 text-left text-sm font-medium text-oow-gray">
            설명
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} className="bg-oow-navy-700">
            <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
              <img src={row.icon} alt={row.name} className="h-10 w-10" />
            </td>
            <td className="border-b border-oow-navy-600 px-4 py-2 text-sm font-medium text-oow-white">
              {row.name}
            </td>
            <td className="border-b border-oow-navy-600 px-4 py-2 text-sm text-oow-white">
              {row.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
