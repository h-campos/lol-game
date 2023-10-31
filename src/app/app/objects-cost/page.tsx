"use client";

import { useEffect, type ReactElement, useState } from "react";
import { getItemsData } from "@/lib/utils/functions/getItemsData";
import { randomSelect } from "@/lib/utils/functions/randomSelect";
import Image from "next/image";

const ObjectsCost = (): ReactElement => {
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    getItemsData().then((data) => {
      const random = randomSelect(data);
      console.log(data[random].name);
      console.log(data[random].gold.base);
      setImgUrl(data[random].image.full);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      Welcome on the game ObjectsCost
      <Image
        src={`http://ddragon.leagueoflegends.com/cdn/13.21.1/img/item/${imgUrl}`}
        width={150}
        height={150}
        alt="spell-img"
      />
    </div>
  );
};

export default ObjectsCost;