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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mai.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .uppercase("A senha"),
  confirmPassword: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
});

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
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
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"Confirme a senha"}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.confirmPassword?.message}
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
