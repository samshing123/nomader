import { Knex } from "knex";
import { Chance } from "chance";
const chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users_like_attractions").del();
    await knex("attractions_type").del();

    // Inserts seed entries
    const userId: Array<{ id: number }> = await knex("users").select("id");
    const interestId: Array<{ id: number }> = await knex("interests").select("id");
    const postId: Array<{ id: number }> = await knex("posts").select("id");
    const citiesId: Array<{ id: number, name: string }> = await knex("cities").select("id", "name");
    const countryId: Array<{ id: number }> = await knex("countries").select("id");
    const attractionId: Array<{ id: number }> = await knex("attractions").select("id");

    for (let user of userId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("users")
            .where("id", user["id"])
            .update({
                country_id: countryId[chance.integer({ min: 0, max: countryId.length - 1 })]["id"],
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }
    
    
    for (let post of postId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        let city = citiesId[chance.integer({ min: 0, max: citiesId.length - 1 })];
        let attractionId: Array<{ id: number }> = await knex("attractions").select("id").whereLike("city_list", `%${city["name"]}%`);
        await knex("posts")
            .where("id", post["id"])
            .update({
                attraction_id: attractionId[chance.integer({ min: 0, max: attractionId.length - 1 })]["id"],
                city_id: city["id"],
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }


    for (let attraction of attractionId) {
        let randomInterestNum = chance.integer({ min: 1, max: 3});
        let interestArr: Array<number> = [];
        for (let i = 0; i < randomInterestNum; i++) {
            let interest: number;
            do {
                interest = chance.integer({ min: 0, max: interestId.length - 1 })
            } while (interestArr.includes(interest));
            interestArr.push(interest);
            let attractionTypeData = {
                attraction_id: attraction["id"],
                interest_id: interestId[interest]["id"]
            };
            await knex("attractions_type").insert(attractionTypeData);
        }
    }


    for (let attraction of attractionId) {
        let readerNum = chance.integer({ min: 0, max: userId.length - 1 });
        for (let i = 0; i < readerNum; i++) {
            let reader = chance.integer({ min: 0, max: userId.length - 1 });
            let browseData = {
                user_id: userId[reader]["id"],
                browse_count: chance.integer({ min: 1, max: 100 }),
                attraction_id: attraction["id"]
            }
            await knex("users_like_attractions").insert(browseData);
        }
    }
    

    const relationshipId: Array<{ id: number }> = await knex("users_relationship").select("id");
    for (let relationship of relationshipId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("users_relationship")
            .where("id", relationship["id"])
            .update({
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }

    const chatRoomId: Array<{ id: number }> = await knex("chat_rooms").select("id");
    for (let room of chatRoomId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("chat_rooms")
            .where("id", room["id"])
            .update({
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }

    const chatId: Array<{ id: number }> = await knex("chats").select("id");
    for (let chat of chatId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("chats")
            .where("id", chat["id"])
            .update({
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }
    
    const browsePostId: Array<{ id: number }> = await knex("users_browse_posts").select("id");
    for (let post of browsePostId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("users_browse_posts")
            .where("id", post["id"])
            .update({
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }
    
    const browseAttractionId: Array<{ id: number }> = await knex("users_like_attractions").select("id");
    for (let browse of browseAttractionId) {
        let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664316000 });
        await knex("users_like_attractions")
            .where("id", browse["id"])
            .update({
                created_at: new Date(randomCreatedTime * 1000),
                updated_at: new Date(randomCreatedTime * 1000)
            })
    }
};
