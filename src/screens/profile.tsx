import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { ToastMessage } from "@components/ToastMessage";

export const Profile = () => {
  const [userPhotoURI, setUserPhotoURI] = useState(
    "https://github.com/brunoobd.png"
  );
  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelectionResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        allowsEditing: true,
      });

      if (!photoSelectionResult.canceled) {
        const photoSelectedURI = photoSelectionResult.assets[0].uri;

        if (photoSelectedURI) {
          const photoSelectedInfo = await FileSystem.getInfoAsync(
            photoSelectedURI
          );

          if (photoSelectedInfo.exists) {
            const isPhotoSelectedSize5MBOrLess =
              photoSelectedInfo.size / 1024 / 1024 <= 5;

            if (isPhotoSelectedSize5MBOrLess) {
              setUserPhotoURI(photoSelectedURI);
            } else {
              toast.show({
                placement: "top",
                render: ({ id }) => (
                  <ToastMessage
                    id={id}
                    title="Imagem muito grande"
                    description="Selecione uma de até 5MB."
                    action="error"
                    onClose={() => toast.close(id)}
                  />
                ),
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhotoURI }}
            size="xl"
            alt="Imagem do usuário"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input value="bruno@email.com" bg="$gray600" isReadOnly />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input
              placeholder="Confirme a nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
};
