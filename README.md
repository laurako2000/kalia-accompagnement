# Kalia Accompagnement — site + blog administrable

Ce projet contient l'intégralité du site Kalia Accompagnement : les pages existantes (accueil,
formules & tarifs, réservation, à propos, contact, FAQ...) ainsi qu'un **blog administrable**
propulsé par **Eleventy** (générateur de site) et **Decap CMS** (anciennement Netlify CMS).

Vous pouvez créer, modifier et supprimer vos articles depuis une interface simple à l'adresse
`/admin/`, sans jamais toucher au code.

**⚠️ Important** : le CMS a besoin d'un dépôt **GitHub** connecté à Netlify pour fonctionner
(authentification + enregistrement des articles). **Netlify Drop ne le permet pas** — c'est
pour ça que la connexion échouait. Suivez les étapes ci-dessous pour basculer vers un
déploiement GitHub : ça ne prend que 10 minutes et ce n'est à faire qu'une seule fois.

---

## Étape 1 — Créer un compte GitHub (si vous n'en avez pas déjà un)

1. Allez sur [github.com](https://github.com) → **Sign up**.
2. Créez votre compte (email, mot de passe, nom d'utilisateur).

## Étape 2 — Créer un nouveau dépôt (repository)

1. Une fois connecté, cliquez sur le **+** en haut à droite → **New repository**.
2. Donnez-lui un nom, par exemple `kalia-accompagnement`.
3. Laissez-le en **Private** (recommandé) ou **Public**, peu importe.
4. Ne cochez **aucune** case (pas de README, pas de .gitignore, pas de licence) —
   le dépôt doit être vide au départ.
5. Cliquez sur **Create repository**.

## Étape 3 — Envoyer les fichiers du projet dans ce dépôt

Pas besoin de ligne de commande : GitHub permet d'envoyer les fichiers directement depuis
votre navigateur.

1. Sur la page de votre nouveau dépôt (vide), cliquez sur le lien
   **"uploading an existing file"**.
2. Extrayez le ZIP source (`kalia-source.zip`) sur votre ordinateur. Vous devez obtenir un
   dossier contenant directement `.eleventy.js`, `netlify.toml`, `package.json`, `src/`, etc.
   **(pas de dossier supplémentaire qui les contiendrait — ces fichiers doivent être visibles
   dès qu'on ouvre le dossier extrait)**.
3. Sélectionnez **tous** les fichiers et dossiers à l'intérieur de ce dossier extrait
   (`.eleventy.js`, `netlify.toml`, `package.json`, `.gitignore`, `README.md`, `src/`), et
   glissez-les tous ensemble dans la zone d'upload de GitHub.
4. En bas de page, cliquez sur **Commit changes**.

Vérification rapide : sur la page principale de votre dépôt GitHub, vous devez voir
`.eleventy.js`, `netlify.toml`, `package.json` et `src/` **directement dans la liste**, pas
dans un sous-dossier.

## Étape 4 — Connecter ce dépôt à Netlify

1. Sur [app.netlify.com](https://app.netlify.com), allez dans le site actuel (déployé via
   Netlify Drop) → **Site settings** → tout en bas → **Delete this site** (ou créez un
   nouveau site à la place, au choix).
2. Cliquez sur **Add new site → Import an existing project**.
3. Choisissez **GitHub**, autorisez Netlify à accéder à vos dépôts, puis sélectionnez
   `kalia-accompagnement`.
4. Netlify détecte automatiquement la configuration grâce à `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `_site`
5. Cliquez sur **Deploy**. Le premier déploiement prend 1 à 2 minutes.

## Étape 5 — Activer l'authentification du CMS (Identity)

1. Dans le tableau de bord du site → **Site settings → Identity → Enable Identity**.
2. Toujours dans Identity, section **Registration** : choisissez **Invite only**
   (recommandé, pour que vous soyez la seule personne à pouvoir créer un compte).

## Étape 6 — Activer Git Gateway

1. Toujours dans **Identity**, descendez jusqu'à la section **Services**.
2. Cliquez sur **Enable Git Gateway**.

*(C'est cette étape précise qui manquait avec Netlify Drop : Git Gateway a besoin d'un vrai
dépôt Git connecté pour savoir où enregistrer vos articles.)*

## Étape 7 — Vous inviter vous-même comme utilisateur

1. Toujours dans **Identity → Invite users**.
2. Entrez votre adresse email, puis **Send**.
3. Vous recevez un email Netlify : cliquez sur le lien, définissez votre mot de passe.

## Étape 8 — Se connecter au CMS

Rendez-vous sur `https://votre-site.netlify.app/admin/`, connectez-vous avec l'email et le
mot de passe définis à l'étape précédente. Vous arrivez sur le tableau de bord Decap CMS.

---

## Étape 9 — Créer, modifier ou supprimer un article

### Créer un article
1. Dans `/admin/`, cliquez sur **"Articles de blog" → "New Article"** (ou "Nouvel article").
2. Remplissez les champs :
   - **Titre** — devient le titre de la page et le titre affiché dans Google.
   - **Méta-description (SEO)** — le résumé affiché sous le titre dans les résultats Google
     et sur les réseaux sociaux (150–160 caractères conseillés).
   - **Date de publication**
   - **Image à la une** — cliquez pour uploader une image depuis votre ordinateur (elle est
     automatiquement enregistrée dans le projet).
   - **Catégories** — sélectionnez une ou plusieurs catégories dans la liste.
   - **Contenu de l'article** — zone de texte enrichi (titres, listes, gras, liens...).
3. Cliquez sur **"Publish"** (ou **"Enregistrer"** si le workflow éditorial est activé, puis
   validez la publication depuis l'onglet "Éditorial workflow").

L'article devient une page complète à une URL propre, par exemple :

```
/blog/comment-sortir-du-burn-out/
```

avec son titre, sa méta-description, son image, sa date et ses catégories déjà en place pour
le référencement (SEO), et il apparaît automatiquement dans `/sitemap.xml`.

### Modifier un article
Dans `/admin/`, cliquez sur l'article dans la liste, modifiez les champs souhaités, puis
cliquez sur **"Publish"**.

### Supprimer un article
Ouvrez l'article dans `/admin/`, puis utilisez le menu **"..."** (ou le bouton **"Delete entry"**)
en haut de la page d'édition.

---

## Étape 10 — Publier les modifications

Selon le mode configuré dans `src/admin/config.yml` (`publish_mode`) :

- **`editorial_workflow`** *(activé par défaut dans ce projet)* : chaque article passe par les
  statuts **Brouillon → En relecture → Prêt à publier**, visibles dans l'onglet
  **"Éditorial workflow"** du CMS. Cliquez sur **"Publish"** quand vous êtes prêt(e) à le
  mettre en ligne.
- Chaque publication déclenche automatiquement un nouveau déploiement Netlify (visible dans
  l'onglet **"Deploys"** de votre tableau de bord Netlify). Le site est mis à jour en 1 à 2
  minutes, sans aucune action supplémentaire de votre part.

---

## Structure du projet

```
├── netlify.toml          → configuration de build et redirections Netlify
├── package.json          → dépendance Eleventy
├── .eleventy.js          → configuration du générateur de site (Eleventy)
└── src/
    ├── index.html, a-propos.html, contact.html, faq.html, ...  → pages existantes
    ├── shared.css, shared.js, images/                          → styles et médias
    ├── admin/
    │   ├── index.html    → interface Decap CMS
    │   └── config.yml    → champs du formulaire d'article
    ├── blog/
    │   ├── index.njk     → page /blog/ (générée automatiquement)
    │   └── posts/        → un fichier .md par article — c'est ici que le CMS écrit
    ├── _includes/        → gabarits (en-tête, pied de page, mise en page d'article)
    ├── _data/            → informations globales du site + liste des catégories
    └── sitemap.njk       → génère /sitemap.xml automatiquement
```

## Personnaliser les catégories

Les catégories proposées dans le CMS sont définies à deux endroits qui doivent rester cohérents :
- `src/admin/config.yml` (liste déroulante dans l'interface d'administration)
- `src/_data/categories.js` (barre de filtres affichée sur `/blog/`)

## Formulaires (Netlify Forms)

Le site utilise Netlify Forms pour : le formulaire de contact, la réservation de séance, le
questionnaire d'orientation et la newsletter. Netlify **capte automatiquement** chaque
soumission (visible dans `Site settings → Forms`), mais l'envoi d'un **email de notification**
doit être activé manuellement, une seule fois, par formulaire :

`Site settings → Forms → Form notifications → Add notification → Email notification`
→ entrez `contact@kalia-accompagnement.fr`.

## Développement local (optionnel)

```bash
npm install
npm run start   # serveur local avec rechargement automatique
```

Le CMS (`/admin/`) nécessite Netlify Identity + Git Gateway pour fonctionner : il ne sera donc
pleinement opérationnel qu'une fois le site déployé sur Netlify avec les réglages ci-dessus.
