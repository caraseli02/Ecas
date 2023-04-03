import {
    getRedirectResult,
    GoogleAuthProvider,
    signInWithPopup,
    User,
} from "firebase/auth";

export default function () {
    const { $auth } = useNuxtApp();

    const user = useState<User | null>("google_user", () => null);

    const registerUser = async (): Promise<unknown> => {
        try {
            const provider = new GoogleAuthProvider();
            const signIn = await signInWithPopup($auth, provider).then(
                (result) => {
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;
                    const user = result.user;
                    return { token, user };
                }
            );
            return signIn;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
            }
            return { error: Error };
        }
    };

    return {
        user,
        registerUser,
    };
}
