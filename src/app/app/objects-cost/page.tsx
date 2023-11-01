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


  useEffect(() => {
    getItemsData().then((data) => {
      const random = randomSelect(data);
      setItemPrice(data[random].gold.total.toString());
      setItemImg(data[random].image.full);
    }).catch((error) => {
      console.log(error);
    });
    toggleDialogGame(false);
  }, []);

  const handleSubmit = (selectedPrice = "null"): void => {
    const input = inputRef.current;
    if (input) {
      if (input.value !== "") {
        if (input.value.toString() == itemPrice.toString()) {
          setResult("win");
          setTitleDialog("Good job!");
          setDescriptionDialog("You found the right price !");
          toggleDialogGame(true);
        } else {
          setAnimate(true);
          setTimeout(() => {
            setAnimate(false);
          }, 500);
          setResult("loose");
          setTitleDialog("You loose..");
          setDescriptionDialog(`The right price was ${itemPrice} gold.`);
          toggleDialogGame(true);
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
        setResult("win");
        setTitleDialog("Good job!");
        setDescriptionDialog("You found the right price !");
        toggleDialogGame(true);
      } else {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
        setResult("loose");
        setTitleDialog("You loose..");
        setDescriptionDialog(`The right price was ${itemPrice} gold.`);
        toggleDialogGame(true);
      }
    }
  };

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
            TODO: Add description game
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
                src={`https://ddragon.leagueoflegends.com/cdn/13.21.1/img/item/${itemImg}`}
                width={150}
                height={150}
                alt="item-img"
              />
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
                <Button onClick={() => setChoice(idx)} key={idx}>{choice}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ObjectsCost;