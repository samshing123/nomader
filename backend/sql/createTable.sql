CREATE TABLE currency_codes (
    id SERIAL PRIMARY KEY,
    code TEXT NOT NULL,
    currency_name TEXT,
    using_country TEXT
);

CREATE TABLE currency_rates (
    id SERIAL PRIMARY KEY,
    code_base_id INTEGER,
    FOREIGN KEY (code_base_id) REFERENCES currency_codes(id),
    rate FLOAT,
    code_to_id INTEGER,
    FOREIGN KEY (code_to_id) REFERENCES currency_codes(id),
    year INTEGER,
    month INTEGER,
    day INTEGER
);

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tel_code TEXT,
    location_group TEXT,
    emergency_tel TEXT,
    police_tel TEXT,
    ambulance_tel TEXT,
    fire_tel TEXT,
    info TEXT
);


CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    city_list TEXT
);

CREATE TABLE attractions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    address TEXT NOT NULL,
    open_time TEXT,
    class TEXT,
    city_list TEXT
);

CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT
);

CREATE TABLE attreactions_type (
    id SERIAL PRIMARY KEY,
    attraction_id INTEGER,
    interest_id INTEGER,
    FOREIGN KEY (attraction_id) REFERENCES attractions(id),
    FOREIGN KEY (interest_id) REFERENCES interests(id)
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birthday TEXT,
    gender TEXT,
    information TEXT,
    profile TEXT,
    email TEXT NOT NULL,
    phone_num INTEGER NOT NULL,
    job_id INTEGER,
    emergency_contact_person TEXT,
    emergency_contact_num INTEGER,
    country_id INTEGER,
    isAdmin BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    attraction_id INTEGER,
    city_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (attraction_id) REFERENCES attractions(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE posts_type (
    id SERIAL PRIMARY KEY,
    interest_id INTEGER,
    post_id INTEGER,
    FOREIGN KEY (interest_id) REFERENCES interests(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE users_browse_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    browse_count INTEGER,
    post_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE users_interests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    interest_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (interest_id) REFERENCES interests(id)
);

CREATE TABLE users_like_attractions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    attraction_id INTEGER,
    like_attraction BOOLEAN NOT NULL,
    browse_count INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (attraction_id) REFERENCES attractions(id)
);

CREATE TABLE users_relationship (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER,
    status TEXT NOT NULL,
    user2_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE chat_rooms (
    id SERIAL PRIMARY KEY,
    room_title TEXT NOT NULL,
    user_manager_id INTEGER,
    user_member_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_manager_id) REFERENCES users(id),
    FOREIGN KEY (user_member_id) REFERENCES users(id)
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    chat_romm_id INTEGER,
    user_speech_id INTEGER,
    content TEXT,
    image TEXT,
    voice TEXT,
    user_listen_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_speech_id) REFERENCES users(id),
    FOREIGN KEY (user_listen_id) REFERENCES users(id)
);




CREATE TABLE db_emergency_data (
    id SERIAL PRIMARY KEY,
    country_name TEXT,
    emergency_tel TEXT,
    police_tel TEXT,
    ambulance_tel TEXT,
    fire_tel TEXT,
    location_group TEXT,
    calling_code TEXT,
    info TEXT
);

CREATE TABLE db_currency_codes (
    id SERIAL PRIMARY KEY,
    code TEXT,
    currency_name TEXT,
    using_country TEXT
);

CREATE TABLE db_city_data (
    id SERIAL PRIMARY KEY,
    city_name TEXT,
    description TEXT,
    image TEXT,
    city_list TEXT
);

CREATE TABLE db_attractions (
    id SERIAL PRIMARY KEY,
    attraction_name TEXT,
    description TEXT,
    image TEXT,
    address TEXT,
    city_list TEXT,
    open_time TEXT,
    class TEXT
);

CREATE TABLE db_currency_rates (
    id SERIAL PRIMARY KEY,
    year INTEGER,
    month INTEGER,
    day INTEGER,
    code_base TEXT,
    code_to TEXT,
    rate FLOAT
);

