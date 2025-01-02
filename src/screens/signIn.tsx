import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import BackgroundImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a senha.").uppercase("A senha"),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const handleSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true);

      await signIn({ email, password });
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
            title="Erro ao entrar."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });

      setIsLoading(false);
    }
  };

  const handleNewAccount = () => navigate("signUp");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          alt={"Pessoas treinando"}
          defaultSource={BackgroundImage}
          h={624}
          position={"absolute"}
          source={BackgroundImage}
          w={"$full"}
        />

        <VStack flex={1} px={"$10"} pb={"$16"}>
          <Center my={"$24"}>
            <Logo />

            <Text color={"$gray100"} fontSize={"$sm"}>
              Treine sua mente e seu corpo.
            </Text>
          </Center>

          <Center gap={"$2"}>
            <Heading color={"$gray100"}>Acesse a conta</Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"E-mail"}
                  keyboardType={"email-address"}
                  autoCapitalize={"none"}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Senha"}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title={"Acessar"}
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent={"flex-end"} mt={"$4"}>
            <Text
              color={"$gray100"}
              fontSize={"$sm"}
              mb={"$3"}
              fontFamily={"$body"}
            >
              Ainda não tem acesso?
            </Text>

            <Button
              title={"Criar conta"}
              variant={"outline"}
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
