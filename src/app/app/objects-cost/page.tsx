/* eslint-disable max-len */
"use client";

import { useEffect, type ReactElement, useState } from "react";
import { getItemsData } from "@/lib/utils/functions/getItemsData";
import { randomSelect } from "@/lib/utils/functions/randomSelect";
import Image from "next/image";
import { ObjectsCostStore } from "@/lib/utils/stores/games/objectsCostStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";
import ChoiceComponent from "./lib/choice-component";

const choiceOptions = ["No choice", "4 choices", "2 choices", "3 choices"];

const ObjectsCost = (): ReactElement => {
  const { itemImg, setItemImg, itemPrice, setItemPrice, itemName, setItemName } = ObjectsCostStore();
  const [animate, setAnimate] = useState<boolean>(false);
  const [result, setResult] = useState<"win" | "loose" | "">("");

  useEffect(() => {
    getItemsData().then((data) => {
      const random = randomSelect(data);
      setItemName(data[random].name);
      setItemPrice(data[random].gold.base.toString());
      setItemImg(data[random].image.full);
    }).catch((error) => {
      console.log(error);
    });
  }, [setItemImg, setItemName, setItemPrice]);

  return (
    <div className="md:w-2/4 w-full flex flex-col gap-2">
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
            <ChoiceComponent choice={choiceOptions[3]} />
          </div>
        </CardHeader>
      </Card>
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
              <Button key={idx}>{choice}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ObjectsCost;