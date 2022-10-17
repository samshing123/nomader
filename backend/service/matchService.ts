import { Knex } from "knex";

export class MatchService {
    constructor(private knex: Knex) {}

    async getAllUserId(id: number) {
        const userId: Array<{ id: number }> = await this.knex("users")
            .select("id")
            .where("isAdmin", false)
            .andWhereNot("id", id);
        return userId;
    }

    async geUserIdWhoYouWantToMatch(id: number) {
        const userId: Array<{ user2_id: number }> = await this.knex(
            "users_relationship"
        )
            .select("user2_id")
            .where("user1_id", id);
        return userId;
    }

    async getUserIdWhoWaitMatchYou(id: number) {
        const userId: Array<{ user1_id: number }> = await this.knex(
            "users_relationship"
        )
            .select("user1_id")
            .where("user2_id", id);
        return userId;
    }

    async checkAlreadyMatchedUser(myId: number, otherId: number) {
        const matchId: Array<{ id: number }> = await this.knex(
            "users_relationship"
        )
            .select("id")
            .where("user1_id", myId)
            .andWhere("user2_id", otherId);
        if (matchId.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async getUserInfo(id: number) {
        const interestIdList: Array<{ title: string }> = await this.knex(
            "users_interests"
        )
            .select("interests.title")
            .innerJoin(
                "interests",
                "users_interests.interest_id",
                "interests.id"
            )
            .where("users_interests.user_id", id);
        const userData: Array<{
            username: string;
            title: string;
            information: string;
            profile: string;
            name: string;
        }> = await this.knex("users")
            .select(
                "users.username",
                "jobs.title",
                "users.information",
                "users.profile",
                "users.gender",
                "countries.name"
            )
            .innerJoin("jobs", "users.job_id", "jobs.id")
            .innerJoin("countries", "users.country_id", "countries.id")
            .where("users.id", id);
        return { interestIdList, userData };
    }

    async unlikeWaitingMatchUser(id: number, userId: number) {
        return await this.knex("users_relationship")
            .where("user1_id", userId)
            .andWhere("user2_id", id)
            .del();
    }

    async likeUser(id: number, userId: number) {
        const relationshipId: Array<{ id: number }> = await this.knex(
            "users_relationship"
        )
            .insert([
                {
                    user1_id: id,
                    status: "like",
                    user2_id: userId,
                },
            ])
            .returning("id");
        return relationshipId;
    }
}
