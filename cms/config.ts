/* eslint-disable @typescript-eslint/camelcase */
export default {
  backend: {
    name: 'github',
    repo: 'emmanuelgratuze/gueiv-directory-frontend',
    branch: 'contents'
  },
  site_url: 'https://directorio.gueiv.com',
  media_folder: 'assets/uploads',
  public_folder: 'assets',
  media_library: {
    name: 'cloudinary',
    config: {
      output_filename_only: true,
      cloud_name: 'dq9k7gnud',
      api_key: 543373913743399
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
              label: 'Description',
              name: 'description',
              widget: 'text'
            },
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
              label: 'Email contact',
              name: 'email',
              widget: 'string',
              required: false
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
                multiple: false,
                output_filename_only: true
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
          displayFields: [
            'name'
          ],
          multiple: true,
          searchFields: [
            'name'
          ],
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
          displayFields: [
            'name'
          ],
          multiple: false,
          searchFields: [
            'name'
          ],
          valueField: 'name'
        },
        {
          label: 'Product types',
          name: 'product-types',
          required: false,
          widget: 'slug-relation',
          collection: 'product-types',
          displayFields: [
            'name'
          ],
          multiple: true,
          searchFields: [
            'name'
          ],
          valueField: 'name'
        },
        {
          label: 'Genders',
          name: 'genders',
          required: false,
          widget: 'select',
          multiple: true,
          options: ['Men', 'Women', 'Children', 'Unisex'],
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
          label: 'Icon',
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
      name: 'product-types',
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
    }
  ]
}
