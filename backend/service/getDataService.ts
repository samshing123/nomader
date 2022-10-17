import { Knex } from "knex";
import { AttractionPost } from "../utils/models";
// import { Interest } from "../utils/models";

export class GetDataService {
    constructor(private knex: Knex) {}

    async getInterestData() {
        const interests = await this.knex.select("*").from("interests");

        return interests;
    }

    async getCountryData() {
        const countries: Array<{ id: number; name: string }> = await this.knex
            .select("id", "name")
            .from("countries");

        return countries;
    }

    async getPostData() {
        const latestPost = await this.knex
            .select(
                "users.username",
                "users.profile",
                "posts.id",
                "posts.title",
                "posts.content",
                " posts.image",
                "posts.created_at"
            )
            .from("posts")
            .innerJoin("users", "posts.user_id", "=", "users.id")
            .orderBy("posts.created_at", "DESC");
        return latestPost;
    }

    async getHotPostData() {
        const hotPostList = await this.knex
            .select(
                "users.username",
                "users.profile",
                "posts.id",
                "posts.title",
                "posts.content",
                "posts.image",
                "posts.created_at"
            )
            .from("posts")
            .innerJoin("users", "posts.user_id", "=", "users.id")
            .innerJoin(
                "users_browse_posts",
                "posts.id",
                "=",
                "users_browse_posts.post_id"
            )
            .groupBy(
                "users_browse_posts.post_id",
                "users.username",
                "users.profile",
                "posts.id",
                "posts.title",
                "posts.content",
                "posts.image",
                "posts.created_at"
            )
            .orderByRaw("SUM(browse_count) DESC");

        return hotPostList;
    }

    async getAttractionData() {
        const getAttractions: Array<[AttractionPost]> = await this.knex
            .select(
                "id",
                "name",
                "description",
                "image",
                "address",
                "open_time",
                "city_list"
            )
            .from("attractions");

        return getAttractions;
    }

    async getCurrencyCode() {
        let codeArr = [];
        const countries: Array<{ name: string }> = await this.knex(
            "countries"
        ).select("name");
        for (let country of countries) {
            let name = country["name"];
            const codeData: Array<{
                code: string;
                currency_name: string;
                using_country: string;
            }> = await this.knex("currency_codes").select("*");
            for (let code of codeData) {
                if (code["using_country"].includes(name)) {
                    let codeOfCountry = {
                        country: name,
                        code: code["code"],
                        currency_name: code["currency_name"],
                    };
                    codeArr.push(codeOfCountry);
                }
            }
        }
        return codeArr;
    }

    async getCurrencyRates(code: string) {
        const thisYear = new Date(Date.now()).getFullYear();
        const thisMonth = new Date(Date.now()).getMonth() + 1;
        const thisDay = new Date(Date.now()).getDate();
        const codeId: Array<{ id: number }> = await this.knex("currency_codes")
            .select("id")
            .where("code", code);
        const currencyData: Array<{
            code_base: string;
            rates: number;
            code_to: string;
        }> = await this.knex("currency_rates")
            .select("currency_rates.rate", "currency_codes.*")
            .innerJoin(
                "currency_codes",
                "currency_rates.code_to_id",
                "currency_codes.id"
            )
            .where("currency_rates.year", thisYear)
            .andWhere("currency_rates.month", thisMonth)
            .andWhere("currency_rates.day", thisDay)
            .andWhere("currency_rates.code_base_id", codeId[0]["id"]);
        return currencyData;
    }

    async getEmergencyData(id: number) {
        const countries: Array<{
            emergency_tel: string;
            police_tel: string;
            ambulance_tel: string;
            fire_tel: string;
        }> = await this.knex
            .select("emergency_tel", "police_tel", "ambulance_tel", "fire_tel")
            .from("countries")
            .where("id", id);

        console.log(countries);
        return countries;
    }
}
