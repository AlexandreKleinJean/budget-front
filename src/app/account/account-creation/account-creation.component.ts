import { Component } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [],
  template: `
    <p>
      account-creation works!
    </p>
  `,
  styles: ``
})
export class AccountCreationComponent {/*
  async createAccount(name: string, bank: string, userId: number) {
    try {
      const newAccount = await this.accountService.newAccount(name, bank, userId);
      if (newAccount) {
        // Gérer le cas où la création du compte a réussi
        console.log('Nouveau compte créé avec succès:', newAccount);
        // Vous pouvez également mettre à jour la liste des comptes ou effectuer d'autres opérations nécessaires ici.
      } else {
        // Gérer le cas où la création du compte a échoué
        console.error('La création du compte a échoué.');
      }
    } catch (error) {
      // Gérer les erreurs de requête ici
      console.error('Erreur lors de la création du compte:', error);
    }
  }*/

}
