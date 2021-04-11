CREATE TABLE message (
    id uuid PRIMARY KEY,
    created_date timestamptz,
    updated_date timestamptz,
    value varchar(60) NOT NULL,
    palindrome boolean NOT NULL
);