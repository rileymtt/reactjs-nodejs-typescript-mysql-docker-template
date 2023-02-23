USE realbewhy_db;

CREATE TABLE IF NOT EXISTS users
  (
    id                  INT NOT NULL AUTO_INCREMENT,
    username            VARCHAR(255),
    email               VARCHAR(255),
    age                 INT,
    created_at          TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at          TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
  );
