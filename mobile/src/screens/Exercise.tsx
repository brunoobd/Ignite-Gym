import { Heading, HStack, Image } from "@gluestack-ui/themed";
import { Center, Icon, Text, VStack } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import BodySvg from "@assets/body.svg";
import { Box } from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string;
};

export const Exercise = () => {
  const [exercise, setExercise] = useState<ExerciseDTO>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAsDone, setIsMarkingAsDone] = useState(false);
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { exerciseId } = useRoute().params as RouteParamsProps;
  const toast = useToast();

  const handleGoBack = () => goBack();

  const handleMarkExerciseAsDone = async () => {
    try {
      setIsMarkingAsDone(true);

      const response = await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Parabéns."
            description={"Exercício registrado no seu histórico."}
            onClose={() => toast.close(id)}
          />
        ),
      });

      navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Não foi possível marcar o exercício como concluído";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Erro ao registrar."
            description={toastDescription}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsMarkingAsDone(false);
    }
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);

      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const toastDescription = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

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

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading || !exercise ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Box rounded={"$lg"} mb="$3" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Exercício"
                resizeMode="cover"
                rounded="$lg"
                w="$full"
                h="$80"
              />
            </Box>

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="$gray200" ml="$2">
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="$gray200" ml="$2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                onPress={handleMarkExerciseAsDone}
                isLoading={isMarkingAsDone}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};