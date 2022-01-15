/*
 Navicat Premium Data Transfer

 Source Server         : contacts
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 15/01/2022 19:26:45
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for contact_groups
-- ----------------------------
DROP TABLE IF EXISTS "contact_groups";
CREATE TABLE "contact_groups" (
	"id"	INTEGER,
	"group_id"	INTEGER NOT NULL,
	"contact_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

-- ----------------------------
-- Records of contact_groups
-- ----------------------------
BEGIN;
INSERT INTO "contact_groups" VALUES (4, 3, 49);
INSERT INTO "contact_groups" VALUES (5, 4, 49);
INSERT INTO "contact_groups" VALUES (6, 5, 49);
INSERT INTO "contact_groups" VALUES (7, 3, 52);
INSERT INTO "contact_groups" VALUES (8, 4, 52);
INSERT INTO "contact_groups" VALUES (9, 5, 52);
INSERT INTO "contact_groups" VALUES (10, 3, 51);
INSERT INTO "contact_groups" VALUES (11, 4, 51);
INSERT INTO "contact_groups" VALUES (12, 5, 51);
INSERT INTO "contact_groups" VALUES (13, 5, 50);
COMMIT;

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS "contacts";
CREATE TABLE "contacts" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "phone_number" TEXT NOT NULL,
  UNIQUE ("phone" ASC)
);

-- ----------------------------
-- Records of contacts
-- ----------------------------
BEGIN;
INSERT INTO "contacts" VALUES (48, 'Nguyễn Anh Tuấn', '096.53.49.777', '0965349777');
INSERT INTO "contacts" VALUES (49, 'Hoàng Văn Thanh', '098.890.1652', '0988901652');
INSERT INTO "contacts" VALUES (50, 'Đào Xuân Tùng', '0962.023.623', '0962023623');
INSERT INTO "contacts" VALUES (51, 'Lê Thị Thuý', '0962.023.621', '0962023621');
INSERT INTO "contacts" VALUES (52, 'Hoàng Văn Hưng', '0962.023.620', '0962023620');
COMMIT;

-- ----------------------------
-- Table structure for contacts_fts
-- ----------------------------
DROP TABLE IF EXISTS "contacts_fts";
CREATE VIRTUAL TABLE contacts_fts USING fts5(
    name,
    content='contacts',
    content_rowid='id',
		tokenize = "unicode61 remove_diacritics 2"
);

-- ----------------------------
-- Records of contacts_fts
-- ----------------------------
BEGIN;
INSERT INTO "contacts_fts" VALUES ('Nguyễn Anh Tuấn');
INSERT INTO "contacts_fts" VALUES ('Hoàng Văn Thanh');
INSERT INTO "contacts_fts" VALUES ('Đào Xuân Tùng');
INSERT INTO "contacts_fts" VALUES ('Lê Thị Thuý');
INSERT INTO "contacts_fts" VALUES ('Hoàng Văn Hưng');
COMMIT;

-- ----------------------------
-- Table structure for contacts_fts_config
-- ----------------------------
DROP TABLE IF EXISTS "contacts_fts_config";
CREATE TABLE 'contacts_fts_config'(k PRIMARY KEY, v) WITHOUT ROWID;

-- ----------------------------
-- Records of contacts_fts_config
-- ----------------------------
BEGIN;
INSERT INTO "contacts_fts_config" VALUES ('version', 4);
COMMIT;

-- ----------------------------
-- Table structure for contacts_fts_data
-- ----------------------------
DROP TABLE IF EXISTS "contacts_fts_data";
CREATE TABLE 'contacts_fts_data'(id INTEGER PRIMARY KEY, block BLOB);

-- ----------------------------
-- Records of contacts_fts_data
-- ----------------------------
BEGIN;
INSERT INTO "contacts_fts_data" VALUES (1, '050F');
INSERT INTO "contacts_fts_data" VALUES (10, '000000000101010001010101');
INSERT INTO "contacts_fts_data" VALUES (137438953473, '000000760430616E683002030105686F616E673102020302020203756E6734020401026C6533020201066E677579656E30020201057468616E6831020403016933020303027579330204020375616E30020403026E67320204010376616E31020303020301047875616E3202030104C491616F32020204080D08070B0A060708070B09');
COMMIT;

-- ----------------------------
-- Table structure for contacts_fts_docsize
-- ----------------------------
DROP TABLE IF EXISTS "contacts_fts_docsize";
CREATE TABLE 'contacts_fts_docsize'(id INTEGER PRIMARY KEY, sz BLOB);

-- ----------------------------
-- Records of contacts_fts_docsize
-- ----------------------------
BEGIN;
INSERT INTO "contacts_fts_docsize" VALUES (48, '03');
INSERT INTO "contacts_fts_docsize" VALUES (49, '03');
INSERT INTO "contacts_fts_docsize" VALUES (50, '03');
INSERT INTO "contacts_fts_docsize" VALUES (51, '03');
INSERT INTO "contacts_fts_docsize" VALUES (52, '03');
COMMIT;

-- ----------------------------
-- Table structure for contacts_fts_idx
-- ----------------------------
DROP TABLE IF EXISTS "contacts_fts_idx";
CREATE TABLE 'contacts_fts_idx'(segid, term, pgno, PRIMARY KEY(segid, term)) WITHOUT ROWID;

-- ----------------------------
-- Records of contacts_fts_idx
-- ----------------------------
BEGIN;
INSERT INTO "contacts_fts_idx" VALUES (1, NULL, 2);
COMMIT;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS "groups";
CREATE TABLE "groups" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "photo" TEXT
);

-- ----------------------------
-- Records of groups
-- ----------------------------
BEGIN;
INSERT INTO "groups" VALUES (3, 'Nhóm 1', NULL);
INSERT INTO "groups" VALUES (4, 'Nhóm 2', NULL);
INSERT INTO "groups" VALUES (5, 'Nhóm 3', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
BEGIN;
INSERT INTO "sqlite_sequence" VALUES ('contact_groups', 13);
INSERT INTO "sqlite_sequence" VALUES ('contacts', 52);
INSERT INTO "sqlite_sequence" VALUES ('groups', 5);
COMMIT;

-- ----------------------------
-- Auto increment value for contact_groups
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 13 WHERE name = 'contact_groups';

-- ----------------------------
-- Auto increment value for contacts
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 52 WHERE name = 'contacts';

-- ----------------------------
-- Triggers structure for table contacts
-- ----------------------------
CREATE TRIGGER "main"."contacts_ad"
AFTER DELETE
ON "contacts"
BEGIN
        INSERT INTO contacts_fts (contacts_fts, rowid, name)
        VALUES ('delete', old.id, old.name);
    END;
CREATE TRIGGER "main"."contacts_ai"
AFTER INSERT
ON "contacts"
BEGIN
        INSERT INTO contacts_fts (rowid, name)
        VALUES (new.id, new.name);
    END;
CREATE TRIGGER "main"."contacts_au"
AFTER UPDATE
ON "contacts"
BEGIN
        INSERT INTO contacts_fts (contacts_fts, rowid, name)
        VALUES ('delete', old.id, old.name);
        INSERT INTO contacts_fts (rowid, name)
        VALUES (new.id, new.name);
    END;

-- ----------------------------
-- Auto increment value for groups
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 5 WHERE name = 'groups';

PRAGMA foreign_keys = true;
