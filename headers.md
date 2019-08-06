# MySQL --

- [Official site](https://mysql.com) 
  - [Docs](https://dev.mysql.com/doc/refman/en)

---
--
- [How to comment](#how-to-comment)
  - [How to comment - Additional info](#how-to-comment---additional-info)
- [How to `SHOW DATABASES`](#how-to-show-databases)
- [How to `CREATE DATABASE`](#how-to-create-database)
  - [How to `CREATE DATABASE IF NOT EXISTS`](#how-to-create-database-if-not-exists)
  - [How to `CREATE DATABASE` - Additional info](#how-to-create-database---additional-info)
- [How to see character set and collation name of a database](#how-to-see-character-set-and-collation-name-of-a-database)
- [How to `DROP DATABASE`](#how-to-drop-database)
- [How to `USE` database](#how-to-use-database)
- [How to `SHOW TABLES`](#how-to-show-tables)
- [How to `CREATE TABLE`](#how-to-create-table)
- [How to see table scheme](#how-to-see-table-scheme)
- [How to `DROP TABLE`](#how-to-drop-table)
- [How to `INSERT INTO`](#how-to-insert-into)
- [How to `SELECT`](#how-to-select)
- [How to see `AUTO_INCREMENT`](#how-to-see-auto_increment)
- [How to set `AUTO_INCREMENT`](#how-to-set-auto_increment)
- [`ASC` & `DESC`](#asc--desc)
- [How to `DELETE`](#how-to-delete)
- [How to `UPDATE`](#how-to-update)
- [How to `ALTER TABLE`](#how-to-alter-table)
- [String functions](#string-functions)
- [How to use `WHEN` clause](#how-to-use-when-clause)
- [How to use `HAVING` clause](#how-to-use-having-clause)
- [How to copy table (stackoverflow.com)](https://stackoverflow.com/a/3280042/4223982)
- [Views](#views)
- [Primary key or Unique index? (stackoverflow.com)](https://stackoverflow.com/q/487314/4223982)
- [Server](#server)
  - [Configuration files](#configuration-files)
  - [How to set password for `root` user aftre fresh installation](#how-to-set-password-for-root-user-aftre-fresh-installation)
  - [How to change password](#how-to-change-password)
  - [How to set timezone](#how-to-set-timezone)
  - [SQL mode](#sql-mode)
- [How To Manage an SQL Database (digitalocean.com)](https://digitalocean.com/community/tutorials/how-to-manage-sql-database-cheat-sheet)
- [Errors](#errors)
  - [ERROR 1698 (28000): Access denied for user 'root'@'localhost'](#error-1698-28000-access-denied-for-user-rootlocalhost)

## How to comment

- From a `#` character to the end of the line.
- From a `--` sequence to the end of the line. In MySQL, the `--` (double-dash) comment style requires the second dash **to be followed by** at least one **whitespace** or **control character** (such as a space, tab, newline, and so on).
- From a `/*` sequence to the following `*/` sequence, as in the C programming language.

### How to comment - Additional info

- [Comment Syntax (dev.mysql.com)](http://dev.mysql.com/doc/refman/en/comments.html)

## How to `SHOW DATABASES`

``` mysql
SHOW DATABASES;
```

## How to `CREATE DATABASE`

``` mysql
CREATE DATABASE my_db; # Default CHARACTER SET is "latin1", and COLLATE — "latin1_swedish_ci"

CREATE DATABASE my_db CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE my_db CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE DATABASE my_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE DATABASE my_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; # The best practice
```

### How to `CREATE DATABASE IF NOT EXISTS`

``` mysql
CREATE DATABASE IF NOT EXISTS my_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### How to `CREATE DATABASE` - Additional info

- [Create a database with charset utf-8 (dba.stackexchange.com)](http://dba.stackexchange.com/q/76788/98626)

## How to see character set and collation name of a database

``` mysql
SELECT default_character_set_name, default_collation_name
FROM information_schema.schemata WHERE schema_name = 'my_db';
```

- https://stackoverflow.com/a/1049958/4223982

## How to `DROP DATABASE`

``` mysql
DROP DATABASE my_db;
```

## How to `USE` database

``` mysql
USE my_db;
```

## How to `SHOW TABLES`

``` mysql
# USE my_db;

SHOW TABLES;
```

## How to `CREATE TABLE`

``` mysql
# USE my_db;
```

``` mysql
CREATE TABLE user (
  id INT AUTO_INCREMENT, # Default INT is INT(11)
  first_name VARCHAR(255),
  middle_name VARCHAR(255),
  last_name VARCHAR(255),
  PRIMARY KEY(id)
)
# Default CHARACTER SET and COLLATE is the same as for database ("latin1" and "latin1_swedish_ci")
CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
```

``` mysql
CREATE TABLE `order` ( # Use backquotes, because ORDER is a keyword
  id INT AUTO_INCREMENT PRIMARY KEY, # PRIMARY KEY may be here
  user_id INT,
  amount FLOAT,
  date DATETIME
)
CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
```

## How to see table scheme

``` mysql
# USE my_db;

DESC user;
```

## How to `DROP TABLE`

``` mysql
# USE my_db;

DROP TABLE user;
DROP TABLE user, order;
```

## How to `INSERT INTO`

``` mysql
# USE my_db;
```

``` mysql
INSERT INTO user
VALUES (1, 'Troy', NULL, 'Bednell'); # id, first_name, middle_name, last_name
```

``` mysql
# For the field(s) with auto increment we can specify NULL
# In this case auto increment is triggered automatically
INSERT INTO user
VALUES (NULL, 'Edy', NULL, 'Villiers'); # id, first_name, middle_name, last_name
```

``` mysql
# Insert only several fields
INSERT INTO user (last_name, first_name) # The order of fields does not matter
VALUES ('Scholey', 'Annie'); # Auto increment is triggered automatically
```

``` mysql
# Insert many records at a time
INSERT INTO user (first_name, last_name) VALUES
('Cchaddie', 'Flieg'),
('Leopold', 'Druce'),
('Hillary', 'Turtle');
```

## How to `SELECT`

``` mysql
# USE my_db;
```

``` mysql
# Select all (*) fields from "user" table
SELECT * FROM user;
```

``` mysql
# Select "first_name" and "last_name" fields from "user" table
SELECT first_name, last_name FROM user;
```

``` mysql
# Select "first_name" and "last_name" fields from "user" table where "id" field is 3
SELECT first_name, last_name FROM user WHERE id = 3;
```

``` mysql
# Select "first_name" and "last_name" fields from "user" table where "first_name" field is "troy"
# The search is case insensitive
SELECT first_name, last_name FROM user WHERE first_name = 'troy';
```

``` mysql
SELECT * FROM user WHERE id = 3 OR id = 4;
SELECT * FROM user WHERE (id = 3 OR id = 4) AND first_name = 'jack';
```

``` mysql
SELECT * FROM user WHERE id < 3;
SELECT * FROM user WHERE id > 3;
SELECT * FROM user WHERE id <= 3;
SELECT * FROM user WHERE id >= 3;
SELECT * FROM user WHERE id <> 3;
SELECT * FROM user WHERE id != 3;
```

``` mysql
# The percentage ( % ) wildcard allows you to match any string of zero or more characters
# The underscore ( _ ) wildcard allows you to match any single character
# http://www.mysqltutorial.org/mysql-like
SELECT * FROM user WHERE lastname LIKE '%ord';
SELECT * FROM user WHERE lastname LIKE '%ord%';
SELECT * FROM user WHERE lastname LIKE '_ord';
```

``` mysql
SELECT * FROM user WHERE id IN (1, 3, 5, 7);
```

``` mysql
# "1" and "5" inclusive
SELECT * FROM user WHERE id BETWEEN 1 AND 5;
# SELECT * FROM user WHERE id BETWEEN 5 AND 1; # Does not work
```

``` mysql
# "A" inclusive, "J" nomm
SELECT * FROM user WHERE first_name BETWEEN 'A' AND 'J';
```

``` mysql
SELECT * FROM user WHERE id NOT BETWEEN 1 AND 99;
SELECT * FROM user WHERE id NOT IN (1, 2, 3);
```

``` mysql
SELECT DISTINCT first_name FROM user;
```

``` mysql
SELECT first_name FROM user ORDER BY age DESC LIMIT 1; # The oldest user
```

``` mysql
SELECT first_name AS firstname FROM user; # SELECT first_name firstname FROM user;
```

``` mysql
SELECT books.book_name, publishers.publisher_name
FROM books LEFT JOIN publishers USING (publisher_id);
```

``` mysql
SELECT SUM( CASE WHEN status = 'success' THEN 1 ELSE 0 END ) AS success FROM statuses;
```

## How to see `AUTO_INCREMENT`

[Source - StackOverflow.Com](https://stackoverflow.com/q/15821532/4223982)

``` mysql
SHOW CREATE TABLE `tbl_users`;
```

## How to set `AUTO_INCREMENT`

``` mysql
ALTER TABLE `tbl_users` AUTO_INCREMENT = 123;
```

## `ASC` & `DESC`

- `ASC` — ascending — 1, 2, 3 — default
- `DESC` — descending — 3, 2, 1

## How to `DELETE`

``` mysql
# Delete all rows
DELETE FROM user;
```

``` mysql
SELECT * FROM user WHERE id > 20; # Good practise
DELETE FROM user WHERE id > 20;
```

## How to `UPDATE`

``` mysql
# Set "0" value for all rows
UPDATE user SET active = 0;
```

``` mysql
UPDATE user SET active = 0, email = NULL WHERE id = 3;
```

``` mysql
UPDATE user SET active = 0, email = NULL WHERE id = 3;
```

``` mysql
# One can use any other mathematical operators
UPDATE order SET price = price * 100;
```

# How to `ALTER TABLE`

``` mysql
ALTER TABLE <table> <action>, <action>, ...;

<actions>

  ADD COLUMN <field> <type> <attributes> <position> (FIRST, SECOND, THIRD, ... | AFTER <field_name>)

  ADD PRIMARY KEY (<field_1>, <field_2>, ...)

  ADD FOREIGN KEY (<internal_field>) REFERENCES <table> (<external_field>)

  DROP COLUMN <field>

  RENAME TO <new_table_name>

  CHANGE COLUMN <field_old_name> <field_new_name> <type> <attributes/constraints>

  MODIFY COLUMN <field> <type> <position>

</actions>
```

## String functions

``` mysql
UPPER / LOWER(field_name)
SUBSTRING_INDEX(field_name, 'delimiter', dilimiter_number)
RIGHT / LEFT(field_name, number_of_characters)
RTRIM / LTRIM(field_name)
```

``` mysql
SELECT UPPER(first_name) FROM user;
SELECT LOWER(first_name) FROM user;
```

```
UPDATE user
SET first_name = SUBSTRING_INDEX(name, ' ', 1)
AND last_name = SUBSTRING_INDEX(name, ' ', -1);
```

``` mysql
SELECT LEFT(first_name, 2) FROM user;
```

## How to use `WHEN` clause

```
UPDATE users
SET rank = CASE
WHEN reputation > 350 THEN 'Elite'
WHEN reputation > 100 THEN 'Popular'
WHEN reputation > 0 THEN 'User'
WHEN reputation = 0 THEN 'Beginner'
END; # ELSE 'Noob'
```

## How to use `HAVING` clause

``` mysql
SELECT first_name, COUNT(first_name) AS number_of_the_same_first_names
FROM my_users GROUP BY first_name HAVING number_of_the_same_first_names > 1;
```

## Views

``` mysql
CREATE VIEW maxincome AS query;
DROP VIEW maxincome;
```

## Server

### Configuration files

- `sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`

### How to set password for `root` user aftre fresh installation

``` sh
sudo mysql
```

``` mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'toor';
```

- https://stackoverflow.com/a/46908573/4223982

### How to change password

``` sh
mysql
mysql> use mysql;
mysql> SET PASSWORD FOR root@localhost = PASSWORD('toor');
```

## How to set timezone

``` sh
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
# default-time-zone='+00:00'
```

- https://stackoverflow.com/a/19069310/4223982

### SQL mode

``` mysql
SELECT @@GLOBAL.sql_mode global, @@SESSION.sql_mode session;
# ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

SET GLOBAL sql_mode = '';
```

## Errors

### ERROR 1698 (28000): Access denied for user 'root'@'localhost'

- https://stackoverflow.com/a/42742610/4223982
- `sudo dpkg-reconfigure mysql-server-5.7` https://stackoverflow.com/a/22469887/4223982
