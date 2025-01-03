import { ExerciseDTO } from "./ExerciseDTO";

export type HistoryDTO = {
  id: string;
  name: ExerciseDTO["name"];
  group: ExerciseDTO["group"];
  hour: string;
  created_at: string;
};
