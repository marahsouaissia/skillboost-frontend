import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";


interface Test {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
}
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})

export class TestComponent {

  constructor(private router: Router) {}

  Tests: Test[] = [
    {
      id: 1,
      title: "HTML",
      desc: "HTML est le langage de base pour structurer le contenu des pages web.",
      imageUrl: "assets/images/Logo_HTML.png"
    },
    {
      id: 2,
      title: "CSS",
      desc: "CSS est utilisé pour la mise en page et le stylisme des interfaces web.",
      imageUrl: "assets/images/Logo_CSS.png"
    },
    {
      id: 3,
      title: "JavaScript",
      desc: "JavaScript est un langage essentiel pour le développement web.",
      imageUrl: "assets/images/Logo_JS.png"
    },
    {
      id: 4,
      title: "Angular",
      desc: "Angular est un framework puissant pour le développement d'applications web modernes.",
      imageUrl: "assets/images/Logo_angular.png"
    },
    {
      id: 5,
      title: ".NET",
      desc: ".NET est une plateforme complète pour le développement d'applications robustes.",
      imageUrl: "assets/images/Logo_dotnet.svg"
    },
    {
      id: 6,
      title: "Spring Boot",
      desc: "Spring Boot est un framework Java pour le développement rapide d'applications robustes.",
      imageUrl: "assets/images/Logo_Spring-boot.png"
    },
    {
      id: 7,
      title: "React",
      desc: "React est une bibliothèque JavaScript pour construire des interfaces utilisateur.",
      imageUrl: "assets/images/Logo_React.png"
    },
    {
      id: 8,
      title: "Vue.js",
      desc: "Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur.",
      imageUrl: "assets/images/Logo_Vuejs.png"
    },
    {
      id: 9,
      title: "Node.js",
      desc: "Node.js est un environnement d'exécution JavaScript côté serveur.",
      imageUrl: "assets/images/Logo_Nodejs.png"
    },
    {
      id: 10,
      title: "Django",
      desc: "Django est un framework web Python pour un développement rapide.",
      imageUrl: "assets/images/Logo_Django.png"
    },
    {
      id: 11,
      title: "Flask",
      desc: "Flask est un micro-framework pour Python, idéal pour les petites applications.",
      imageUrl: "assets/images/Logo_Flask.png"
    },
    {
      id: 12,
      title: "PHP",
      desc: "PHP est un langage de script côté serveur principalement utilisé pour le développement web.",
      imageUrl: "assets/images/Logo_PHP.png"
    },
    {
      id: 13,
      title: "Ruby on Rails",
      desc: "Ruby on Rails est un framework web pour le langage Ruby, favorisant une approche conventionnelle.",
      imageUrl: "assets/images/Logo_Rails.png"
    }
  ];
  value: string | undefined;

  navigateToTest(testItem: Test) {
    console.log('Redirection vers le test :', testItem.title);
    // Redirection vers la page des détails du test
    this.router.navigate(['./test/test-details', testItem.id]); // Assurez-vous que le routeur est configuré pour accepter cet ID
  }
}
