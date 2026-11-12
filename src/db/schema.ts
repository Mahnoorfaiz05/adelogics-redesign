import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Project enquiries submitted through the contact form (backup record alongside
// the existing FormSubmit email delivery).
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service").notNull(),
  budget: text("budget"),
  details: text("details").notNull(),
  contactMethod: text("contact_method").notNull().default("email"),
  phone: text("phone"),
  emailDelivered: boolean("email_delivered").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
