import { z } from "zod";
import { eq } from "drizzle-orm";
import { tables } from "~~/server/utils/drizzle";

export default eventHandler(async (event) => {
  console.log("here");
  const body = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string()
  }).parse);
  console.log("got a body", body);

  const { email, password } = body;

  const db = useDrizzle();

  const existing = await db
    .select({ id: tables.users.id })
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get();

  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists"
    });
  }

  const hashedPassword = await hashPassword(password);
  console.log("hashed password", hashedPassword);

  const isAdminEmail = body.email === env.ADMIN_EMAIL;

  const { id } = await createUser({
    email,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date().toLocaleDateString(),
    isAdmin: isAdminEmail
  });

  await useDrizzle()
    .insert(tables.credentials)
    .values({
      user: id,
      passwordHash: hashedPassword
    });

  const user = await getUser(id);
  // const [user] = await db.insert(tables.users)
  //   .values({
  //     email,
  //     passwordHash: hashedPassword,
  //     firstName: "John",
  //     lastName: "Doe",
  //     dateOfBirth: new Date().toLocaleDateString()
  //   })
  //   .returning({
  //     id: tables.users.id,
  //     email: tables.users.email,
  //     firstName: tables.users.firstName,
  //     lastName: tables.users.lastName,
  //     dateOfBirth: tables.users.dateOfBirth,
  //     lastLogin: tables.users.lastLogin,
  //     isAdmin: tables.users.isAdmin,
  //     isJunior: tables.users.isJunior,
  //     parent: tables.users.parent,
  //     createdAt: tables.users.createdAt,
  //     updatedAt: tables.users.updatedAt
  //   });

  await setUserSession(event, { user: user! });

  return user;
});
