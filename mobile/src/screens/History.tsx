import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export const History = () => {
  const [historyOfExercises, setHistoryOfExercises] = useState<
    Array<{ title: string; data: Array<HistoryDTO> }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchHistory = async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/history");

      setHistoryOfExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";

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

  const keyExtractor = (item: HistoryDTO) => item.id;

  const renderItem = ({ item }: { item: HistoryDTO }) => (
    <HistoryCard history={item} />
  );

  const listEmptyComponent = () => (
    <Text color="$gray200" textAlign="center">
      Não há exercícios registrados ainda. {"\n"}
      Vamos fazer execícios hoje?
    </Text>
  );

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={historyOfExercises}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            historyOfExercises.length === 0 && {
              flex: 1,
              justifyContent: "center",
            }
          }
          ListEmptyComponent={listEmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};
