/* eslint-disable max-len */
"use client";

import { useState, type ReactElement, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { getChampionsAssets } from "@/lib/utils/functions/getChampionsAssets";
import { extractChampionName } from "@/lib/utils/functions/extractChampionName";
import { champions } from "@/lib/utils/data-lol/champions";
import { BlurChampionStore } from "@/lib/utils/stores/blurChampionStore";
import { AnswerBlurChampionStore } from "@/lib/utils/stores/answerBlurChampionStore";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { formatName } from "@/lib/utils/functions/formatName";
import ConfettiExplosion from "react-confetti-explosion";
import { Separator } from "@/lib/components/ui/separator";
import { Attempt } from "@/lib/components/attempt";

const BlurryChampions = (): ReactElement => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [blur, setBlur] = useState<number>(50);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<string[]>([]);
  const blurredChampion = BlurChampionStore((state) => state.blurredChampion);
  const setBlurredChampion = BlurChampionStore((state) => state.setBlurredChampion);
  const setAnswerBlurredChampion = AnswerBlurChampionStore((state) => state.setAnswerBlurredChampion);
  const answerBlurredChampion = AnswerBlurChampionStore((state) => state.answerBlurredChampion);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleClick = (): void => {
    const input = inputRef.current;
    if (!input) throw new Error("Input is not defined");
    const formattedInputValue = formatName(input.value);
    setAttempts((current) => [...current, formattedInputValue]);
    if (formattedInputValue === answerBlurredChampion) {
      setIsWin(true);
      setBlur(0);
    } else {
      setBlur((current) => current - 10);
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
      if (blur === 10) {
        alert("You lose");
      }
    }
    input.value = "";
  };

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
          <div className="w-full flex justify-center items-center flex-col gap-4">
            {isWin && (
              <ConfettiExplosion particleCount={80} colors={["#63D5B7", "#66D5A7", "#6FD392", "#88CE8A"]} />
            )}
            <div className={
              twMerge(
                "overflow-hidden flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-fit",
                animate ? "animate-shaking dark:border-red-500 border-red-500" : "border-white",
                isWin ? "border-green-500 dark:border-green-500" : "border-white",
              )
            }
            >
              <Image
                src={blurredChampion}
                width={150}
                height={150}
                alt="Square assets of a champion of league of legends"
                style={{ filter: `blur(${blur}px)` }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input ref={inputRef} type="text" placeholder="Champion name..." />
              <Button onClick={(e) => {
                handleClick();
                e.preventDefault();
              }}>Submit</Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Attempts</CardTitle>
          <CardDescription>You can see here all your attempts for this games</CardDescription>
        </CardHeader>
        <Separator className="w-[94%] mx-auto" />
        <CardContent className="pt-6">
          <ul className="flex items-start gap-2 flex-col-reverse">
            {attempts.length > 0 ? attempts.map((attempt, index) => (
              <Attempt key={index} championName={attempt} />
            )) : (<span className="text-sm text-neutral-500 dark:text-neutral-400">No attempts for the momment</span>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlurryChampions;