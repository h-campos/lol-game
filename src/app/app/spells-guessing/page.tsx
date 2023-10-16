/* eslint-disable max-len */
"use client";

import { useEffect, type ReactElement, useRef, useState } from "react";
import Image from "next/image";
import { SpellsGuessingStore } from "@/lib/utils/stores/spellsGuessing";
import { AnswerSpellsGuessingStore } from "@/lib/utils/stores/answerSpellsGuessingStore";
import { getChampionsDataUrl } from "@/lib/utils/functions/getChampionsData";
import { champions } from "@/lib/utils/data-lol/champions";
import { extractChampionNameData } from "@/lib/utils/functions/extractChampionName";
import { getChampionsSpells } from "@/lib/utils/functions/getChampionsData";
import { getOneSpell } from "@/lib/utils/functions/getChampionsData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import { AttemptSpellsGuessing } from "@/lib/components/attempt";
import { useToast } from "@/lib/utils/hooks/use-toasts";
import { formatName } from "@/lib/utils/functions/formatName";
import { DialogGameStore } from "@/lib/utils/stores/dialogGameStore";
import { DialogGame } from "@/lib/components/dialog-game";

const SpellsGuessing = (): ReactElement => {
  const setSpellImg = SpellsGuessingStore((state) => state.setSpellImg);
  const spellImg = SpellsGuessingStore((state) => state.spellImg);
  const answerSpell = AnswerSpellsGuessingStore((state) => state.answerSpell);
  const setAnswerSpell = AnswerSpellsGuessingStore((state) => state.setAnswerSpell);
  const answerChampion = AnswerSpellsGuessingStore((state) => state.answerChampion);
  const setAnswerChampion = AnswerSpellsGuessingStore((state) => state.setAnswerChampion);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionList = useRef<HTMLUListElement>(null);
  const [attempts, setAttempts] = useState<string[]>([]);
  const { toast } = useToast();
  const [animate, setAnimate] = useState<boolean>(false);
  const [chance, setChance] = useState<number>(5);
  const [result, setResult] = useState<"win" | "loose" | "">("");
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [descriptionDialog, setDescriptionDialog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleDialogGame = DialogGameStore((state) => state.toggle);

  const fromNumberToLetterSpells = (number: number): string => {
    switch (number) {
      case 0:
        return "Q";
      case 1:
        return "W";
      case 2:
        return "E";
      case 3:
        return "R";
      default:
        return "Q";
    }
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
    if (formattedInputValue === answerChampion) {
      await playerWinChampions();
    } else {
      await playerLooseChampions();
    }
    input.value = "";
  };

  const playerWinChampions = async(): Promise<void> => {
    setResult("win");
    setChance(0);
  };

  const playerLooseChampions = async(): Promise<void> => {
    setChance((current) => current - 1);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    if (chance == 1) {
      setChance(0);
      setResult("loose");
    }
  };

  useEffect(() => {
    const championSelected = getChampionsDataUrl(champions);
    setAnswerChampion(extractChampionNameData(championSelected));
    getChampionsSpells(championSelected)
      .then((spells) => {
        const infoSpell = getOneSpell(spells);
        setSpellImg(infoSpell.spell.image.full);
        setAnswerSpell(fromNumberToLetterSpells(infoSpell.random));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="md:w-2/4 w-full flex flex-col gap-2">
      <DialogGame title={titleDialog} description={descriptionDialog} loading={isLoading} result={result} />
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 font-medium">
            You are now playing to
            <span className="font-bold text-titleHighlight"> SpellsGuessing</span>
          </CardTitle>
          <CardDescription>
            In this game, first, an image of a champions ability will appear. Your task is to figure out which champion it belongs to. You only have  5 chances to do this. Once youve identified the champion, you can earn an extra point by trying to find out which key on the keyboard activates this ability. So, good luck!
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
                src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${spellImg}`}
                width={150}
                height={150}
                alt="spell-img"
              />
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
              <Button onClick={() => void handleClick()}>Submit</Button>
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
              <AttemptSpellsGuessing key={index} championName={attempt} />
            )) : (<span className="text-sm text-neutral-500 dark:text-neutral-400">No attempts for the momment</span>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpellsGuessing;