import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import BackgroundImage from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const { goBack } = useNavigation();

  const handleSignUp = (data: FormData) => {
    console.log(data);
  };

  const handleGoBack = () => goBack();

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

          <Center gap={"$2"} flex={1}>
            <Heading color={"$gray100"}>Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              rules={{ required: "Informe o nome" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Nome"}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Informe o e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              }}
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
              rules={{ required: "Informe a senha" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Senha"}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{ required: "" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Confirme a senha"}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title={"Criar e acessar"}
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button
            title={"Voltar para o login"}
            variant={"outline"}
            mt={"$12"}
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};
