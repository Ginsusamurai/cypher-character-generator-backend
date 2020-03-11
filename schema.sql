DROP TABLE IF EXISTS skillInfo;

CREATE TABLE skillInfo (
  skill_name VARCHAR (255),
  warrior_tier NUMERIC (1),
  adept_tier NUMERIC (1),
  explorer_tier NUMERIC (1),
  speaker_tier NUMERIC (1),
  general_tier NUMERIC (1),
  skill_type VARCHAR (255),
  point_cost NUMERIC (2),
  pool_type VARCHAR (255),
  description TEXT
);