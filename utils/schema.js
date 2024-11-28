import { pgTable, serial, varchar,  text, } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockRes: text('jsonMockRes').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExprience: varchar('jobExprience').notNull(),
    createdBY: varchar('createdBY').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),
});



export const UserAnswer = pgTable('usersAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAnswer: text('correctAnswer').notNull(),
    userAnswer: text('userAnswer').notNull(), // Changed to 'userAnswer'
    feedback: text('feedback').notNull(),
    rating: varchar('rating').notNull(), // Corrected the typo from 'reating' to 'rating'
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt'),
});