import type { BasicComponent } from "@types";
import type { JSX } from "react";
import { ImageAndText, Landing } from "..";

const componentList: { [key: string]: JSX.ElementType } = {
  "blocks.image-and-text": ImageAndText,
  "blocks.landing": Landing,
};

const DynamicZone = ({
  components,
  env,
}: {
  components: BasicComponent[];
  env: object;
}) => {
  return components.map(({ __component, ...data }, index: number) => {
    const Component = componentList[__component];

    if (typeof Component === `undefined`) {
      return (
        <div key={`dynamic-zone-component-${index}`}>
          Component <strong>{__component}</strong> not found
        </div>
      );
    } else {
      return (
        <Component
          key={`dynamic-zone-component-${index}`}
          env={env}
          {...data}
        />
      );
    }
  });
};

export default DynamicZone;
