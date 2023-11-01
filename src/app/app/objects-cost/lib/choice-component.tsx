import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import type { Component } from "@/lib/utils/component";
import { generateFakePrices } from "@/lib/utils/functions/generateFakePrices";
import { shuffleArray } from "@/lib/utils/functions/shuffleArray";
import type { PropsWithChildren, ReactElement } from "react";

type Props = {
  choice: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  handleSubmit: (selectedPrice: string) => void;
  truePrice: string;
}

const ChoiceComponent: Component<Props> = ({ choice, inputRef, handleSubmit, truePrice }) => {
  switch (choice) {
    case "No choice":
      return (
        <LayoutChoiceComponent>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Object price..."
            />
          </div>
          <Button onClick={() => handleSubmit("null")}>Submit</Button>
        </LayoutChoiceComponent>
      );
    case "4 choices": {
      const prices = shuffleArray(generateFakePrices(Number(truePrice), 3));
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {prices.map((price, idx) => (
              <Button onClick={() => handleSubmit(price.toString())} key={idx} className="w-40">{price.toString()}</Button>
            ))}
          </div>
        </LayoutChoiceComponent>
      );
    }
    case "2 choices": {
      const prices = shuffleArray(generateFakePrices(Number(truePrice), 1));
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            {prices.map((price, idx) => (
              <Button onClick={() => handleSubmit(price.toString())} key={idx} className="w-40">{price.toString()}</Button>
            ))}
          </div>
        </LayoutChoiceComponent>
      );
    }
    case "3 choices": {
      const prices = shuffleArray(generateFakePrices(Number(truePrice), 2));
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-3 grid-rows-1 gap-2">
            {prices.map((price, idx) => (
              <Button onClick={() => handleSubmit(price.toString())} key={idx} className="w-40">{price.toString()}</Button>
            ))}
          </div>
        </LayoutChoiceComponent>
      );
    }
    default:
      return (
        <></>
      );
  }
};

const LayoutChoiceComponent: Component<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <div className="flex items-center space-x-2">
      {children}
    </div>
  );
};

export default ChoiceComponent;