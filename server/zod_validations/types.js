const z = require("zod");

const userSignUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .superRefine((val, checkPassComplexity) => {
      const containsUppercase = (ch) => /[A-Z]/.test(ch);
      const containsLowercase = (ch) => /[a-z]/.test(ch);
      const containsSpecialChar = (ch) =>
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
      let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0,
        countOfSpecialChar = 0;
      for (let i = 0; i < val.length; i++) {
        let ch = val.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        else if (containsSpecialChar(ch)) countOfSpecialChar++;
      }
      if (
        countOfLowerCase < 1 ||
        countOfUpperCase < 1 ||
        countOfSpecialChar < 1 ||
        countOfNumbers < 1
      ) {
        checkPassComplexity.addIssue({
          code: "custom",
          message: "Password does not meet the complexity requirements",
        });
      }
    }),
});

module.exports = {
  userSignUpSchema: userSignUpSchema,
};
