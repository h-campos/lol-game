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
import { Separator } from "@/lib/components/ui/separator";
import { Attempt } from "@/lib/components/attempt";
import { useToast } from "@/lib/utils/hooks/use-toasts";
import { DialogGame } from "@/lib/components/dialog-game";
import { DialogGameStore } from "@/lib/utils/stores/dialogGameStore";
import { calculateScore } from "@/lib/utils/functions/calculateScore";
import { useRouter } from "next/navigation";

const BlurryChampions = (): ReactElement => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [blur, setBlur] = useState<number>(50);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [result, setResult] = useState<"win" | "loose" | "">("");
  const blurredChampion = BlurChampionStore((state) => state.blurredChampion);
  const setBlurredChampion = BlurChampionStore((state) => state.setBlurredChampion);
  const setAnswerBlurredChampion = AnswerBlurChampionStore((state) => state.setAnswerBlurredChampion);
  const answerBlurredChampion = AnswerBlurChampionStore((state) => state.answerBlurredChampion);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const toggleDialogGame = DialogGameStore((state) => state.toggle);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [descriptionDialog, setDescriptionDialog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    toggleDialogGame(false);
    void isGameAvailable();
  }, []);

  const isGameAvailable = async(): Promise<void> => {
    const response = await fetch("/api/gameIsAvailable", {
      method: "POST",
      body: JSON.stringify({
        gameName: "Blurry Champions"
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json() as string;
    if (data === "unavailable") {
      router.push("/app");
      toast({
        title: "Oops...",
        description: "You already played this game today, please come back tomorow !",
        variant: "default"
      });
    }
  };

  const disableGameForDay = async(): Promise<void> => {
    await fetch("/api/stateScoreBlurryChampions", {
      method: "POST",
      body: JSON.stringify({
        score: calculateScore(attempts.length)
      }),
      headers: { "Content-Type": "application/json" }
    });
  };

  const playerWin = async(): Promise<void> => {
    setResult("win");
    setBlur(0);
    toggleDialogGame(true);
    setTitleDialog("Congratulations");
    setDescriptionDialog("You won the game, you can now continue to play to the other games.");
    try {
      setIsLoading(true);
      await disableGameForDay();
      setIsLoading(false);
    } catch (error) {
      toggleDialogGame(false);
      toast({
        title: "Oops...",
        description: "Something gone wrong, please contact the administrator.",
        variant: "default"
      });
    }
  };

  const playerLoose = async(): Promise<void> => {
    setBlur((current) => current - 10);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    if (blur === 10) {
      setBlur(0);
      setResult("loose");
      toggleDialogGame(true);
      setTitleDialog("You loose");
      setDescriptionDialog("You lost the game, you can now continue to play to the other games. The champion was " + answerBlurredChampion + ".");
      try {
        setIsLoading(true);
        await disableGameForDay();
        setIsLoading(false);
      } catch (error) {
        toggleDialogGame(false);
        toast({
          title: "Oops...",
          description: "Something gone wrong, please contact the administrator.",
          variant: "default"
        });
      }
    }
  };

  const handleClick = async(): Promise<void> => {
    const input = inputRef.current;
    if (!input) throw new Error("Input is not defined");
    if (input.value === "") {
      toast({
        title: "Error",
        description: "You must enter a champion name",
        variant: "default"
      });
      return;
    }
    const formattedInputValue = formatName(input.value);
    setAttempts((current) => [...current, formattedInputValue]);
    if (formattedInputValue === answerBlurredChampion) {
      await playerWin();
    } else {
      await playerLoose();
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
      <DialogGame title={titleDialog} description={descriptionDialog} loading={isLoading} result={result} />
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
            <div className={
              twMerge(
                "overflow-hidden flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-fit",
                animate ? "animate-shaking dark:border-red-500 border-red-500" : "border-white",
                result === "win" ? "border-green-500 dark:border-green-500" : "border-white",
                result === "loose" ? "border-red-500 dark:border-red-500" : "border-white",
              )
            }
            >
              <Image
                src={blurredChampion}
                width={150}
                height={150}
                alt="Square assets of a champion of league of legends"
                style={{ filter: `blur(${blur}px)` }}
                className={"pointer-events-none"}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input ref={inputRef} type="text" placeholder="Champion name..." onKeyDown={(e) => {
                if (e.key === "Enter") void handleClick();
              }} />
              <Button onClick={(e) => {
                void handleClick();
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