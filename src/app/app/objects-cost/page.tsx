/* eslint-disable max-len */
"use client";

import { useEffect, type ReactElement, useState, useRef } from "react";
import { getItemsData } from "@/lib/utils/functions/getItemsData";
import { randomSelect } from "@/lib/utils/functions/randomSelect";
import Image from "next/image";
import { ObjectsCostStore } from "@/lib/utils/stores/games/objectsCostStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";
import ChoiceComponent from "./lib/choice-component";
import { useToast } from "@/lib/utils/hooks/use-toasts";
import { DialogGameStore } from "@/lib/utils/stores/dialogGameStore";
import { DialogGame } from "@/lib/components/dialog-game";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { encode } from "@/lib/utils/functions/encode";
import { decode } from "@/lib/utils/functions/decode";

const choiceOptions = ["No choice", "4 choices", "2 choices", "3 choices"];

const ObjectsCost = (): ReactElement => {
  const { itemImg, setItemImg, itemPrice, setItemPrice } = ObjectsCostStore();
  const [animate, setAnimate] = useState<boolean>(false);
  const [result, setResult] = useState<"win" | "loose" | "">("");
  const [choice, setChoice] = useState<number>(5);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const toggleDialogGame = DialogGameStore((state) => state.toggle);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [descriptionDialog, setDescriptionDialog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const scoreWithChoiceSelected = (choice: number, result: string) => {
    if (result === "win") {
      if (choice === 0) {
        return 5;
      } else if (choice === 1) {
        return 3;
      } else if (choice === 2) {
        return 1;
      } else if (choice === 3) {
        return 2;
      }
    } else if (result === "loose") {
      return 0;
    } else if (result === "") {
      return 200;
    }
  };

  const isGameAvailable = async(): Promise<void> => {
    const response = await fetch("/api/gameIsAvailable", {
      method: "POST",
      body: JSON.stringify({
        gameName: "Objects Cost"
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

  const handleSubmit = async(selectedPrice = "null"): Promise<void> => {
    const input = inputRef.current;
    if (input) {
      if (input.value !== "") {
        if (input.value.toString() == itemPrice.toString()) {
          await playerWin();
        } else {
          setAnimate(true);
          setTimeout(() => {
            setAnimate(false);
          }, 500);
          await playerLoose();
        }
      } else {
        toast({
          title: "Oops..",
          description: "You must enter a price",
          variant: "default"
        });
        return;
      }
    }
    if (selectedPrice !== "null") {
      if (selectedPrice === itemPrice) {
        await playerWin();
      } else {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
        await playerLoose();
      }
    }
  };

  const disableGameForDay = async(result: string): Promise<void> => {
    await fetch("/api/stateScoreObjectsCost", {
      method: "POST",
      body: JSON.stringify({
        score: scoreWithChoiceSelected(choice, result)
      }),
      headers: { "Content-Type": "application/json" }
    });
  };

  const playerWin = async(): Promise<void> => {
    setResult("win");
    setTitleDialog("Good job!");
    setDescriptionDialog("You found the right price !");
    toggleDialogGame(true);
    localStorage.removeItem("itemPrice");
    localStorage.removeItem("itemImg");
    localStorage.removeItem("choice");
    try {
      setIsLoading(true);
      await disableGameForDay("win");
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
    setResult("loose");
    setTitleDialog("You loose..");
    setDescriptionDialog(`The right price was ${itemPrice} gold.`);
    toggleDialogGame(true);
    localStorage.removeItem("itemPrice");
    localStorage.removeItem("itemImg");
    localStorage.removeItem("choice");
    try {
      setIsLoading(true);
      await disableGameForDay("loose");
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

  useEffect(() => {
    if (localStorage.getItem("itemPrice") && localStorage.getItem("itemImg")) {
      setItemPrice(decode(localStorage.getItem("itemPrice") as string));
      setItemImg(decode(localStorage.getItem("itemImg") as string));
      if (localStorage.getItem("choice")) {
        setChoice(Number(decode(localStorage.getItem("choice") as string)));
      }
      return;
    } else {
      getItemsData().then((data) => {
        const random = randomSelect(data);
        setItemPrice(data[random].gold.total.toString());
        localStorage.setItem("itemPrice", encode(data[random].gold.total.toString()));
        setItemImg(data[random].image.full);
        localStorage.setItem("itemImg", encode(data[random].image.full));
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [setItemImg, setItemPrice]);

  useEffect(() => {
    toggleDialogGame(false);
    void isGameAvailable();
  }, []);

  return (
    <div className="md:w-2/4 w-full flex flex-col gap-2">
      <DialogGame title={titleDialog} description={descriptionDialog} loading={isLoading} result={result} />
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 font-medium">
            You are now playing to
            <span className="font-bold text-titleHighlight"> ObjectsCost</span>
          </CardTitle>
          <CardDescription>
          This game presents you with an image of an item, and you need to select an option to try and win points. Each option you choose will earn you a different amount of points based on your selection. But be cautious, you only have one chance to play, and the items can be either old or recent. Good luck!
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
              {!itemImg && (
                <Skeleton className="w-[150px] h-[150px]" />
              )}
              {itemImg && (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/13.21.1/img/item/${itemImg}`}
                  width={150}
                  height={150}
                  alt="item-img"
                />
              )}
            </div>
            <ChoiceComponent choice={choiceOptions[choice]} inputRef={inputRef} handleSubmit={handleSubmit} truePrice={itemPrice} />
          </div>
        </CardHeader>
      </Card>
      {choice === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="mb-2 font-medium">
            Choose one
            </CardTitle>
            <CardDescription>
            Put your mouse on the button to see how many points you can win with the choice.
            </CardDescription>
          </CardHeader>
          <Separator className="w-[94%] mx-auto" />
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              {choiceOptions.map((choice, idx) => (
                <Button onClick={() => {
                  setChoice(idx);
                  localStorage.setItem("choice", encode(idx.toString()));
                }} key={idx}>{choice}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ObjectsCost;