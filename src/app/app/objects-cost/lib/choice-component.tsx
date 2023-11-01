import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import type { Component } from "@/lib/utils/component";
import type { PropsWithChildren, ReactElement } from "react";

type Props = {
  choice: string;
}

const ChoiceComponent: Component<Props> = ({ choice }) => {
  switch (choice) {
    case "No choice":
      return (
        <LayoutChoiceComponent>
          <div className="relative">
            <Input
              type="number"
              placeholder="Object price..."
            />
          </div>
          <Button>Submit</Button>
        </LayoutChoiceComponent>
      );
    case "4 choices":
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
          </div>
        </LayoutChoiceComponent>
      );
    case "2 choices":
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
          </div>
        </LayoutChoiceComponent>
      );
    case "3 choices":
      return (
        <LayoutChoiceComponent>
          <div className="grid grid-cols-3 grid-rows-1 gap-2">
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
            <Button className="w-40">Price</Button>
          </div>
        </LayoutChoiceComponent>
      );
    default:
      return (
        <LayoutChoiceComponent />
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