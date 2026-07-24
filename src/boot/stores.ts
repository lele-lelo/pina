import { defineBoot } from "#q-app";
import { useUserStore } from "@/stores/user-store";

export default defineBoot(async () => {
  const userStore = useUserStore();
  await userStore.initStore();
});
