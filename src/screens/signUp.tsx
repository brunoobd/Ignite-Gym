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
import { Input } from "@components/input";
import { Button } from "@components/button";

export const SignUp = () => {
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

            <Input placeholder={"Nome"} />

            <Input
              placeholder={"E-mail"}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
            />

            <Input placeholder={"Senha"} secureTextEntry />

            <Button title={"Criar e acessar"} />
          </Center>

          <Button
            title={"Voltar para o login"}
            variant={"outline"}
            mt={"$12"}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};