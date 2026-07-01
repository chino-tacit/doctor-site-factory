import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    title: z.string(),
    credentials: z.array(z.string()).optional(),
    bio: z.string(),
    specialties: z.array(z.string()).optional(),
    education: z.object({
      medicalSchool: z.string().optional(),
      residency: z.string().optional(),
      fellowship: z.string().optional(),
    }).optional(),
    photo: z.string().optional(),
    acceptingNewPatients: z.boolean().default(true),
  }),
});

const specialtyConfig = defineCollection({
  type: 'data',
  schema: z.object({
    specialty: z.string(),
    displayName: z.string(),
    theme: z.object({
      primaryColor: z.string(),
      secondaryColor: z.string(),
      accentColor: z.string(),
      fontHeading: z.string().optional(),
      fontBody: z.string().optional(),
    }),
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
      backgroundImage: z.string().optional(),
    }),
    services: z.array(z.object({
      slug: z.string(),
      title: z.string(),
      shortDescription: z.string(),
    })),
    team: z.array(z.object({
      slug: z.string(),
      name: z.string(),
      title: z.string(),
      bio: z.string(),
      photo: z.string().optional(),
    })),
    clinic: z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string(),
      hours: z.array(z.object({
        day: z.string(),
        open: z.string().optional(),
        close: z.string().optional(),
        closed: z.boolean().optional(),
      })),
      mapsUrl: z.string().optional(),
      calendlyUrl: z.string().optional(),
      insurance: z.array(z.string()).optional(),
      social: z.object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
      }).optional(),
    }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()).optional(),
    }),
  }),
});

export const collections = {
  services,
  team,
  specialtyConfig,
};