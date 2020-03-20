CREATE EXTENSION pgcrypto;
CREATE TABLE groups
(
  id serial PRIMARY KEY,
  uuid uuid DEFAULT gen_random_uuid(),
  name VARCHAR (15) NOT NULL,
  description TEXT,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_by bigint NOT NULL,
  updated_by bigint,
  deleted_by bigint,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE EXTENSION moddatetime;
CREATE TRIGGER groups_moddatetime
    BEFORE
UPDATE ON groups
    FOR EACH ROW
EXECUTE PROCEDURE moddatetime
(updated_at);

CREATE TABLE group_members
(
  id serial PRIMARY KEY,
  user_id uuid DEFAULT gen_random_uuid(),
  added_by bigint NOT NULL,
  removed_by bigint,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  removed_at TIMESTAMPTZ
);
