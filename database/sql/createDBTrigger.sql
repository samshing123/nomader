
CREATE OR REPLACE FUNCTION insert_emergency_data() 
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO countries
            (name, tel_code, location_group, emergency_tel, police_tel, ambulance_tel, fire_tel, info)
            VALUES (NEW.country_name, NEW.calling_code, NEW.location_group, NEW.emergency_tel, NEW.police_tel, NEW.ambulance_tel, NEW.fire_tel, NEW.info);

        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_emergency_data
AFTER INSERT ON db_emergency_data
FOR EACH ROW EXECUTE PROCEDURE insert_emergency_data();




CREATE OR REPLACE FUNCTION insert_city_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO cities
            (name, description, image, city_list)
            VALUES (NEW.city_name, NEW.description, NEW.image, NEW.city_list);

        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_city_data
AFTER INSERT ON db_city_data
FOR EACH ROW EXECUTE PROCEDURE insert_city_data();




CREATE OR REPLACE FUNCTION insert_attraction_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO attractions
            (name, description, image, address, open_time, city_list, class)
            VALUES (NEW.attraction_name, NEW.description, NEW.image, NEW.address, NEW.open_time, NEW.city_list, NEW.class);

        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_attraction_data
AFTER INSERT ON db_attractions
FOR EACH ROW EXECUTE PROCEDURE insert_attraction_data();





CREATE OR REPLACE FUNCTION insert_currency_codes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO currency_codes
            (code, currency_name, using_country)
            VALUES (NEW.code, NEW.currency_name, NEW.using_country);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_cuurency_codes
AFTER INSERT ON db_currency_codes
FOR EACH ROW EXECUTE PROCEDURE insert_currency_codes();




CREATE OR REPLACE FUNCTION insert_currency_rates()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO currency_rates
            (code_base_id, code_to_id, rate, year, month, day)
            VALUES (
                ( SELECT id FROM currency_codes WHERE code = NEW.code_base LIMIT 1 ), 
                ( SELECT id FROM currency_codes WHERE code = NEW.code_to LIMIT 1 ), 
                NEW.rate, 
                NEW.year, 
                NEW.month, 
                NEW.day
            );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_currency_rates
AFTER INSERT ON db_currency_rates
FOR EACH ROW EXECUTE PROCEDURE insert_currency_rates();
