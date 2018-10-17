USE hyfblog;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts_categories;
DROP TABLE IF EXISTS posts_likes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS private_messges;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

USE hyfblog;
# ---------------------------------------------------
CREATE TABLE categories (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  parent int(10) UNSIGNED NOT NULL,
  description varchar(255) DEFAULT NULL,
  icon varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE categories
ADD INDEX idx_categories_name (name (191));

ALTER TABLE categories
ADD CONSTRAINT fk_category_parent FOREIGN KEY (parent)
REFERENCES categories (id);
# ---------------------------------------------------
CREATE TABLE users (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  birthdate date NOT NULL,
  photo varchar(255) NOT NULL,
  `group` enum ('admin', 'editor', 'memeber') NOT NULL DEFAULT 'memeber',
  address varchar(255) DEFAULT NULL,
  join_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login datetime NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE users
ADD INDEX index_email (email (191));

ALTER TABLE users
ADD INDEX index_user_name (name);
# ---------------------------------------------------
CREATE TABLE private_messges (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from` int(10) UNSIGNED DEFAULT NULL,
  `to` int(10) UNSIGNED DEFAULT NULL,
  body text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE private_messges
ADD CONSTRAINT fk_private_message_from FOREIGN KEY (`from`)
REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE private_messges
ADD CONSTRAINT fk_private_message_to FOREIGN KEY (`to`)
REFERENCES users (id) ON DELETE CASCADE;
# ---------------------------------------------------
CREATE TABLE posts (
  post_author int(10) UNSIGNED NOT NULL,
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) DEFAULT NULL,
  keywords varchar(255) DEFAULT NULL,
  body text NOT NULL,
  view_count int(10) UNSIGNED NOT NULL DEFAULT 1,
  is_published tinyint(1) NOT NULL DEFAULT 0,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE posts
ADD CONSTRAINT fk_post_author FOREIGN KEY (post_author)
REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;
# ---------------------------------------------------
CREATE TABLE posts_likes (
  user_id int(10) UNSIGNED NOT NULL,
  post_id int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, post_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE posts_likes
ADD CONSTRAINT fk_posts_likes_post FOREIGN KEY (post_id)
REFERENCES posts (id) ON DELETE CASCADE;

ALTER TABLE posts_likes
ADD CONSTRAINT fk_posts_likes_user FOREIGN KEY (user_id)
REFERENCES users (id) ON DELETE CASCADE;
# ---------------------------------------------------
CREATE TABLE posts_categories (
  post_id int(10) UNSIGNED NOT NULL,
  categori_id int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (post_id, categori_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE posts_categories
ADD CONSTRAINT fk_posts_categories_category FOREIGN KEY (categori_id)
REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE posts_categories
ADD CONSTRAINT fk_posts_categories_post FOREIGN KEY (post_id)
REFERENCES posts (id) ON DELETE CASCADE;
# ---------------------------------------------------
CREATE TABLE comments (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id int(10) UNSIGNED NOT NULL,
  Post_id int(10) UNSIGNED NOT NULL,
  body text NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_post FOREIGN KEY (Post_id)
REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_user FOREIGN KEY (user_id)
REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;