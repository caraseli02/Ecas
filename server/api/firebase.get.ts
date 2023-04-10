import { firebaseConfig } from "../utils/firebase/config";

export default defineEventHandler(async (event) => {
    return firebaseConfig()
});
