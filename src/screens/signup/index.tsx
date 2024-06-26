import { Button } from "@components/button";
import { BackgroundImage, Container, Content, Form, Title } from "./style";
import Image from "@assets/background.png";
import { Header } from "@components/header";
import { Input } from "@components/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from "@react-navigation/native";

export const SignUp = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const insets = useSafeAreaInsets();

  const handleBackToLogin = () => navigate("signIn");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Container insets={insets}>
        <BackgroundImage
          alt={"Pessoas treinando"}
          source={Image}
          defaultSource={Image}
        />

        <Content>
          <Header />

          <Form>
            <Title>Crie sua conta</Title>
            <Input autoCapitalize={"none"} placeholder={"Nome"} />
            <Input
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              placeholder={"E-mail"}
            />
            <Input placeholder={"Senha"} secureTextEntry />
            <Input placeholder={"Confirme a senha"} secureTextEntry />
            <Button title={"Criar e acessar"} />
          </Form>

          <Button
            title={"Voltar para o login"}
            variant={"SECONDARY"}
            onPress={handleBackToLogin}
          />
        </Content>
      </Container>
    </ScrollView>
  );
};
