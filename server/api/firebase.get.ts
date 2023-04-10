import firebaseConfig from "../utils/firebaseConfig";
export default defineEventHandler(async (event) => {
    return firebaseConfig()
});
