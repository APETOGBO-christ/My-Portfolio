import {defineType, defineField, defineArrayMember} from 'sanity'

export const works = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (courte, sur la carte)',
      type: 'text',
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link (démo en ligne, si applicable)',
      type: 'url',
    }),
    defineField({
      name: 'codeLink',
      title: 'Code Link (GitHub)',
      type: 'url',
    }),
    defineField({
      name: 'imgUrl',
      title: 'Image principale (carte)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie (captures, schémas d’architecture, dashboards)',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({
      name: 'documents',
      title: 'Documents téléchargeables (PDF, rapports, runbooks…)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectDocument',
          title: 'Document',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre du document',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description (optionnelle)',
              type: 'string',
            }),
            defineField({
              name: 'file',
              title: 'Fichier',
              type: 'file',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
