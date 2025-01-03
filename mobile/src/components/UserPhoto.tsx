import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image>;

export const UserPhoto = ({ ...props }: Props) => (
  <Image
    rounded={"$full"}
    borderWidth={"$2"}
    borderColor={"$gray400"}
    backgroundColor={"$gray500"}
    {...props}
  />
);
