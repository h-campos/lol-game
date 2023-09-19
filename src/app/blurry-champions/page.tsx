/* eslint-disable max-len */
"use client";

import { useState, type ReactElement, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { cn } from "@/lib/utils/style/class";
import Image from "next/image";
import { getChampionsAssets } from "@/lib/utils/functions/getChampionsAssets";
import { extractChampionName } from "@/lib/utils/functions/extractChampionName";
import { champions } from "@/lib/utils/data-lol/champions";
import { BlurChampionStore } from "@/lib/utils/stores/blurChampionStore";
import { AnswerBlurChampionStore } from "@/lib/utils/stores/answerBlurChampionStore";
import { formatName } from "@/lib/utils/functions/formatName";

const BlurryChampions = (): ReactElement => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(50);
  const blurredChampion = BlurChampionStore((state) => state.blurredChampion);
  const setBlurredChampion = BlurChampionStore((state) => state.setBlurredChampion);
  const setAnswerBlurredChampion = AnswerBlurChampionStore((state) => state.setAnswerBlurredChampion);
  const answerBlurredChampion = AnswerBlurChampionStore((state) => state.answerBlurredChampion);

  useEffect(() => {
    const championSelected = getChampionsAssets(champions);
    setBlurredChampion(championSelected);
    setAnswerBlurredChampion(extractChampionName(championSelected));
  }, [setAnswerBlurredChampion, setBlurredChampion]);

  return (
    <div className="w-2/4 flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 font-medium">
            You are now playing to
            <span className="font-bold text-titleHighlight"> BlurryChampions</span>
          </CardTitle>
          <CardDescription>
             In this game, a blurred image of a League of Legends character will gradually come into focus.
             Players are given 5 attempts to guess the characters name correctly.
             However, with each unsuccessful guess, the image will only slightly clear up.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="w-full flex justify-center items-center">
            <div className={
              cn(
                "overflow-hidden flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-fit",
                animate ? "animate-shaking border-red-500" : "border-white"
              )
            }
            >
              <Image
                src={blurredChampion}
                width={150}
                height={150}
                alt="Square assets of a champion of league of legends"
                style={{ filter: `blur(${attempt}px)` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default BlurryChampions;