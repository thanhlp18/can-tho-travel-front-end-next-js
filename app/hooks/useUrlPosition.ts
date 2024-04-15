import { useRouter } from "next/router";

export default function useUrlPosition() {
  const router = useRouter();
  const { lat, lng } = router.query;
  return [lat, lng];
}
