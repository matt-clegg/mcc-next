import { promises as fs } from "node:fs";
import path from "node:path";
import { Liquid } from "liquidjs";
import { eq } from "drizzle-orm";
// @ts-expect-error Ignore missing mjml types
import mjml2html from "mjml";

export async function renderMailTemplate(templateName: string, data: Record<string, string>) {
  const template = await useDrizzle()
    .select()
    .from(tables.emailTemplates)
    .where(eq(tables.emailTemplates.name, templateName))
    .get();

  if (!template) {
    throw new Error(`Email template not found: ${templateName}`);
  }

  const liquid = new Liquid();

  const content = await liquid.parseAndRender(template.content, data);

  const layoutPath = path.join(process.cwd(), "server", "templates", "default.mjml");
  const layout = (await fs.readFile(layoutPath)).toString();

  const { html, errors } = mjml2html(layout, {
    title: "Email Title Goes here!",
    content
  });

  if (errors.length > 0) {
    console.log(`Unable to combine email template: ${templateName}`, errors);
    throw new Error("Unable to combine email template");
  }

  console.log("Email template rendered:", html);

  return html;
}
