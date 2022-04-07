-- USE (dataBase_name) <- change whatever is in parenthesis to database we will use

DROP TABLE IF EXISTS userProfile;
DROP TABLE IF EXISTS Inventory;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS lootVendorTable
DROP TABLE IF EXISTS mileStones
DROP TABLE IF EXISTS questOutComes
DROP TABLE IF EXISTS Mobs
DROP TABLE IF EXISTS mobLootTable
DROP TABLE IF EXISTS mobSkills
DROP TABLE IF EXISTS skills

CREATE TABLE userProfile(
    discordID VARCHAR(18) PRIMARY KEY,
    serverName VARCHAR(100) NOT NUll,
    threadID VARCHAR(36) DEFAULT NULL
);

CREATE TABLE Inventory(
    FOREIGN KEY discordID REFERENCES userProfile(discordID),
    FOREIGN KEY itemName REFERENCES items(name)
    itemID VARCHAR(9) PRIMARY KEY NOT NULL,
    amount INT DEFAULT 0
);

CREATE TABLE items(
    itemName varChar(64) PRIMARY KEY,
    category varChar(64) NOT NULL,
    tier INT DEFAULT 1
);

CREATE TABLE vendors(
    vendorName varChar(64) PRIMARY KEY,
    vendorType varChar(64) NOT NULL,
);

CREATE TABLE lootVendorTable(
    FOREIGN KEY vendorName REFERENCES vendors(vendorName).
    FOREIGN KEY itemName REFERENCES items(itemName)
    itemStock int DEFAULT 0,
    itemPrice int NOT NULL
);

CREATE TABLE mileStones(
    FOREIGN KEY userID REFERENCES userProfile(discordID),
    gameStage INT DEFAULT 1,
    questID VARCHAR(64) NOT NULL 
);

CREATE TABLE questOutComes(
    FOREIGN KEY questID REFERENCES mileStones(questID)
    questChoice VARCHAR(64) NOT NULL,
    questReward VARCHAR(64) NOT NULL
);

CREATE TABLE Mobs(
    mobName VARCHAR(64) PRIMARY KEY,
    mobLevel int DEFAULT 1,
    mobEXP int DEFAULT 0,
);

CREATE TABLE mobLootTable(
    FOREIGN KEY mobName REFERENCES Mobs(mobName)
    items VARCHAR(64) PRIMARY KEY,
    dropChance INT DEFAULT 0
);

CREATE TABLE mobSkills(
    FOREIGN KEY mobName REFERENCES Mobs(mobName)
    skill VARCHAR(64) PRIMARY KEY,
    modifier INT DEFAULT 100
);

CREATE TABLE skills(
    moveName VARCHAR(64) PRIMARY KEY,
    damage INT DEFAULT 1,
    hitChance INT DEFAULT 100,
    moveType VARCHAR(64) DEFAULT 'Basic'
);