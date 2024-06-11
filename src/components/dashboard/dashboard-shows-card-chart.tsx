"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Icons } from "../icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const dummyData = [
  { name: "Jan", club: 12, festival: 54 },
  { name: "Feb", club: 34, festival: 56 },
  { name: "Mar", club: 29, festival: 23 },
  { name: "Apr", club: 80, festival: 87 },
  { name: "May", club: 90, festival: 44 },
  { name: "Jun", club: 52, festival: 91 },
  { name: "Jul", club: 43, festival: 12 },
  { name: "Aug", club: 54, festival: 93 },
  { name: "Sep", club: 16, festival: 78 },
  { name: "Oct", club: 78, festival: 12 },
  { name: "Nov", club: 4, festival: 21 },
  { name: "Dec", club: 56, festival: 27 },
];

export default function DashboardShowCardChart() {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icons.ListMusic />
          <span>Shows per month trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer height={350} width="100%">
          <BarChart
            data={dummyData}
            className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
          >
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip
              wrapperClassName="dark:!bg-black rounded-md dark:!border-border !text-sm"
              separator=": "
              formatter={(value, key) => [value, `${key} shows`]}
              labelClassName="font-bold"
            />
            <Legend
              iconType="circle"
              formatter={(key) => <div className="text-xs">{key} shows</div>}
            />
            <Bar dataKey="club" stackId={1} fill="hsl(var(--primary))" />
            <Bar
              dataKey="festival"
              stackId={1}
              fill="#6b7280"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
