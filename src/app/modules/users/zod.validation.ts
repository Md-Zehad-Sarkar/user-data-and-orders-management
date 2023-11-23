import z from 'zod';
//fullName schema
const fullNameZodSchema = z.object({
  firstName: z
    .string()
    .transform((first) => first.charAt(0).toUpperCase() + first.slice(1))
    .refine((max) => max.length <= 15, {
      message: 'first name will be maximum 15 character',
    }),
  lastName: z
    .string()
    .transform((last) => last.charAt(0).toUpperCase() + last.slice(1))
    .refine((max) => max.length <= 20, {
      message: 'last name will be maximum 20 character',
    }),
});

//address schema
const userAddressZodSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

//users schema
export const usersZodSchema = z.object({
  userId: z.number().max(64),
  username: z
    .string()
    .max(32, 'username maximum 32 character')
    .min(3, 'user name must be min 3 character'),
  password: z
    .string()
    .min(6, 'password minimum 6 character')
    .max(20, 'password will be max 20 characters'),
  fullName: fullNameZodSchema
    .required()
    .refine((name) => name.firstName || name.lastName, {
      message:
        'user name is required. first name & last name first character must be capitalized',
    }),
  age: z.number().min(13, 'You need minimum 13 years old'),
  email: z.string().email().trim(),
  isActive: z.boolean().default(true),
  hobbies: z.string().array(),
  address: userAddressZodSchema
    .required()
    .refine(
      (addresses) => addresses.street || addresses.city || addresses.country,
      {
        message: 'address is required',
      },
    ),
});

