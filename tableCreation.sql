USE [rpgBotDB]


--Table Creation is executed once to create tables however the following code can be
--used as a template to drop tables in order to update them.
--IF OBJECT_ID('dbo.userProfile', 'U') IS NOT NULL
--	DROP TABLE dbo.userProfile
--	GO
--IF OBJECT_ID('dbo.items', 'U') IS NOT NULL
--	DROP TABLE dbo.items
--	GO
--IF OBJECT_ID('dbo.Inventory', 'U') IS NOT NULL
--	DROP TABLE dbo.Inventory
--	GO




CREATE TABLE dbo.userProfile(
    discordID NVARCHAR(18) NOT NULL PRIMARY KEY,
    serverName NVARCHAR(100) NOT NUll,
    threadID NVARCHAR(36) DEFAULT NULL
);
GO

CREATE TABLE dbo.items(
    itemName nvarChar(64) PRIMARY KEY,
    category nvarChar(64) NOT NULL,
    tier INT DEFAULT 1
);
GO

CREATE TABLE dbo.Inventory(
    itemID VARCHAR(9) PRIMARY KEY NOT NULL,
	amount INT DEFAULT 0,
	discordID NVARCHAR(18) FOREIGN KEY REFERENCES dbo.userProfile(discordID) 
	ON DELETE CASCADE,
    itemName nvarChar(64) FOREIGN KEY REFERENCES dbo.items(itemName)
	ON DELETE CASCADE  
);
GO

CREATE TABLE dbo.vendors(
    vendorName nvarChar(64) PRIMARY KEY,
    vendorType nvarChar(64) NOT NULL,
);
GO

CREATE TABLE dbo.lootVendorTable(
    vendorName nvarChar(64) FOREIGN KEY REFERENCES dbo.vendors(vendorName),
    itemName nvarChar(64) FOREIGN KEY REFERENCES dbo.items(itemName),
    itemStock int DEFAULT 0,
    itemPrice int NOT NULL
);
GO

CREATE TABLE dbo.mileStones(
    questID int NOT NULL PRIMARY KEY,
	userID NVARCHAR(18) FOREIGN KEY REFERENCES dbo.userProfile(discordID),
    gameStage INT DEFAULT 1
);
GO

CREATE TABLE dbo.questOutComes(
    questChoice NVARCHAR(64) NOT NULL,
    questReward NVARCHAR(64) NOT NULL,
	questID int PRIMARY KEY FOREIGN KEY REFERENCES dbo.mileStones(questID)
);
GO

CREATE TABLE dbo.Mobs(
    mobName NVARCHAR(64) PRIMARY KEY,
    mobLevel int DEFAULT 1,
    mobEXP int DEFAULT 0
);
GO

CREATE TABLE dbo.mobLootTable(
    mobName NVARCHAR(64) FOREIGN KEY REFERENCES dbo.Mobs(mobName),
    items NVARCHAR(64) PRIMARY KEY,
    dropChance INT DEFAULT 0
);
GO

CREATE TABLE dbo.mobSkills(
    mobName NVARCHAR(64) FOREIGN KEY REFERENCES dbo.Mobs(mobName),
    skill NVARCHAR(64) FOREIGN KEY REFERENCES dbo.skills(moveName),
    modifier INT DEFAULT 100
);
GO

CREATE TABLE dbo.skills(
    moveName NVARCHAR(64) PRIMARY KEY,
    damage INT DEFAULT 1,
    hitChance INT DEFAULT 100,
    moveType NVARCHAR(64) DEFAULT 'Basic'
);
GO
