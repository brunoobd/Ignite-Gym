import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  name: string;
  isActive: boolean;
};

export const Group = ({ name, isActive, ...rest }: Props) => (
  <Button
    minWidth="$24"
    h="$10"
    mr="$3"
    bg="$gray600"
    rounded="$md"
    justifyContent="center"
    alignItems="center"
    borderColor={isActive ? "$green500" : "$gray600"}
    borderWidth={"$1"}
    sx={{
      ":active": {
        borderColor: "$green500",
      },
    }}
    {...rest}
  >
    <Text
      color={isActive ? "$green500" : "$gray200"}
      textTransform="uppercase"
      fontSize="$xs"
      fontFamily="$heading"
    >
      {name}
    </Text>
  </Button>
);
