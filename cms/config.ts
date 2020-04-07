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
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          widget: 'ncw-id',
          label: 'ID',
          name: 'id'
        },
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
          widget: 'file',
          required: false,
          media_library: {
            config: {
              multiple: true,
              output_filename_only: true
            }
          }
        },
        {
          label: 'Criteria',
          name: 'criteria',
          widget: 'relation',
          required: false,
          collection: 'criteria',
          displayFields: [
            'name'
          ],
          multiple: true,
          searchFields: [
            'name'
          ],
          valueField: 'id'
        },
        {
          label: 'City',
          name: 'city',
          required: false,
          widget: 'string'
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
          widget: 'relation',
          collection: 'countries',
          displayFields: [
            'name'
          ],
          multiple: false,
          searchFields: [
            'name'
          ],
          valueField: 'id'
        },
        {
          label: 'Product types',
          name: 'product-types',
          required: false,
          widget: 'relation',
          collection: 'product-types',
          displayFields: [
            'name'
          ],
          multiple: true,
          searchFields: [
            'name'
          ],
          valueField: 'id'
        },
        {
          label: 'Genders',
          name: 'genders',
          required: false,
          widget: 'relation',
          collection: 'genders',
          displayFields: [
            'name'
          ],
          multiple: true,
          searchFields: [
            'name'
          ],
          valueField: 'id'
        }
      ]
    },
    {
      label: 'Criteria',
      label_singular: 'Criterion',
      name: 'criteria',
      folder: 'cms/contents/criteria',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          widget: 'ncw-id',
          label: 'ID',
          name: 'id'
        },
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
      label_singular: 'Criterion',
      folder: 'cms/contents/countries',
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          widget: 'ncw-id',
          label: 'ID',
          name: 'id'
        },
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
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          widget: 'ncw-id',
          label: 'ID',
          name: 'id'
        },
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
      extension: 'json',
      format: 'json',
      create: true,
      fields: [
        {
          widget: 'ncw-id',
          label: 'ID',
          name: 'id'
        },
        {
          label: 'Name',
          name: 'name',
          widget: 'string'
        }
      ]
    }
  ]
}