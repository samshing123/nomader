import { Knex } from "knex";
import { BrowseCount, Post, User } from "../utils/models";
import { hashPassword } from "../utils/hash";

export class UserService {
    constructor(private knex: Knex) {}

    async getUserByUserName(username: string): Promise<User> {
        const user = await this.knex
            .select("*")
            .from("users")
            .where("username", username)
            .first();
        return user;
    }

    async getUserByUserId(userId: number): Promise<User> {
        const foundUser = await this.knex.raw(
            `select * from users join jobs on jobs.id = users.job_id where users.id = ${userId};`
        );

        return foundUser;
    }

    async create(body: User) {
        console.log(body);
        let {
            username,
            password,
            first_name,
            last_name,
            birthday,
            gender,
            information,
            profile,
            email,
            phone_num,
            job_id,
            country_id,
        } = body;

        password = await hashPassword(password);

        // check if repeated
        const nameResult = await this.knex
            .select("*")
            .from("users")
            .where("username", username);
        const emailResult = await this.knex
            .select("*")
            .from("users")
            .where("email", email);

        if (nameResult.length == 0 || emailResult.length == 0) {
            const createdUserId = await this.knex
                .insert({
                    username,
                    password,
                    first_name,
                    last_name,
                    birthday,
                    gender,
                    information,
                    profile,
                    email,
                    phone_num,
                    job_id,
                    country_id,
                    isAdmin: false,
                    isVisible: true,
                    allow_post: true,
                    allow_comment: true,
                    allow_upload: true,
                    allow_match: true,
                })
                .into("users")
                .returning("id");
            return createdUserId;
        }

        return;
    }

    async addInterest(userId: number, interestIdList: number[]) {
        const insertInterest = interestIdList.map((interestId) => ({
            user_id: userId,
            interest_id: interestId,
        }));

        const createdInterest = await this.knex
            .insert(insertInterest)
            .into("users_interests")
            .returning("id");
        return createdInterest;
    }

    async editInterest(userId: number, interestIdList: number[]) {
        console.log(userId);
        await this.knex("users_interests").where("user_id", userId).del();

        const insertInterest = interestIdList.map((interestId) => ({
            user_id: userId,
            interest_id: interestId,
        }));

        const updatedInterest = await this.knex
            .insert(insertInterest)
            .into("users_interests")
            .returning("id");
        return updatedInterest;
    }

    async getInterestByUserId(userId: number): Promise<[number]> {
        const foundInterest = await this.knex
            .select("*")
            .from("users_interests")
            .where("user_id", userId)
            .first();
        return foundInterest;
    }

    async getAllUsersData() {
        const allUsersData = await this.knex
            .select("id", "username", "first_name", "last_name", "profile")
            .from("users");
        return allUsersData;
    }

    async getUserProfileData(username: string) {
        const userProfileData = await this.knex
            .select("*")
            .from("users")
            .where("username", username)
            .first();
        return userProfileData;
    }

    async addPost(postData: Post) {
        postData.user_id = +postData.user_id;
        console.log(postData);
        const createdPost = await this.knex
            .insert(postData)
            .into("posts")
            .returning("id");
        return createdPost;
    }

    async addUserBrowsePost(body: BrowseCount) {
        let { user_id, post_id } = body;

        console.log(user_id, post_id);
        const browseId = await this.knex
            .insert({
                user_id,
                post_id,
                browse_count: 1,
            })
            .into("users_browse_posts")
            .returning("id");
        return browseId;
    }

    async getUserFriends(user_id: number) {
        const userFriends = await this.knex
            .select("*")
            .from("users_relationship")
            .where("user1_id", user_id);
        return userFriends;
    }

    async updateUserPermission(username: string, permissions: any[]) {
        // const permission_visible = permissions[0]
        // const permission_matching = permissions[1]
        // const permission_post = permissions[2]
        // const permission_comment = permissions[3]
        // const permission_upload = permissions[4]

        // const userPermission = await this.knex("users")
        //     .update({
        //         isVisible: permission_visible,
        //         allowPost: permission_post,
        //         allowComment: permission_comment,
        //         allowUpload: permission_upload,
        //         allowMatch: permission_matching,
        //     })
        //     .where("username", username)

        const userPermission = "Update Permission";

        return userPermission;
    }

    async update(body: User) {
        let user_id = body.id;
        delete body["id"];
        Object.keys(body).forEach((key) => {
            if (
                body[key] === "" ||
                body[key] === undefined ||
                body[key] === "undefined"
            ) {
                delete body[key];
            }
        });

        if (body.password) {
            body.password = await hashPassword(body.password);
        }

        console.log(body);
        const updated = await this.knex("users")
            .update(body)
            .where("id", user_id)
            .returning("id");

        return updated;
    }

    // Incompleted but able to return friends with mockup data
    async getUserFriendsWithInfo(user_id: number) {
        const userFriends = await this.knex("users_relationship")
            .innerJoin("users", "users.id", "users_relationship.user2_id")
            .select(
                "users.id",
                "users.username",
                "users.first_name",
                "users.last_name"
            )
            .where("users_relationship.user1_id", user_id);
        return userFriends;
    }
}
