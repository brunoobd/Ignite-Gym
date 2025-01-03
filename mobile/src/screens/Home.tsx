import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export const Home = () => {
  const [exercises, setExercises] = useState<Array<ExerciseDTO>>([]);
  const [groups, setGroups] = useState<Array<string>>([]);
  const [groupSelected, setGroupSelected] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      const data = response.data;

      setGroups(data);
      setGroupSelected(data[0]);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Erro ao carregar."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

  const fetchExercisesByGroups = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Erro ao carregar."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => await signOut();

  const keyGroupExtractor = (item: string) => item;

  const renderGroupItem = ({ item }: { item: string }) => (
    <Group
      name={item}
      isActive={groupSelected === item}
      onPress={() => setGroupSelected(item)}
    />
  );

  const keyExerciseExtractor = (item: ExerciseDTO) => item.id;

  const renderExerciseItem = ({ item }: { item: ExerciseDTO }) => {
    const handleOpenExerciseDetails = () =>
      navigate("exercise", { exerciseId: item.id });

    return <ExerciseCard exercise={item} onPress={handleOpenExerciseDetails} />;
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroups();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader
        userPhoto={user?.avatar}
        userName={user?.name}
        signOut={handleSignOut}
      />

      <FlatList
        data={groups}
        keyExtractor={keyGroupExtractor}
        renderItem={renderGroupItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      {isLoading ? (
        <Loading />
      ) : (
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
            keyExtractor={keyExerciseExtractor}
            renderItem={renderExerciseItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};
