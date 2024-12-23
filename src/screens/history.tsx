import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { SectionList } from "react-native";

export const History = () => {
  const [exercises, setExercises] = useState([
    {
      title: "22.07.24",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "23.07.24",
      data: ["Puxada frontal"],
    },
  ]);

  const keyExtractor = (item: string) => item;

  const renderItem = ({ item }: { item: string }) => <HistoryCard />;

  const listEmptyComponent = () => (
    <Text color="$gray200" textAlign="center">
      Não há exercícios registrados ainda. {"\n"}
      Vamos fazer execícios hoje?
    </Text>
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={listEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};
