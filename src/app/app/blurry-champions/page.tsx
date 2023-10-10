/* eslint-disable max-len */
"use client";

import { useState, type ReactElement, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { twMerge } from "tailwind-merge";
import NextImage from "next/image";
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
import { decode } from "@/lib/utils/functions/decode";
import { encode } from "@/lib/utils/functions/encode";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const suggestionList = useRef<HTMLUListElement>(null);
  const { toast } = useToast();
  const toggleDialogGame = DialogGameStore((state) => state.toggle);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [descriptionDialog, setDescriptionDialog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [safariBrowser, setSafariBrowser] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    toggleDialogGame(false);
    void isGameAvailable();
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      setSafariBrowser(true);
    }
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
    localStorage.removeItem("blurredChampions");
    localStorage.removeItem("answerBlurredChampions");
    localStorage.removeItem("attemptsBlurryChampions");
    localStorage.removeItem("blur");
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
    localStorage.setItem("blur", encode(blur.toString()));
    if (blur === 10) {
      setBlur(0);
      setResult("loose");
      toggleDialogGame(true);
      setTitleDialog("You loose");
      setDescriptionDialog("You lost the game, you can now continue to play to the other games. The champion was " + answerBlurredChampion + ".");
      localStorage.removeItem("blurredChampions");
      localStorage.removeItem("answerBlurredChampions");
      localStorage.removeItem("attemptsBlurryChampions");
      localStorage.removeItem("blur");
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
    localStorage.setItem("attemptsBlurryChampions", JSON.stringify([...attempts, formattedInputValue]));
    if (formattedInputValue === answerBlurredChampion) {
      await playerWin();
    } else {
      await playerLoose();
    }
    input.value = "";
  };

  const handleSuggestions = (): void => {
    const input = inputRef.current;
    if (!input) throw new Error("Input is not defined");
    setSuggestions(champions.filter((champion) => champion.toLowerCase().startsWith(input.value.toLowerCase())));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      void handleClick();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestionList !== null) {
        if (suggestionList.current && suggestionList.current.children && suggestionList.current.children.length > 0) {
          (suggestionList.current.children[0] as HTMLLIElement).focus();
        }
      }
    }
  };

  const handleSuggestionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    suggestion: string
  ): void => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = suggestions.indexOf(suggestion);
      if (currentIndex > 0) {
        if (suggestionList.current && suggestionList.current.children && suggestionList.current.children.length > 0) {
          (suggestionList.current.children[currentIndex - 1] as HTMLLIElement).focus();
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = suggestions.indexOf(suggestion);
      if (currentIndex < suggestions.length - 1) {
        if (suggestionList.current && suggestionList.current.children && suggestionList.current.children.length > 0) {
          (suggestionList.current.children[currentIndex + 1] as HTMLLIElement).focus();
        }
      }
    } else if (e.key === "Enter") {

      const input = inputRef.current;
      if (input) {
        input.value = suggestion;
        setSuggestions([]);
        input.focus();
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("blurredChampions") && localStorage.getItem("answerBlurredChampions")) {
      setBlurredChampion(decode(localStorage.getItem("blurredChampions") as string));
      setAnswerBlurredChampion(decode(localStorage.getItem("answerBlurredChampions") as string));
      if (localStorage.getItem("attemptsBlurryChampions") && localStorage.getItem("blur")) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setAttempts(JSON.parse(localStorage.getItem("attemptsBlurryChampions") as string));
        setBlur(parseInt(decode(localStorage.getItem("blur") as string)) - 10);
      } else {
        setBlur(50);
        setAttempts([]);
      }
      return;
    } else {
      const championSelected = getChampionsAssets(champions);
      setBlurredChampion(championSelected);
      setAnswerBlurredChampion(extractChampionName(championSelected));
      localStorage.setItem("blurredChampions", encode(championSelected));
      localStorage.setItem("answerBlurredChampions", encode(extractChampionName(championSelected)));
    }
  }, [setAnswerBlurredChampion, setBlurredChampion]);

  useEffect(() => {
    if (safariBrowser) return;
    const img = new Image();
    img.src = blurredChampion;
    if (!canvasRef.current) throw new Error("Canvas is not defined");
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = 120;
    canvasRef.current.height = 120;
    if (context === null) throw new Error("Context is not defined");
    context.filter = `blur(${blur}px)`;
    img.onload = () => {
      context?.drawImage(img, 0, 0);
    };
  }, [blurredChampion, blur, safariBrowser]);

  return (
    <div className="md:w-2/4 w-full flex flex-col gap-2">
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
              {
                safariBrowser ? (
                  <NextImage
                    src={blurredChampion}
                    width={150}
                    height={150}
                    alt="Square assets of a champion of league of legends"
                    style={{ filter: `blur(${blur}px)` }}
                    className={"pointer-events-none"}
                  />
                ) : (
                  <canvas width={120} height={120} ref={canvasRef}></canvas>
                )
              }
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Champion name..."
                  onChange={handleSuggestions}
                  onKeyDown={handleKeyDown}
                />
                {suggestions.length > 0 && inputRef?.current?.value !== "" && (
                  <ul
                    id="suggestion-list"
                    className="absolute top-12 right-0 max-h-32 w-full rounded-md overflow-y-scroll no-scrollbar border border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800"
                    ref={suggestionList}
                  >
                    {suggestions.map((suggestion, idx) => (
                      <li
                        tabIndex={idx}
                        className="w-full text-sm px-3 py-2 text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800/50 cursor-pointer dark:focus-visible:bg-neutral-800/50 outline-none hover:bg-neutral-200/50 focus-visible:bg-neutral-200/50"
                        key={idx}
                        onClick={() => {
                          const input = inputRef.current;
                          if (!input) throw new Error("Input is not defined");
                          input.value = suggestion;
                          setSuggestions([]);
                        }}
                        onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
            {attempts !== null && attempts.length > 0 ? attempts.map((attempt, index) => (
              <Attempt key={index} championName={attempt} />
            )) : (<span className="text-sm text-neutral-500 dark:text-neutral-400">No attempts for the momment</span>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlurryChampions;