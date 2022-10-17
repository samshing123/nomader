import { Knex } from "knex";
import { Chance } from "chance";
import { hashPassword } from "../utils/hash";

const chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users_browse_posts").del();
    await knex("posts_type").del();
    await knex("posts").del();
    await knex("chats").del();
    await knex("chat_rooms").del();
    await knex("users_relationship").del();
    await knex("users_interests").del();
    await knex("users").del();
    await knex("jobs").del();
    await knex("interests").del();

    // Inserts seed entries
    const interestId: Array<{ id: number }> = await knex("interests")
        .insert([
            { title: "hiking", image: "hiking.png" },
            { title: "camping",image: "camping.png" },
            { title: "cycling", image: "cycling.png" },
            { title: "foodie", image: "foodie.png" },
            { title: "party", image: "party.png" },
            { title: "photo shooting", image: "photoShooting.png" },
            { title: "reading", image: "reading.png" },
            { title: "singing", image: "singing" },
            { title: "busking", image: "busking.png" },
            { title: "diving", image: "diving.png" },
            { title: "watch concert", image: "watchConcert.png" },
            { title: "watch match", image: "watchMatch.png" },
            { title: "join event", image: "joinEvent.png" },
            { title: "skiing", image: "skiing.png" },
            { title: "shopping", image: "shopping.png" }
        ])
        .returning("id");

    const jobId: Array<{ id: number }> = await knex("jobs")
        .insert([
            { title: "student" },
            { title: "slash" },
            { title: "designer" },
            { title: "programmer" },
            { title: "entrepreneur" },
            { title: "YouTuber" },
            { title: "other" },
        ])
        .returning("id");
    

    let randomUser = [];
    let userData = {};
    let nameArr : Array<string> = [];
    for (let i = 0; i < 150 ; i++) {
        switch ( i ) {
            case 0 : 
                userData = {
                    username: "kc",
                    password: (await hashPassword("1234")).toString(),
                    first_name: "kc",
                    last_name: "kc",
                    birthday: "29-2-2000",
                    gender: "Female",
                    information: "hi",
                    profile: "",
                    email: "kc@kc",
                    phone_num: "1234",
                    job_id: jobId[1].id,
                    isAdmin: true
                }
                nameArr.push(userData["username"]);
                break;
            case 1 :
                userData = {
                    username: "danny",
                    password: (await hashPassword("1234")).toString(),
                    first_name: "danny",
                    last_name: "danny",
                    birthday: "29-2-2000",
                    gender: "Male",
                    information: "hi",
                    profile: "",
                    email: "danny@danny",
                    phone_num: "12345678",
                    job_id: jobId[2].id,
                    isAdmin: true
                }
                nameArr.push(userData["username"]);
                break;
            case 2 : 
                userData = {
                    username: "sam",
                    password: (await hashPassword("1234")).toString(),
                    first_name: "sam",
                    last_name: "sam",
                    birthday: "29-2-2000",
                    gender: "Male",
                    information: "hi",
                    profile: "",
                    email: "sam@sam",
                    phone_num: "12345678",
                    job_id: jobId[2].id,
                    isAdmin: true
                }
                nameArr.push(userData["username"]);
                break;
            default : 
                do {
                    let birthday = chance.birthday({ string: true }) as string;
                    let birthdayArr = birthday.split("/");
                    userData = {
                        username: chance.first(),
                        password: (await hashPassword("1234")).toString(),
                        first_name: chance.first(),
                        last_name: chance.last(),
                        birthday: `${birthdayArr[1]}-${birthdayArr[0]}-${birthdayArr[2]}`,
                        gender: chance.gender(),
                        information: chance.sentence(),
                        profile: "",
                        email: chance.email(),
                        phone_num: chance.integer({ min: 10000000, max: 99999999 }),
                        job_id: jobId[chance.integer({ min: 0, max: jobId.length - 1 })]["id"],
                        isAdmin: false
                    };
                } while (nameArr.includes(userData["username"]));

                nameArr.push(userData["username"]);
                break;
        }
        randomUser.push(userData);
    }

    const userId: Array<{ id: number }> = await knex("users")
        .insert(randomUser)
        .returning("id");

    
    for (let user of userId) {
        let randomInterestNum = chance.integer({ min: 1, max: 6});
        for (let i = 0; i < randomInterestNum; i++) {
            let usersInterestsData = {
                user_id: user["id"],
                interest_id: interestId[chance.integer({ min: 0, max: interestId.length - 1 })]["id"]
            };
            await knex("users_interests").insert(usersInterestsData);
        }
    }


    let usersRelationshipData = {};
    let matchedIdData: Array<[number, number]> = [];
    let friendIdData: Array<[number, number]> = [];
    for (let i = 0; i < userId.length; i++) {
        let randomMatchNum = chance.integer({ min: 0, max: userId.length - 1 });
        let friendId : Array<number> = [];
        let matchUserId : number;
        for (let j = 0; j < randomMatchNum; j++) {
            do {
                do {
                    matchUserId = chance.integer({ min: 0, max: userId.length - 1 });
                } while (matchUserId === i);
            } while (friendId.includes(matchUserId));
            friendId.push(matchUserId);

            usersRelationshipData = {
                user1_id: userId[i]["id"],
                status: "friend",
                user2_id: userId[matchUserId]["id"]
            };

            let matchedUserId: number = usersRelationshipData["user2_id"];

            matchedIdData.push([userId[i]["id"], matchedUserId]);
            for (let match of matchedIdData) {
                if (match[0] === matchedUserId && match[1] === userId[i]["id"]) {
                    friendIdData.push([userId[i]["id"], matchedUserId]);
                }
            }
            await knex("users_relationship").insert(usersRelationshipData);
        }
    }

    


    for (let friendUser of friendIdData) {
        let chatRoomData = {
            room_title: chance.word(),
            user_manager_id: friendUser[0],
            user_member_id: friendUser[1],
        }
        await knex("chat_rooms").insert(chatRoomData);
    }


    const chatRoomId: Array<{ id: number }> = await knex("chat_rooms").select("id");
    for (let room of chatRoomId) {
        const roomData: Array<{ user_manager_id: number, user_member_id: number }> = await knex("chat_rooms")
            .select("user_manager_id", "user_member_id")
            .where("id", room["id"]);
        let randomChatNum = chance.integer({min: 0, max: 10 });
        for (let i = 0; i < randomChatNum; i++) {
            let chatUser = chance.bool();
            let speechUser = 0;
            let listenUser = 0;
            if (chatUser === true) {
                speechUser = roomData[0]["user_manager_id"];
                listenUser = roomData[0]["user_member_id"];
            } else {
                speechUser = roomData[0]["user_member_id"];
                listenUser = roomData[0]["user_manager_id"];
            }

            let chatData = {
                chat_room_id: room["id"],
                user_speech_id: speechUser,
                content: chance.sentence(),
                user_listen_id: listenUser
            }
            await knex("chats").insert(chatData);
        }
    }


    for (let i = 0; i < 200; i++) {
        let writer = chance.integer({ min: 0, max: userId.length - 1 });
        let postData = {
            user_id: userId[writer]["id"],
            title: chance.sentence(),
            content: chance.paragraph()
        }
        await knex("posts").insert(postData);
    }
    
    
    const postId : Array<{ id: number }> = await knex("posts").select("id");
    
    for (let post of postId) {
        let randomInterestNum = chance.integer({ min: 1, max: 3});
        for (let i = 0; i < randomInterestNum; i++) {
            let postsTypeData = {
                post_id: post["id"],
                interest_id: interestId[chance.integer({ min: 0, max: interestId.length - 1 })]["id"]
            };
            await knex("posts_type").insert(postsTypeData);
        }
    }


    for (let post of postId) {
        let readerNum = chance.integer({ min: 0, max: userId.length });
        for (let i = 0; i < readerNum; i++) {
            let randomCreatedTime = chance.integer({ min: 1654041600, max: 1664582400 });
            let reader = chance.integer({ min: 0, max: userId.length - 1 });
            let browseData = {
                user_id: userId[reader]["id"],
                browse_count: chance.integer({ min: 1, max: 100 }),
                post_id: post["id"],
                created_at: new Date(randomCreatedTime)
            }
            await knex("users_browse_posts").insert(browseData);
        }
    }

}
