import type { InterestItem } from "../components/matching/InterestList";
import type { ManageUserState } from "../redux/state";
import { fetchJson } from "./utils";

// let REACT_APP_API_SERVER: any;
// const env = process.env;
// switch (env.NODE_ENV) {
//     case "development":
//         REACT_APP_API_SERVER = env.REACT_APP_API_SERVER;
// }

const { REACT_APP_API_SERVER } = process.env;

export interface User {
    id: number;
    username: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface SignUpForm {
    first_name: string;
    last_name: string;
    gender: string;
    birthday: string;
    username: string;
    email: string;
    password: string;
    phone_num: string;
    country: string;
    profile: Blob | File;
    job: string;
    information: string;
}

export interface PostForm {
    user_id: string;
    title: string;
    content: string;
    image: Blob | File;
}

export interface UserProfile {
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_num?: string;
    birthday?: string;
    gender?: string;
    information?: string;
    profile?: Blob | File | string;
    newProfile?: Blob | File;
    job?: string;
    country?: string;
    created_at?: string;
    updated_at?: string;

    // added by danny - start
    id?: number;
    isAdmin?: boolean;
    allowPost?: boolean;
    allowComment?: boolean;
    allowUpload?: boolean;
    allowMatch?: boolean;
    emergency_contact_person?: string;
    emergency_contact_num?: number;

    // added by danny - end
}

export async function fetchSelfUserInfo(token: string) {
    return (
        fetchJson<User>(`${REACT_APP_API_SERVER}/user`),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export async function postLogin(loginForm: LoginForm) {
    return fetchJson<{
        token: string;
        username: string;
        id: number;
        isAdmin: boolean;
    }>(`${REACT_APP_API_SERVER}/user/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginForm),
    });
}

export async function postSignUp(signUpForm: SignUpForm) {
    const formData = new FormData();
    console.log("check data", signUpForm.country);
    formData.append("first_name", signUpForm.first_name);
    formData.append("last_name", signUpForm.last_name);
    formData.append("gender", signUpForm.gender);
    formData.append("birthday", signUpForm.birthday);
    formData.append("username", signUpForm.username);
    formData.append("email", signUpForm.email);
    formData.append("password", signUpForm.password);
    formData.append("phone_num", signUpForm.phone_num);
    formData.append("country_id", signUpForm.country);
    formData.append("job_id", signUpForm.job);
    formData.append("information", signUpForm.information);
    formData.append("profile", signUpForm.profile);

    return fetchJson(`${REACT_APP_API_SERVER}/user/signUp`, {
        method: "POST",
        body: formData,
    });
}

export async function preMatching(userId: number) {
    return fetchJson(`${REACT_APP_API_SERVER}/user/getInterest`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
    });
}

export async function addUserInterest(
    interestList: Array<InterestItem>,
    user_id: number
) {
    return fetchJson(`${REACT_APP_API_SERVER}/user/interest`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ interestList, user_id }),
    });
}

export async function editUserInterest(
    interestList: Array<InterestItem>,
    user_id: number
) {
    console.log(interestList);
    return fetchJson(`${REACT_APP_API_SERVER}/user/editInterest`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ interestList, user_id }),
    });
}

export async function newPost(postForm: PostForm) {
    const formData = new FormData();
    formData.append("user_id", postForm.user_id);
    formData.append("title", postForm.title);
    formData.append("content", postForm.content);
    formData.append("image", postForm.image);
    console.log("fetch", formData.get("image"));

    return fetchJson(`${REACT_APP_API_SERVER}/user/post`, {
        method: "POST",
        body: formData,
    });
}

export async function getAllUsers() {
    return fetchJson<ManageUserState>(
        `${REACT_APP_API_SERVER}/user/getAllUsers`,
        {
            method: "GET",
        }
    );
}

export async function getUserProfile(username: string) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/user/getUserProfile`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ username: username }),
    });
}

export async function addBrowseCount(post_id: number, user_id: number) {
    return fetchJson(`${REACT_APP_API_SERVER}/user/browsePost`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },

        body: JSON.stringify({ post_id, user_id }),
    });
}

export async function fetchSelfUserProfile(userId: number) {
    return fetchJson(`${REACT_APP_API_SERVER}/user/profile`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
    });
}

export async function getUserFriends(user_id: number) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/user/getUserFriends`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id }),
    });
}

export async function updateUserPermission(
    username: string,
    permissions: any[]
) {
    return fetchJson<any>(`${REACT_APP_API_SERVER}/user/updateUserPermission`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ username: username, permissions: permissions }),
    });
}

export async function updateProfile(updateForm: UserProfile, userId: string) {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("first_name", updateForm.first_name as any as string);
    formData.append("last_name", updateForm.last_name as any as string);
    formData.append("gender", updateForm.gender as any as string);
    formData.append("birthday", updateForm.birthday as any as string);
    formData.append("username", updateForm.username as any as string);
    formData.append("email", updateForm.email as any as string);
    formData.append("password", updateForm.password as any as string);
    formData.append("phone_num", updateForm.phone_num as any as string);
    formData.append("job_id", updateForm.job as any as string);
    formData.append("information", updateForm.information as any as string);
    formData.append("profile", updateForm.newProfile as any as string);

    // added by danny
    formData.append("emergency_contact_person", updateForm.emergency_contact_person as any as string);
    formData.append("emergency_contact_num", updateForm.emergency_contact_num as any as string);

    return fetchJson(`${REACT_APP_API_SERVER}/user/updateProfile`, {
        method: "POST",
        body: formData,
    });
}

export async function fetchRate(code: string) {
    console.log("fetch", code);
    return fetchJson(`${REACT_APP_API_SERVER}/data/rate`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ code: code }),
    });
}

export async function fetchCountry(id: number) {
    console.log("fetch", id);
    return fetchJson(`${REACT_APP_API_SERVER}/data/emergency`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
}

// added by dannys
export async function getUserFriendsWithInfo(user_id: number) {
    return fetchJson<any>(
        `${REACT_APP_API_SERVER}/user/getUserFriendsWithInfo`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id }),
        }
    );
}
