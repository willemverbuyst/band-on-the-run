"use client";

import { ShowType } from "@prisma/client";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { showTypes } from "~/lib/showType";

export default function DashboardShowChart({
  data,
}: {
  data: {
    name: string;
    [ShowType.CLUB]: number;
    [ShowType.FESTIVAL]: number;
    [ShowType.RADIO]: number;
    [ShowType.TV]: number;
    [ShowType.TV]: number;
  }[];
}) {
  const formattedData = data.map((item) => {
    let radius = "";

    showTypes.forEach((key) => {
      if (item[key] > 0) {
        radius = key;
      }
    });

    return {
      ...item,
      radius,
    };
  });

  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart
        data={formattedData}
        className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
      >
        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
        <YAxis stroke="#888888" fontSize={12} />
        <Tooltip
          wrapperClassName="dark:!bg-black rounded-md dark:!border-border !text-sm"
          separator=": "
          formatter={(value, key) => [value, String(key).toLocaleLowerCase()]}
          labelClassName="font-bold"
        />
        <Legend
          iconType="circle"
          formatter={(key) => (
            <div className="text-xs">{String(key).toLocaleLowerCase()}</div>
          )}
        />

        <Bar dataKey={ShowType.CLUB} stackId={1} fill="hsl(var(--primary))">
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // @ts-expect-error The radius property is not recognized by the Cell component.
              radius={
                entry.radius === ShowType.CLUB ? [4, 4, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
        </Bar>
        <Bar dataKey={ShowType.FESTIVAL} stackId={1} fill="#6b7280">
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // @ts-expect-error The radius property is not recognized by the Cell component.
              radius={
                entry.radius === ShowType.FESTIVAL ? [4, 4, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
        </Bar>
        <Bar dataKey={ShowType.TV} stackId={1} fill="#aaa">
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // @ts-expect-error The radius property is not recognized by the Cell component.
              radius={
                entry.radius === ShowType.TV ? [4, 4, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
        </Bar>
        <Bar dataKey={ShowType.RADIO} stackId={1} fill="#ccc">
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // @ts-expect-error The radius property is not recognized by the Cell component.
              radius={
                entry.radius === ShowType.RADIO ? [4, 4, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
