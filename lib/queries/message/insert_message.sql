INSERT INTO
message (id, created_date, updated_date, value, palindrome)
VALUES ($1, $2, $3, $4, $5)
RETURNING *