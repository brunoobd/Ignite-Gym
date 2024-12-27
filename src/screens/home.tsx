import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";

export const Home = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const [groups, setGroups] = useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const keyExtractor = (item: string) => item;

  const renderGroupItem = ({ item }: { item: string }) => (
    <Group
      name={item}
      isActive={groupSelected === item}
      onPress={() => setGroupSelected(item)}
    />
  );

  const renderExerciseItem = ({ item }: { item: string }) => {
    const handleOpenExerciseDetails = () => navigate("exercise");

    return <ExerciseCard onPress={handleOpenExerciseDetails} />;
  };

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={keyExtractor}
        renderItem={renderGroupItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={keyExtractor}
          renderItem={renderExerciseItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};
