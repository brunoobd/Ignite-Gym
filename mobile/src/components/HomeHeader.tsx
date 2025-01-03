import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { UserPhoto } from "./UserPhoto";
import { LogOut } from "lucide-react-native";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import { TouchableOpacity } from "react-native";
import { api } from "@services/api";

type Props = {
  userPhoto?: string;
  userName?: string;
  signOut: () => void;
};

export const HomeHeader = ({ userPhoto, userName, signOut }: Props) => (
  <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
    <UserPhoto
      source={
        userPhoto
          ? { uri: `${api.defaults.baseURL}/avatar/${userPhoto}` }
          : defaultUserPhotoImg
      }
      w="$16"
      h="$16"
      alt="Imagem do usuário"
    />

    <VStack flex={1}>
      <Text color={"$gray100"} fontSize={"$sm"}>
        Olá,
      </Text>

      <Heading color={"$gray100"} fontSize={"$md"}>
        {userName ?? "Usuário"}
      </Heading>
    </VStack>

    <TouchableOpacity onPress={signOut}>
      <Icon as={LogOut} color="$gray200" size="xl" />
    </TouchableOpacity>
  </HStack>
);
