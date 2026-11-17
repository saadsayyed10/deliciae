import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET_AUTHOR: process.env.JWT_SECRET_AUTHOR! || "sameoldtreva",
  JWT_SECRET_VIEWER: process.env.JWT_SECRET_VIEWER! || "rozierdemorte",
};
