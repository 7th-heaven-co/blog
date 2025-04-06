import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const heaven = defineCollection({
	// Load Markdown and MDX files in the `src/content/heaven/` directory.
	loader: glob({ base: './src/content/heaven', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// ['heaven','...','...']
		tags: z.array(z.string()), 
	}),
});

const announcements = defineCollection({
	// Load Markdown and MDX files in the `src/content/announcements/` directory.
	loader: glob({ base: './src/content/announcements', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// ['announcements','...','...']
		tags: z.array(z.string()), 
	}),
});

const community = defineCollection({
	// Load Markdown and MDX files in the `src/content/community/` directory.
	loader: glob({ base: './src/content/community', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// ['community_notes','...','...']
		tags: z.array(z.string()), 
	}),
});

const author = defineCollection({
	// Load Markdown and MDX files in the `src/content/author/` directory.
	loader: glob({ base: './src/content/author', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// ['community_notes','...','...']
		tags: z.array(z.string()), 
	}),
});

const events = defineCollection({
	// Load Markdown and MDX files in the `src/content/events/` directory.
	loader: glob({ base: './src/content/events', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// ['events','...','...']
		tags: z.array(z.string()), 
	}),
});

const releases = defineCollection({
	// Load Markdown and MDX files in the `src/content/releases/` directory.
	loader: glob({ base: './src/content/releases', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		id: z.number(),
		category: z.string(),
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.array(z.string()).optional(),
		// ['7th_heaven_chapter-1','7th_heaven_chapter_2','New_Novel_chapter_2','...']
		releases: z.array(z.string()),
		// ['releases','7th_heaven','new_novel','...']
		tags: z.array(z.string()), 
	}),
});

export const collections = { heaven, announcements, community, author, events, releases };
