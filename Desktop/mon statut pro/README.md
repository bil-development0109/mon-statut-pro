# Mon Statut Pro - Site Web

## Configuration des formulaires avec Netlify

Ce site utilise Netlify Forms pour gérer les formulaires de contact et d'avis sans avoir besoin d'un backend. Voici comment déployer le site et activer les formulaires :

### Étapes de déploiement sur Netlify

1. **Créer un compte Netlify**
   - Rendez-vous sur [netlify.com](https://www.netlify.com/) et créez un compte gratuit si vous n'en avez pas déjà un.

2. **Déployer le site**
   - Depuis le tableau de bord Netlify, cliquez sur "New site from Git" ou glissez-déposez le dossier du site directement.
   - Si vous utilisez Git, connectez votre dépôt et suivez les instructions.
   - Si vous faites un glisser-déposer, sélectionnez simplement le dossier contenant tous les fichiers du site.

3. **Activer la détection des formulaires**
   - Une fois le site déployé, allez dans "Site settings" > "Forms" > "Form detection".
   - Assurez-vous que l'option "Enable form detection" est activée.

4. **Vérifier les formulaires**
   - Après le déploiement, vos formulaires devraient apparaître dans la section "Forms" du tableau de bord Netlify.
   - Vous verrez deux formulaires : "avis" et "contact".

### Fonctionnalités des formulaires

- **Protection anti-spam** : Les formulaires utilisent un champ honeypot pour filtrer les robots.
- **Redirection** : Après soumission, l'utilisateur est redirigé vers une page de confirmation (success.html).
- **Notifications** : Vous pouvez configurer des notifications par email dans les paramètres de Netlify.

### Personnalisation des notifications

Pour recevoir les soumissions de formulaires par email :

1. Dans le tableau de bord Netlify, allez dans "Site settings" > "Forms" > "Form notifications".
2. Cliquez sur "Add notification" et sélectionnez "Email notification".
3. Configurez l'adresse email où vous souhaitez recevoir les notifications.

### Limites du plan gratuit

Le plan gratuit de Netlify Forms inclut :
- 100 soumissions par mois
- Protection anti-spam de base
- Notifications par email

Si vous avez besoin de plus de fonctionnalités ou de soumissions, vous pouvez passer à un plan payant.

---

Cette solution est entièrement gratuite tant que vous restez dans les limites du plan gratuit de Netlify (100 soumissions par mois).