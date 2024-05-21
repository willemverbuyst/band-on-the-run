/**
 * ! Executing this script will delete all data in your database and seed it with 10 musician.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.genre([
    { name: "Rock" },
    { name: "Pop" },
    { name: "Jazz" },
    { name: "Classical" },
    { name: "Hip-Hop" },
    { name: "Electronic" },
    { name: "Country" },
    { name: "Reggae" },
    { name: "Blues" },
    { name: "Folk" },
  ]);
  await seed.musician((createMany) => createMany(10));
  await seed.band((createMany) => createMany(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

await main();
