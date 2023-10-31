import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";

export const Statistics = (): ReactElement => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>You can see here all of your stats on the games.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                  Blurry Champions
              </p>
              <p className="text-sm text-muted-foreground">
                  Youve got a streak of 5 wins in a row 🔥
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};