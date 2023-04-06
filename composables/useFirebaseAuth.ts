import {
    getAdditionalUserInfo,
    getIdToken,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    signOut
} from "firebase/auth";
import { UserInfoJWT } from "~~/types";

interface FirebaseResults {
    token: string | undefined;
    user: User;
    isNewUser: boolean | undefined
}

export default function () {
    const { $auth } = useNuxtApp();

    const user = useState<User | null>("google.com", () => null);

    const registerUser = async (): Promise<FirebaseResults | { error: ErrorConstructor }> => {
        try {
            const provider = new GoogleAuthProvider();
            const signIn = await signInWithPopup($auth, provider)
            .then(
                (result) => {
                    const isNewUser = getAdditionalUserInfo(result)?.isNewUser
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const user = result.user;
                    return { token, user, isNewUser };
                }
            )
            return signIn;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
            }
            return { error: Error };
        }
    };

    const getParsedFirebaseJWTToken = async (): Promise<UserInfoJWT> => {
        const { currentUser } = $auth
        const token = await getIdToken(currentUser)

        return useParser().parseJwt(token)
    }

    const getUserToken = async (): Promise<string> => {
        const { currentUser } = $auth
        return await getIdToken(currentUser)
    }

    const logout = async (): Promise<boolean> => {
        await signOut($auth)
        return true
    }

    return {
        user,
        registerUser,
        getParsedFirebaseJWTToken,
        getUserToken,
        logout
    };
}
