import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { UserDTO } from "@dtos/UserDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

type FormDataProps = yup.InferType<typeof profileSchema>;

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string(),
  oldPassword: yup
    .string()
    .optional()
    .when("password", {
      is: (field?: string) => field,
      then: (schema) => schema.required("Insira a senha antiga."),
    }),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .optional(),
  confirmPassword: yup
    .string()
    .optional()
    .oneOf(
      [yup.ref("password"), undefined],
      "A confirmação da senha não confere."
    )
    .when("password", {
      is: (field?: string) => field,
      then: (schema) => schema.required("Confirme a senha."),
    }),
});

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(profileSchema),
  });
  const toast = useToast();

  const handleUpdateUserData = async ({
    name,
    password,
    oldPassword,
  }: FormDataProps) => {
    try {
      setIsUpdatingUser(true);

      if (user) {
        const userUpdated = user;
        userUpdated.name = name;

        await api.put("/users", {
          name,
          password,
          old_password: oldPassword,
        });

        await updateUserProfile(userUpdated);

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Perfil atualizado com sucesso!"
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Não foi possível atualizar os dados."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleUserPhotoSelect = async () => {
    try {
      setIsUpdatingPhoto(true);

      const photoSelectionResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        allowsEditing: true,
      });

      if (!photoSelectionResult.canceled) {
        const photoSelected = photoSelectionResult.assets[0];
        const photoSelectedURI = photoSelected.uri;

        if (photoSelectedURI) {
          const photoSelectedInfo = await FileSystem.getInfoAsync(
            photoSelectedURI
          );

          if (photoSelectedInfo.exists) {
            const isPhotoSelectedSize5MBOrLess =
              photoSelectedInfo.size / 1024 / 1024 <= 5;

            if (isPhotoSelectedSize5MBOrLess) {
              const photoSelectedExtension = photoSelectedURI.split(".").pop();
              const userName = user?.name.trim().split(" ").join("-");
              const photoSelectedObject = {
                name: `${userName}.${photoSelectedExtension}`.toLowerCase(),
                uri: photoSelectedURI,
                type: `${photoSelected.type}/${photoSelectedExtension}`,
              } as any;
              const userPhotoUploadForm = new FormData();
              userPhotoUploadForm.append("avatar", photoSelectedObject);

              const photoUpdatedResponse = await api.patch(
                "/users/avatar",
                userPhotoUploadForm,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );

              if (user) {
                const userUpdated = user;
                userUpdated.avatar = photoUpdatedResponse.data.avatar;
                await updateUserProfile(userUpdated);
              }

              toast.show({
                placement: "top",
                render: ({ id }) => (
                  <ToastMessage
                    id={id}
                    title="Foto atualizada com sucesso!"
                    onClose={() => toast.close(id)}
                  />
                ),
              });
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
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Não foi possível atualizar a foto."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsUpdatingPhoto(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={
              user?.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user?.avatar}` }
                : defaultUserPhotoImg
            }
            size="xl"
            alt="Imagem do usuário"
          />

          <TouchableOpacity
            onPress={handleUserPhotoSelect}
            disabled={isUpdatingPhoto || isUpdatingUser}
          >
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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Nome"}
                  onChangeText={onChange}
                  value={value}
                  bg="$gray600"
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input
                  placeholder={"Nome"}
                  value={value}
                  bg="$gray600"
                  isReadOnly
                />
              )}
            />
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
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={(value) => {
                    let newValue = undefined;

                    if (!!value) {
                      newValue = value;
                    }

                    onChange(newValue);
                  }}
                  errorMessage={errors.oldPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={(value) => {
                    let newValue = undefined;

                    if (!!value) {
                      newValue = value;
                    }

                    if (newValue === undefined && !getValues("oldPassword")) {
                      clearErrors("oldPassword");
                    }

                    if (
                      newValue === undefined &&
                      !getValues("confirmPassword")
                    ) {
                      clearErrors("confirmPassword");
                    }

                    onChange(newValue);
                  }}
                  value={!!value ? value : undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={(value) => {
                    let newValue = undefined;

                    if (!!value) {
                      newValue = value;
                    }

                    onChange(newValue);
                  }}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              onPress={handleSubmit(handleUpdateUserData)}
              isLoading={isUpdatingUser || isUpdatingPhoto}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
};
