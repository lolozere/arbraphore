/* global CMS */
const origin = window.location.origin;

CMS.init({
  config: {
    backend: {
      name: "github",
      repo: "lolozere/arbraphore",
      branch: "main",
      base_url: "https://arabraphore-decap-auth.laurent-a35.workers.dev"
    },
    publish_mode: "editorial_workflow",
    media_folder: "public/uploads",
    public_folder: "/uploads",
    site_url: origin,
    display_url: origin,
    collections: [
        {
            "name": "pages",
            "label": "Pages",
            "files": [
                {
                    "file": "src/content/pages/home.mdx",
                    "label": "Accueil",
                    "name": "home",
                    "fields": [
                        {
                            "label": "Titre",
                            "name": "title",
                            "widget": "string"
                        },
                        {
                            "label": "Description",
                            "name": "description",
                            "widget": "string",
                            "required": false
                        },
                        {
                            "label": "Contenu",
                            "name": "body",
                            "widget": "markdown"
                        }
                    ]
                },
                {
                    "file": "src/content/pages/about.mdx",
                    "label": "À propos",
                    "name": "about",
                    "fields": [
                        {
                            "label": "Titre",
                            "name": "title",
                            "widget": "string"
                        },
                        {
                            "label": "Description",
                            "name": "description",
                            "widget": "string",
                            "required": false
                        },
                        {
                            "label": "Contenu",
                            "name": "body",
                            "widget": "markdown"
                        }
                    ]
                }
            ]
        },
        {
            "name": "articles",
            "label": "Articles",
            "folder": "src/content/articles",
            "create": true,
            "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
            "extension": "mdx",
            "format": "frontmatter",
            "fields": [
                {
                    "label": "Titre",
                    "name": "title",
                    "widget": "string"
                },
                {
                    "label": "Date",
                    "name": "date",
                    "widget": "datetime"
                },
                {
                    "label": "Description",
                    "name": "description",
                    "widget": "string"
                },
                {
                    "label": "Tags",
                    "name": "tags",
                    "widget": "list",
                    "default": []
                },
                {
                    "label": "Catégories",
                    "name": "categories",
                    "widget": "list",
                    "default": []
                },
                {
                    "label": "Brouillon",
                    "name": "draft",
                    "widget": "boolean",
                    "default": false
                },
                {
                    "label": "Contenu (MDX)",
                    "name": "body",
                    "widget": "markdown"
                }
            ]
        },
        {
            "name": "journal",
            "label": "Journal",
            "folder": "src/content/journal",
            "create": true,
            "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
            "extension": "md",
            "format": "frontmatter",
            "fields": [
                {
                    "label": "Titre",
                    "name": "title",
                    "widget": "string"
                },
                {
                    "label": "Date",
                    "name": "date",
                    "widget": "datetime"
                },
                {
                    "label": "Type",
                    "name": "type",
                    "widget": "select",
                    "options": [
                        "youtube",
                        "vimeo",
                        "image",
                        "citation",
                        "documents"
                    ]
                },
                {
                    "label": "YouTube ID",
                    "name": "youtubeId",
                    "widget": "string",
                    "required": false
                },
                {
                    "label": "Vimeo ID",
                    "name": "vimeoId",
                    "widget": "string",
                    "required": false
                },
                {
                    "label": "Image (URL ou /uploads)",
                    "name": "image",
                    "widget": "string",
                    "required": false
                },
                {
                    "label": "Texte alternatif image",
                    "name": "imageAlt",
                    "widget": "string",
                    "required": false
                },
                {
                    "label": "Documents",
                    "name": "documents",
                    "widget": "list",
                    "required": false,
                    "fields": [
                        {
                            "label": "Label",
                            "name": "label",
                            "widget": "string"
                        },
                        {
                            "label": "Fichier (URL ou /uploads)",
                            "name": "file",
                            "widget": "string"
                        }
                    ]
                },
                {
                    "label": "Brouillon",
                    "name": "draft",
                    "widget": "boolean",
                    "default": false
                },
                {
                    "label": "Contenu",
                    "name": "body",
                    "widget": "markdown"
                }
            ]
        }
    ]
  }
});
