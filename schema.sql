DROP TABLE IF EXISTS abilityinfo;
DROP TABLE IF EXISTS typeinfo;
DROP TABLE IF EXISTS focusskills;
DROP TABLE IF EXISTS descriptorskills;
DROP TABLE IF EXISTS descriptorlist;
DROP TABLE IF EXISTS focusskillsdetails;


CREATE TABLE abilityinfo (
  ability_name VARCHAR (255),
  warrior_tier NUMERIC (1),
  adept_tier NUMERIC (1),
  explorer_tier NUMERIC (1),
  speaker_tier NUMERIC (1),
  general_tier VARCHAR (255),
  ability_type VARCHAR (255),
  point_cost NUMERIC (2),
  pool_type VARCHAR (255),
  description TEXT
);

CREATE TABLE typeinfo (
  type_name VARCHAR (255),
  might NUMERIC(2),
  speed NUMERIC(2),
  intellect NUMERIC(2),
  extra NUMERIC(2),
  effort NUMERIC (1),
  cypher NUMERIC (1),
  edge VARCHAR (6),
  edge_limit NUMERIC(1),
  abilities NUMERIC(1),
  starting_items TEXT, 
  weapons VARCHAR (6)
);

CREATE TABLE focusskills (
  focus_name VARCHAR(255),
  tier NUMERIC (1),
  choice BOOLEAN,
  focus_skill_name VARCHAR (255)
);

CREATE TABLE descriptorskills (
  descriptor_name VARCHAR (255),
  descriptor_skill_name VARCHAR (255),
  descriptor_skill_type VARCHAR (255),
  descriptor_skill_value TEXT
);

CREATE TABLE descriptorlist (
  descriptor_name VARCHAR (255),
  descriptor_description TEXT,
  UNIQUE(descriptor_description)
);

CREATE TABLE focusskillsdetails (
  skill_name VARCHAR(255),
  pool VARCHAR(20),
  cost VARCHAR(5),
  action_type VARCHAR(15),
  feature VARCHAR(15),
  mechanics TEXT,
  description TEXT
)

