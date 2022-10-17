import { Knex } from "knex";

export class locationService {
    constructor(private knex: Knex) {}

    async getAttractionData(id : number) { 
        const attractionData : Array<{ id : number, name : string, description : string, image : string, address : string, open_time : string, class : string, city_list : string}> = await this.knex("attractions")
            .select("*")
            .where("id", id);
        if (attractionData.length > 0) {
            return attractionData[0];
        } else {
            return [];
        }
    }

    async getCityData(id : number) {
        const cityData : Array<{ id : number, name : string, description : string, image : string, city_list : string}> = await this.knex("cities")
            .select("*")
            .where("id", id);
        if (cityData.length > 0) {
            return cityData[0];
        } else {
            return [];
        }
    }

    async selectAttractionInCity(cityId : number) { 
        const cityName : Array<{ name : string }> = await this.knex("cities")
            .select("name")
            .where("id", cityId);
            if (cityName.length > 0) {
                const name = cityName[0]["name"];
                const attractionInCity : Array<{ id : number, name : string }> = await this.knex("attractions")
                    .select("id", "name")
                    .whereLike("city_list", `%${name}%`);
                    if (attractionInCity.length > 0) {
                        return attractionInCity;
                    } else {
                        return [];
                    }
            } else {
                return [];
            }
    }

    async selectAttractionInCountry(countryId : number) { 
        const countryName : Array<{ name : string }> = await this.knex("cities")
            .select("name")
            .where("id", countryId);
            if (countryName.length > 0) {
                const name = countryName[0]["name"];
                const attractionInCountry : Array<{ id : number, name : string }> = await this.knex("attractions")
                    .select("id", "name")
                    .whereLike("city_list", `%${name}%`);
                    if (attractionInCountry.length > 0) {
                        return attractionInCountry;
                    } else {
                        return [];
                    }
            } else {
                return [];
            }
    }
}