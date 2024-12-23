import { Center, Spinner } from "@gluestack-ui/themed";

export const Loading = () => (
  <Center flex={1} bg={"$gray700"}>
    <Spinner />
  </Center>
);
