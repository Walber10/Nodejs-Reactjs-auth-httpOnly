import dotenv from "dotenv";

dotenv.config();

interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
      email: "walberamorimsp@gmail.com",
      name: "Walber Amorim",
    },
  },
} as IMailConfig;
