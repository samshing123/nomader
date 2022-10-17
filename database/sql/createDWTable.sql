
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE staging_users (
    id SERIAL PRIMARY KEY,
    birthday_year INTEGER,
    birthday_month INTEGER,
    birthday_day INTEGER,
    gender TEXT,
    job_id INTEGER,
    isAdmin BOOLEAN,
    country_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER
);

CREATE TABLE staging_jobs (
    id SERIAL PRIMARY KEY,
    title TEXT
); 

CREATE TABLE staging_interests (
    id SERIAL PRIMARY KEY,
    title TEXT
);

CREATE TABLE staging_users_interests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    interest_id INTEGER
);

CREATE TABLE staging_chat_rooms (
    id SERIAL PRIMARY KEY,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER,
    user_manager_id INTEGER,
    user_member_id INTEGER
);

CREATE TABLE staging_chats (
    id SERIAL PRIMARY KEY,
    chat_room_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER
);

CREATE TABLE staging_users_relationship (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER,
    user2_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER
);

CREATE TABLE staging_browse_attractions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    browse_count INTEGER,
    attraction_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER 
);

CREATE TABLE staging_countries (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE staging_cities (
    id SERIAL PRIMARY KEY,
    name TEXT,
    city_list TEXT
);

CREATE TABLE staging_attractions (
    id SERIAL PRIMARY KEY,
    name TEXT,
    city_list TEXT
);

CREATE TABLE staging_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    city_id INTEGER,
    attraction_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER
);

CREATE TABLE staging_browse_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    browse_count INTEGER,
    post_id INTEGER,
    created_year INTEGER,
    created_month INTEGER,
    created_day INTEGER 
);

CREATE TABLE staging_posts_type (
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    interest_id INTEGER
);

CREATE TABLE staging_attractions_type (
    id SERIAL PRIMARY KEY,
    attraction_id INTEGER,
    interest_id INTEGER
);

CREATE TABLE dim_countries (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dim_cities (
    id SERIAL PRIMARY KEY,
    name TEXT,
    city_list TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dim_attractions (
    id SERIAL PRIMARY KEY,
    name TEXT,
    city_list TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dim_interests (
    id SERIAL PRIMARY KEY,
    title TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE dim_jobs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
 
CREATE TABLE dim_genders (
    id SERIAL PRIMARY KEY,
    status TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE UNIQUE INDEX genders_unique_idx on dim_genders(status);

CREATE TABLE dim_dates (
    id SERIAL PRIMARY KEY,
    year TEXT,
    month TEXT,
    day TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE UNIQUE INDEX dates_unique_idx on dim_dates (year, month, day);



CREATE TABLE fact_attractions_type (
    id SERIAL PRIMARY KEY,
    attraction_id INTEGER,
    FOREIGN KEY (attraction_id) REFERENCES dim_attractions(id),
    interest_id INTEGER,
    FOREIGN KEY (interest_id) REFERENCES dim_interests(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE fact_users (
    id SERIAL PRIMARY KEY,
    birthday_id INTEGER,
    FOREIGN KEY (birthday_id) REFERENCES dim_dates(id),
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    country_id INTEGER,
    FOREIGN KEY (country_id) REFERENCES dim_countries(id),
    job_id INTEGER,
    FOREIGN KEY (job_id) REFERENCES dim_jobs(id),
    gender_id INTEGER,
    FOREIGN KEY (gender_id) REFERENCES dim_genders(id),
    isAdmin BOOLEAN,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_chat_rooms (
    id SERIAL PRIMARY KEY,
    user_manager_id INTEGER,
    FOREIGN KEY (user_manager_id) REFERENCES fact_users(id),
    user_member_id INTEGER,
    FOREIGN KEY (user_member_id) REFERENCES fact_users(id),
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_chats (
    id SERIAL PRIMARY KEY,
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    chat_room_id INTEGER,
    FOREIGN KEY (chat_room_id) REFERENCES fact_chat_rooms(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_users_interests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES fact_users(id),
    interest_id INTEGER,
    FOREIGN KEY (interest_id) REFERENCES dim_interests(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_users_relactionship (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER,
    FOREIGN KEY (user1_id) REFERENCES fact_users(id),
    user2_id INTEGER,
    FOREIGN KEY (user2_id) REFERENCES fact_users(id),
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_browse_attractions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES fact_users(id),
    attraction_id INTEGER,
    FOREIGN KEY (attraction_id) REFERENCES dim_attractions(id),
    browse_count INTEGER,
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES fact_users(id),
    city_id INTEGER,
    FOREIGN KEY (city_id) REFERENCES dim_cities(id),
    attraction_id INTEGER,
    FOREIGN KEY (attraction_id) REFERENCES dim_attractions(id),
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_browse_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES fact_users(id),
    browse_count INTEGER,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES fact_posts(id),
    created_date_id INTEGER,
    FOREIGN KEY (created_date_id) REFERENCES dim_dates(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fact_posts_type (
    id SERIAL PRIMARY KEY,
    interest_id INTEGER,
    FOREIGN KEY (interest_id) REFERENCES dim_interests(id),
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES fact_posts(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
