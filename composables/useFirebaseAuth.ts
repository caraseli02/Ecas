import {
    getAdditionalUserInfo,
    getIdToken,
    GoogleAuthProvider,
    signInWithPopup,
    User,
} from "firebase/auth";

interface FirebaseResults {
    token: string | undefined;
    user: User;
    isNewUser: boolean | undefined
}

interface ParsedJWTToken {
    aud: string
    auth_time: number
    email: string
    email_verified: boolean
    exp: number
    iat: number
    iss: string
    name: string
    picture: string
    sub: string
    user_id: string
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

    const getUserJWTToken = async (): Promise<ParsedJWTToken> => {
        const { currentUser } = $auth
        const token = await getIdToken(currentUser)
        return parseJwt(token)
    }

    function parseJwt (token: string): any {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let JSONPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(JSONPayload);
    }

    return {
        user,
        registerUser,
        getUserJWTToken
    };
}
