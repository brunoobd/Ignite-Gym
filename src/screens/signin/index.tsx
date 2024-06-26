import { Button } from "@components/button";
import {
  BackgroundImage,
  Container,
  Content,
  Footer,
  FooterTitle,
  Form,
  Title,
} from "./style";
import Image from "@assets/background.png";
import { Header } from "@components/header";
import { Input } from "@components/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

export const SignIn = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Container insets={insets}>
        <BackgroundImage alt={"Pessoas treinando"} source={Image} />

        <Content>
          <Header />

          <Form>
            <Title>Acesse sua conta</Title>
            <Input
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              placeholder={"E-mail"}
            />
            <Input placeholder={"Senha"} secureTextEntry />
            <Button title={"Acessar"} />
          </Form>

          <Footer>
            <FooterTitle>Ainda não tem acesso?</FooterTitle>
            <Button title={"Criar conta"} variant={"SECONDARY"} />
          </Footer>
        </Content>
      </Container>
    </ScrollView>
  );
};
