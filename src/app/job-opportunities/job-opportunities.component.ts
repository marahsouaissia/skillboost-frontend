import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Job {
  title: string;
  description: string;
  contact: string;
  location: string;
  imageUrl: string;
}

@Component({
  selector: 'app-job-opportunities',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.scss']
})
export class JobOpportunitiesComponent {
  jobs: Job[] = [
    {
      title: 'Lead Développeur.se PHP Symfony (H/F)',
      description: 'Nous cherchons à recruter plusieurs ingénieurs Cloud DevOps pour renforcer nos équipes .',
      contact: 'Move2cloud@gmail.com',
      location: ' Rue Platon, LAC 3 Tunis zone NORD EST, Immeuble MSD PRO',
      imageUrl: 'assets/images/Move_Logo.webp'
    },
    {
      title: 'Ingénieur Cloud Devops',
      description: 'Vous aurez la responsabilité du développement d’applications en PHP Symfony avec votre équipe de 2 à 3 développeurs de talent.',
      contact: 'Tessi_Dev@gmail.com',
      location: 'La Chargui 1, Tunis، Tunisie',
      imageUrl: 'assets/images/Tessi_Logo.webp'
    },
    {
      title: 'Développeur Python',
      description: 'nous sommes à la recherche d’un développeur Python pour rejoindre notre équipe en France.',
      contact: 'DNEXT@gmail.com',
      location: 'Les Berges du Lac II, Tunis, Tunisie',
      imageUrl: 'assets/images/DNEXT_Logo.webp'
    },
    // Ajoutez d'autres offres d'emploi ici
  ];

  constructor(private router: Router) {}
}
