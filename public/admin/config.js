/* global CMS */
const origin = window.location.origin;
const isLocalDev = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname) || origin.includes(".local");

// Default config
const default_config = {
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
let cms_config = {}

// Github config
const github_config = {
    backend: {
      name: "github",
      repo: "lolozere/arbraphore",
      branch: "main",
      base_url: "https://arabraphore-decap-auth.laurent-a35.workers.dev"
    },
    publish_mode: "editorial_workflow"
}
const local_config = {
    local_backend: true,
    backend: {
      name: "git-gateway"
    }
}

const runtime_config = isLocalDev ? local_config : github_config
cms_config = {
    ...default_config,
    ...runtime_config
}

CMS.init({
  config: cms_config
});
