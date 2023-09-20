import Image from "next/image";
import { Badge } from "@/lib/components/ui/badge";
import type { Component } from "@/lib/utils/component";
import type { AttemptProps } from "./attempt.type";
import type { ReactElement } from "react";
import { AnswerBlurChampionStore } from "@/lib/utils/stores/answerBlurChampionStore";
import { formatName } from "@/lib/utils/functions/formatName";
import { getChampionsAssetsWithName } from "@/lib/utils/functions/getChampionsAssets";
import { champions } from "@/lib/utils/data-lol/champions";

export const Attempt: Component<AttemptProps> = ({ championName }): ReactElement => {
  const answerBlurredChampion = AnswerBlurChampionStore((state) => state.answerBlurredChampion);
  const formattedChampionName = formatName(championName);
  const isWin = formattedChampionName === answerBlurredChampion;
  const imgUrl = getChampionsAssetsWithName(champions, formattedChampionName);

  return (
    <li className="flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <Image
          src={imgUrl}
          width={40}
          height={40}
          alt="Square assets of a champion of league of legends"
          className="rounded-full border border-neutral-200 dark:border-neutral-800"
        />
        <span>{championName}</span>
      </div>
      <Badge variant={isWin ? "success" : "destructive"}>{isWin ? "WIN" : "FAIL"}</Badge>
    </li>
  );
};