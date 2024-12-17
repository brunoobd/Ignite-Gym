import { Image, VStack } from "@gluestack-ui/themed";
import BackgroundImage from "@assets/background.png";

export const SignIn = () => {
  return (
    <VStack flex={1} bg={"$gray700"}>
      <Image
        alt={"Pessoas treinando"}
        defaultSource={BackgroundImage}
        h={624}
        position={"absolute"}
        source={BackgroundImage}
        w={"$full"}
      />
    </VStack>
  );
};
