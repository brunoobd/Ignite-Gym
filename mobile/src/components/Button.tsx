import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
};

export const Button = ({
  title,
  variant = "solid",
  isLoading = false,
  ...rest
}: Props) => {
  const {
    bg,
    borderWidth,
    activeBg,
    textColor,
    buttonSpinnerColor,
  }: {
    bg: Props["bg"];
    borderWidth: Props["borderWidth"];
    activeBg: Props["$active-bg"];
    textColor: ComponentProps<typeof Text>["color"];
    buttonSpinnerColor: ComponentProps<typeof ButtonSpinner>["color"];
  } =
    variant === "outline"
      ? {
          bg: "transparent",
          borderWidth: "$1",
          activeBg: "$gray500",
          textColor: "$green500",
          buttonSpinnerColor: "$green500",
        }
      : {
          bg: "$green700",
          borderWidth: "$0",
          activeBg: "$green500",
          textColor: "$white",
          buttonSpinnerColor: "$white",
        };

  return (
    <GluestackButton
      w={"$full"}
      h={"$14"}
      bg={bg}
      borderWidth={borderWidth}
      borderColor={"$green500"}
      rounded={"$sm"}
      $active-bg={activeBg}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={buttonSpinnerColor} />
      ) : (
        <Text color={textColor} fontFamily={"$heading"} fontSize={"$sm"}>
          {title}
        </Text>
      )}
    </GluestackButton>
  );
};
