import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import type { Component } from "@/lib/utils/component";

type Props = {
  title: string;
  logs: string[];
}

export const Version: Component<Props> = ({ title, logs }): ReactElement => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="mb-4">{title}</CardTitle>
        <CardDescription>
          <ul className="list-disc flex-col gap-2 flex">
            {logs.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};