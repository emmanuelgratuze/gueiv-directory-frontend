/* eslint-disable @typescript-eslint/camelcase */
export default {
  backend: process.env.NODE_ENV === 'production'
    ? {
      name: 'git-gateway'
    } : {
      name: 'github',
      repo: process.env.NETLIFY_CMS_BACKEND_REPO
    },
  site_url: 'https://directorio.gueiv.com',
  media_folder: 'assets/uploads',
  public_folder: 'assets',
  media_library: {
    name: 'cloudinary',
    output_filename_only: false,
    config: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY
    }
  },
  collections: [
    {
      label: 'Configuration',
      name: 'configuration',
      extension: 'json',
      format: 'json',
      files: [
        {
          label: 'General',
          name: 'general',
          extension: 'json',
          format: 'json',
          file: 'cms/contents/configuration/general.json',
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string'
            },
            {
              label: 'Description (for SEO)',
              name: 'description',
              widget: 'text'
            },
            {
              label: 'Menu description',
              name: 'menuDescription',
              widget: 'markdown'
            }
          ]
        },
        {
          label: 'Contact infos',
          name: 'contact',
          extension: 'json',
          format: 'json',
          file: 'cms/contents/configuration/social.json',
          fields: [
            {
              label: 'Facebook page',
              name: 'facebook',
              widget: 'string'
            },
            {
              label: 'Instagram page',
              name: 'instagram',
              widget: 'string'
            },
            {
              label: 'Email',
              name: 'email',
              widget: 'string',
              required: false
            }
          ]
        },
        {
          label: 'Criteria page',
          name: 'criteriaPage',
          extension: 'json',
          format: 'json',
          file: 'cms/contents/configuration/criteria-page.json',
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Introduction',
              name: 'introduction',
              widget: 'text'
            }
          ]
        }
      ]
    },
    {
      label: 'Brands',
      name: 'brands',
      folder: 'cms/contents/brands',
      identifier_field: 'name',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'markdown'
        },
        {
          label: 'Pictures',
          name: 'pictures',
          widget: 'list',
          field: {
            label: 'Image',
            name: 'image',
            widget: 'file',
            media_library: {
              config: {
                multiple: false
              }
            }
          }
        },
        {
          label: 'Criteria',
          name: 'criteria',
          widget: 'slug-relation',
          required: false,
          collection: 'criteria',
          displayFields: ['name'],
          multiple: true,
          searchFields: ['name'],
          valueField: '{{slug}}'
        },
        {
          label: 'City',
          name: 'city',
          required: false
        },
        {
          label: 'Website',
          name: 'website',
          required: false,
          widget: 'string'
        },
        {
          label: 'Facebook',
          name: 'facebook',
          required: false,
          widget: 'string'
        },
        {
          label: 'Instagram',
          name: 'instagram',
          required: false,
          widget: 'string'
        },
        {
          label: 'Country',
          name: 'country',
          widget: 'slug-relation',
          collection: 'countries',
          displayFields: ['name'],
          multiple: false,
          searchFields: ['name'],
          valueField: 'name'
        },
        {
          label: 'Product types',
          name: 'productTypes',
          required: false,
          widget: 'slug-relation',
          collection: 'productTypes',
          displayFields: ['name'],
          multiple: true,
          searchFields: ['name'],
          valueField: 'name'
        },
        {
          label: 'Genders',
          name: 'genders',
          required: false,
          widget: 'slug-relation',
          collection: 'genders',
          displayFields: ['name'],
          multiple: true,
          searchFields: ['name'],
          valueField: 'name'
        }
      ]
    },
    {
      label: 'Criteria',
      label_singular: 'Criterion',
      name: 'criteria',
      folder: 'cms/contents/criteria',
      identifier_field: 'name',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'markdown'
        },
        {
          label: 'Color',
          name: 'color',
          widget: 'string',
          required: false
        },
        {
          label: 'Icon',
          hint: 'IMPORTANT: only upload .svg files here',
          name: 'icon',
          required: false,
          widget: 'file',
          media_library: {
            config: {
              multiple: false
            }
          }
        }
      ]
    },
    {
      label: 'Countries',
      name: 'countries',
      label_singular: 'Country',
      folder: 'cms/contents/countries',
      identifier_field: 'name',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Product types',
      label_singular: 'Product type',
      name: 'productTypes',
      folder: 'cms/contents/product-types',
      identifier_field: 'name',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Genders',
      label_singular: 'Gender',
      name: 'genders',
      folder: 'cms/contents/genders',
      identifier_field: 'name',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        }
      ]
    }
  ]
}
