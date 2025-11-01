import type { Image } from "@types";
import BaseImage from "@atoms/BaseImage";
import Wrapper from "@atoms/Wrapper";

const ImageAndText = ({
  image,
  text,
  width,
  height,
}: {
  image: Image;
  text: string;
  width?: string;
  height?: string;
}) => {
  return (
    <Wrapper grid className="auto-cols-auto grid-flow-col gap-4 items-center">
      {image && (
        <BaseImage
          image={image}
          width={width ?? undefined}
          height={height ?? undefined}
        />
      )}
      <div className="col-span-2">{text && <p>{text}</p>}</div>
    </Wrapper>
  );
};

export default ImageAndText;
