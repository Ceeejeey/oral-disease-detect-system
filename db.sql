CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    telephone character varying(15) COLLATE pg_catalog."default" NOT NULL,
    age integer,
    gender character varying(10) COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_age_check CHECK (age >= 0),
    CONSTRAINT users_gender_check CHECK (gender::text = ANY (ARRAY['Male'::character varying, 'Female'::character varying, 'Other'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.user_detections
(
    id integer NOT NULL DEFAULT nextval('user_detections_id_seq'::regclass),
    user_id integer NOT NULL,
    image bytea NOT NULL,
    prediction character varying(255) COLLATE pg_catalog."default" NOT NULL,
    confidence numeric(5,4) NOT NULL,
    detected_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_detections_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_detections
    OWNER to postgres;