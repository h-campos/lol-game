"use client";

import { useEffect, type ReactElement } from "react";
import Image from "next/image";
import { SpellsGuessingStore } from "@/lib/utils/stores/spellsGuessing";
import { AnswerSpellsGuessingStore } from "@/lib/utils/stores/answerSpellsGuessingStore";
import { getChampionsDataUrl } from "@/lib/utils/functions/getChampionsData";
import { champions } from "@/lib/utils/data-lol/champions";
import { extractChampionNameData } from "@/lib/utils/functions/extractChampionName";
import { getChampionsSpells } from "@/lib/utils/functions/getChampionsData";
import { getOneSpell } from "@/lib/utils/functions/getChampionsData";

const SpellsGuessing = (): ReactElement => {
  const setSpellImg = SpellsGuessingStore((state) => state.setSpellImg);
  const spellImg = SpellsGuessingStore((state) => state.spellImg);
  const answerSpell = AnswerSpellsGuessingStore((state) => state.answerSpell);
  const setAnswerSpell = AnswerSpellsGuessingStore((state) => state.setAnswerSpell);
  const answerChampion = AnswerSpellsGuessingStore((state) => state.answerChampion);
  const setAnswerChampion = AnswerSpellsGuessingStore((state) => state.setAnswerChampion);

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

  useEffect(() => {
    console.log(answerChampion, answerSpell);
  }, [answerSpell, answerChampion]);

  return (
    <div className="md:w-2/4 w-full flex flex-col gap-2">
      SpellsGuessing
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/${spellImg}`}
        width={200}
        height={200}
        alt="spell-img"
      />
    </div>
  );
};

export default SpellsGuessing;