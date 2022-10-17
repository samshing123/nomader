
CREATE OR REPLACE FUNCTION insert_staging_countries()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO dim_countries
            (name)
            VALUES (NEW.name);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_countries
AFTER INSERT ON staging_countries
FOR EACH ROW EXECUTE PROCEDURE insert_staging_countries();



CREATE OR REPLACE FUNCTION insert_staging_cities()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO dim_cities
            (name, city_list)
            VALUES (NEW.name, NEW.city_list);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_cities
AFTER INSERT ON staging_cities
FOR EACH ROW EXECUTE PROCEDURE insert_staging_cities();



CREATE OR REPLACE FUNCTION insert_staging_attractions()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO dim_attractions
            (name, city_list)
            VALUES (NEW.name, NEW.city_list);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_attractions
AFTER INSERT ON staging_attractions
FOR EACH ROW EXECUTE PROCEDURE insert_staging_attractions();



CREATE OR REPLACE FUNCTION insert_staging_interests()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO dim_interests
            (title)
            VALUES (NEW.title);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_interests
AFTER INSERT ON staging_interests
FOR EACH ROW EXECUTE PROCEDURE insert_staging_interests();



CREATE OR REPLACE FUNCTION insert_staging_jobs()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO dim_jobs
            (title)
            VALUES (NEW.title);
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_jobs
AFTER INSERT ON staging_jobs
FOR EACH ROW EXECUTE PROCEDURE insert_staging_jobs();


CREATE OR REPLACE FUNCTION insert_staging_chat_rooms()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_chat_rooms
            (created_date_id, user_manager_id, user_member_id)
            VALUES (
                created_date_id,
                (SELECT id FROM fact_users WHERE id = NEW.user_manager_id),
                (SELECT id FROM fact_users WHERE id = NEW.user_member_id)
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_chat_rooms
AFTER INSERT ON staging_chat_rooms
FOR EACH ROW EXECUTE PROCEDURE insert_staging_chat_rooms();



CREATE OR REPLACE FUNCTION insert_staging_chats()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_chats
            (chat_room_id, created_date_id)
            VALUES (
                (SELECT id FROM fact_chat_rooms WHERE id = NEW.chat_room_id), 
                created_date_id
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_chats
AFTER INSERT ON staging_chats
FOR EACH ROW EXECUTE PROCEDURE insert_staging_chats();



CREATE OR REPLACE FUNCTION insert_staging_users()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        birthday_id INTEGER;
        created_date_id INTEGER;
        gender_id INTEGER;
    BEGIN
        INSERT INTO dim_genders
            (status)
            VALUES (NEW.gender)
            ON CONFLICT(status)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO gender_id;
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.birthday_year, NEW.birthday_month, NEW.birthday_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO birthday_id;
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_users
            (country_id, birthday_id, created_date_id, job_id, gender_id, isAdmin)
            VALUES (
                (SELECT id FROM dim_countries WHERE id = NEW.country_id), 
                birthday_id, 
                created_date_id, 
                (SELECT id FROM dim_jobs WHERE id = NEW.job_id), 
                gender_id, 
                NEW.isAdmin
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_users
AFTER INSERT ON staging_users
FOR EACH ROW EXECUTE PROCEDURE insert_staging_users();




CREATE OR REPLACE FUNCTION insert_staging_users_relationship()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_users_relactionship
            (user1_id, user2_id, created_date_id)
            VALUES (
                (SELECT id FROM fact_users WHERE id = NEW.user1_id), 
                (SELECT id FROM fact_users WHERE id = NEW.user2_id), 
                created_date_id
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_users_relactionship
AFTER INSERT ON staging_users_relationship
FOR EACH ROW EXECUTE PROCEDURE insert_staging_users_relationship();




CREATE OR REPLACE FUNCTION insert_staging_browse_attractions()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_browse_attractions
            (user_id, attraction_id, browse_count, created_date_id)
            VALUES (
                (SELECT id FROM fact_users WHERE id = NEW.user_id), 
                (SELECT id FROM dim_attractions WHERE id = NEW.attraction_id), 
                NEW.browse_count, 
                created_date_id
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_browse_attractions
AFTER INSERT ON staging_browse_attractions
FOR EACH ROW EXECUTE PROCEDURE insert_staging_browse_attractions();




CREATE OR REPLACE FUNCTION insert_staging_users_interests()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO fact_users_interests
            (user_id, interest_id)
            VALUES (
                (SELECT id FROM fact_users WHERE id = NEW.user_id), 
                (SELECT id FROM dim_interests WHERE id = NEW.interest_id)
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_users_interests
AFTER INSERT ON staging_users_interests
FOR EACH ROW EXECUTE PROCEDURE insert_staging_users_interests();




CREATE OR REPLACE FUNCTION insert_staging_posts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_posts
            (user_id, city_id, attraction_id, created_date_id)
            VALUES (
                (SELECT id FROM fact_users WHERE id = NEW.user_id), 
                (SELECT id FROM dim_cities WHERE id = NEW.city_id), 
                (SELECT id FROM dim_attractions WHERE id = NEW.attraction_id), 
                created_date_id
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_posts
AFTER INSERT ON staging_posts
FOR EACH ROW EXECUTE PROCEDURE insert_staging_posts();




CREATE OR REPLACE FUNCTION insert_staging_browse_posts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    DECLARE
        created_date_id INTEGER;
    BEGIN
        INSERT INTO dim_dates
            (year, month, day)
            VALUES (NEW.created_year, NEW.created_month, NEW.created_day)
            ON CONFLICT(year, month, day)
            DO UPDATE set updated_at = NOW()
            RETURNING id
            INTO created_date_id;
        INSERT INTO fact_browse_posts
            (user_id, post_id, browse_count, created_date_id)
            VALUES (
                (SELECT id FROM fact_users WHERE id = NEW.user_id), 
                (SELECT id FROM fact_posts WHERE id = NEW.post_id), 
                NEW.browse_count,
                created_date_id
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_browse_posts
AFTER INSERT ON staging_browse_posts
FOR EACH ROW EXECUTE PROCEDURE insert_staging_browse_posts();





CREATE OR REPLACE FUNCTION insert_staging_posts_type()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO fact_posts_type
            (interest_id, post_id)
            VALUES (
                (SELECT id FROM dim_interests WHERE id = NEW.interest_id), 
                (SELECT id FROM fact_posts WHERE id = NEW.post_id)
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_posts_type
AFTER INSERT ON staging_posts_type
FOR EACH ROW EXECUTE PROCEDURE insert_staging_posts_type();



CREATE OR REPLACE FUNCTION insert_staging_attractions_type()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
    BEGIN
        INSERT INTO fact_attractions_type
            (interest_id, attraction_id)
            VALUES (
                (SELECT id FROM dim_interests WHERE id = NEW.interest_id), 
                (SELECT id FROM dim_attractions WHERE id = NEW.attraction_id)
                );
        RETURN NEW;
    END
$$;

CREATE TRIGGER trigger_insert_staging_attractions_type
AFTER INSERT ON staging_attractions_type
FOR EACH ROW EXECUTE PROCEDURE insert_staging_attractions_type();