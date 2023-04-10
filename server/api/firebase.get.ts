import { firebaseConfig } from "@/server/utils/firebase/config";

export default defineEventHandler(async (event) => {
    return firebaseConfig()
});
