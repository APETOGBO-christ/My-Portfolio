import {defineType, defineField} from 'sanity'

export const certifications = defineType({
  name: 'certifications',
  title: 'Certifications',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date Obtained',
      type: 'date',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Certification Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
