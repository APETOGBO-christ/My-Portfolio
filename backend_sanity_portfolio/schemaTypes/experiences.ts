import {defineType, defineField} from 'sanity'

export const experiences = defineType({
  name: 'experiences',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              name: 'desc',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    }),
  ],
})
