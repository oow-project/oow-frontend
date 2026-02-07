interface StatItemProps {
  label: string;
  value: number;
  highlight?: boolean;
}
export const StatItem = ({ label, value, highlight = false }: StatItemProps) => (
  <div className="text-center">
    <p className="text-oow-gray">{label}</p>
    <p className={`font-bold ${highlight ? "text-oow-orange" : "text-oow-white"}`}>{value}</p>
  </div>
);
