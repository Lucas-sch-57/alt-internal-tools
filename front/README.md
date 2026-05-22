## 🚀 Quick Start

Clonez le repository:

```bash
git clone git@github.com:Lucas-sch-57/alt-internal-tools.git

`cd front`

pnpm i
```

Lancez le frontend:

```bash
pnpm dev
```

L'application sera disponible sur:

- Frontend -> http://localhost:5173
- API -> https://tt-jsonserver-01.alt-tools.tech/

---

# 🏗️ Architecture

L'application suit une architecture modulaire et scalable

## Structure

```txt
src/
├── api
│   ├── analytics.ts
│   ├── client.ts
│   ├── departments.ts
│   ├── tools.ts
│   └── users.ts
├── App.tsx
├── assets
├── components
│   ├── forms
│   │   ├── FormField.tsx
│   │   ├── FormInput.tsx
│   │   └── FormSelect.tsx
│   ├── KpiCard.tsx
│   ├── layouts
│   │   ├── Navbar.tsx
│   │   └── NavbarLayout.tsx
│   ├── sections
│   │   ├── KpisSection.tsx
│   │   ├── RecentToolsSection.tsx
│   │   └── ToolsCatalog.tsx
│   └── ui
│       ├── analytics
│       ├── BackdropBlur.tsx
│       ├── Badge.tsx
│       ├── DetailItem.tsx
│       ├── DetailLabel.tsx
│       ├── KpiError.tsx
│       ├── KpiSkeleton.tsx
│       ├── PageHeader.Tsx
│       ├── TableSkeleton.tsx
│       └── tools
├── constants
│   ├── chartColors.ts
│   └── tools.ts
├── hooks
│   ├── analytics
│   │   └── useGetAnalytics.ts
│   ├── departments
│   │   └── useDepartments.ts
│   ├── tools
│   │   ├── useCreateTool.ts
│   │   └── useTools.ts
│   └── users
│       └── useUsers.ts
├── index.css
├── main.tsx
├── pages
│   ├── AnalyticsPage.tsx
│   ├── Dashboard.tsx
│   └── Tools.tsx
├── store
│   └── useToolStore.ts
├── types
│   └── index.d.ts
├── utils
│   ├── buildKpis.ts
│   ├── mapBudgetComparaison.ts
│   ├── mapCostOptimizationAlerts.ts
│   ├── mapDepartmentActivity.ts
│   ├── mapDepartmentCosts.ts
│   ├── mapGrowthTrends.ts
│   ├── mapRoiMetrics.ts
│   ├── mapTopExpensiveTools.ts
│   ├── mapUnsusedTools.ts
│   ├── mapUsageHeatMap.ts
│   ├── mapUsagePatterns.ts
│   ├── mapUsageRanking.ts
│   ├── mapUserAdoption.ts
│   └── normalizeStatus.ts
└── validators
    └── tools.ts
```

## Principes d'architecture

- Organisation orientée features
- Composants UI réutilisables
- Mappers dédiées aux analytics
- React Query
- Zustand pour state global

---

# 🎨 Évolution du Design System

Le design system a évolué progressivement tout au long du projet

Fondations:

- typo
- spacing
- layouts

Composants UI:

- KPI cards
- badges
- formulaires
- modals
- tables

Sytème analytics:

- Charts
- cohérence graphique
- dashboards

## Principes visuels

- Ombres légères
- Radius
- Esthétique SaaS moderne

---

# 🔗 Navigation & Parcours Utilisateur

## Dashboard

Vue globale des KPIs:

- Budget mensuel
- Nombre d'outils actifs
- Départements
- Coût par utilisateur

Vue des récents outils

## Tools Page

Interface de gestion:

- Filtres
- Recherche
- Tri
- Bulk actions
- Modal de détails

## Analytics Page

Dashboard business:

- Analytics de coûts
- Analytics d'usage
- Métriques ROI
- Alertes d'optimisation
- Insights d'adoption

---

# 📊 Stratégie d’Intégration des Données

L’application utilise JSON Server comme API mockée.

## Ressources principales

```txt
/departments
/users
/tools
/user_tools
/analytics
```

## Flux de données

```txt
API
 ↓
Hooks React Query
 ↓
Mappers
 ↓
Charts & composants UI
```

## Philosophie des mappers

Les fonctions de mapping transforment les données API en :

- datasets pour charts
- métriques KPI
- insights
- alertes
- rankings

Exemples :

```txt
mapDepartmentCost()
mapGrowthTrends()
mapUsagePatterns()
mapRoiMetrics()
```

Cela permet de garder les composants UI simples et lisibles.

---

# 📱 Responsive Design Progressif

L’application suit une approche mobile-first.

## Mobile

- layouts empilés
- grilles simplifiées
- tables scrollables

## Tablette

- charts adaptatifs
- KPI grids responsives

## Desktop

- analytics multi-colonnes
- densité optimisée

## Techniques utilisées

- Tailwind responsive
- CSS Grid
- flex layouts
- ResponsiveContainer (Recharts)

---

# ⚡ Optimisations de Performance

Plusieurs optimisations ont été mises en place.

## React Query

- Cache automatique
- Background refteching

## Architecture des composants

- Composatns réutilisables
- Rendu isolé des charts
- State léger

## Transformations de données

Les transformations importantes sont centralisées dans :

- hooks
- mappers

et non dans les composants.

## Charts

Les charts reçoivent uniquement :

- des données propres
- filtrées
- normalisées

Cela limite les re-renders inutiles.

---

# 🎯 Approche de Cohérence Visuelle

## Composants réutilisables

Exemples :

- KPI cards
- badges
- insight cards

## Cohérence des charts

Tous les charts partagent :

- les couleurs
- les bordures

---

# 📈 Philosophie de Visualisation des Données

## Recharts

Choisi pour :

- son intégration React
- sa flexibilité
- son responsive natif
- sa composabilité

## Stratégie de visualisation

### Area charts

Utilisés pour :

- les trends
- l’évolution des dépenses

### Bar charts

Utilisés pour :

- les comparaisons
- les rankings
- les métriques d’adoption

### Donut charts

Utilisés pour :

- les répartitions
- les breakdowns

### Insight cards

Préférées aux charts lorsque :

- la lisibilité est plus importante

---

# 🔮 Vision Complète / Évolutions Futures

Améliorations possibles :

## Authentification

- login
- rôles
- permissions

## Backend réel

- connexion à une REST API avec des données structurées et persistées

## Analytics avancés

- Historique
- Prédictions

## Collaboration

- Commentaires
- Validation interne

## Notifications

- Alertes budget
- rappels de renouvellement
- détection d'inactivité

## Exports

- PDF
- CSV
- Rapports programmés

---

# 🛠️ Stack Technique

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- Zustand
- Recharts
- React Hook Form
- Zod
- Lucide React

---
