import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgForOf} from "@angular/common";
import { OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';
import {ChartModule} from "primeng/chart";
import {FooterComponent} from "../footer/footer.component";

//import { Chart, registerables } from 'chart.js';



// Définition de l'interface TestModel
interface Test {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
}

// Définition de la classe Feedback
export class Feedback {
  constructor(
    public name: string,
    public imageUrl: string,
    public comment: string,
    public rating: number
  ) {}
}
@Component({
  "selector": 'app-home',
  "standalone": true,
  "imports": [
    NgForOf,
    RouterLink,
    ChartModule,
    FooterComponent
  ],
  "templateUrl": './home.component.html',
  "styleUrl": './home.component.scss'
})



export class HomeComponent implements OnInit {

  basicData: any;

  basicOptions: any;
  private router: Router;

  constructor(router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    this.router = router;
  }

   ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
       this.initchart();
     }
   }

initchart(){
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  this.basicData = {
    labels: ['JAVA', 'HTML', 'CSS', 'C#'],
    datasets: [
      {
        label: 'TestModel by users',
        data: [540, 325, 702, 620],
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
        borderWidth: 1
      }
    ]
  };

  this.basicOptions = {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
}

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
  }
];

  isUserLoggedIn: boolean = false;  // À remplacer plus tard par une vraie logique backend
  goToTest(test: any) {
    if (this.isUserLoggedIn) {
      console.log('Redirect vers le test :', test.title);
    } else {
      console.log(' non connecté, redirection vers la page de connexion');
      // Exemple de redirection vers la page de sign-in
      this.router.navigate(['/sign-in']); // Redirection vers la page de connexion
    }
  }


  feedbacks = [
    {
      name: 'John Doe',
      text: 'This platform helped me a lot in improving my skills!',
      rating: 5,
      photo: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Jane Smith',
      text: 'I love how easy it is to track my progress!',
      rating: 4,
      photo: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Michael Johnson',
      text: 'The feedback system is amazing and so helpful!',
      rating: 5,
      photo: 'https://i.pravatar.cc/150?img=8'
    }
  ];

  currentFeedbackIndex = 0;



  startAutoSlide(): void {
    setInterval(() => {
      this.nextFeedback();
    }, 5000);  // Automatically slide every 5 seconds
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(1);
  }

  nextFeedback(): void {
    this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbacks.length;
  }

  prevFeedback(): void {
    this.currentFeedbackIndex = (this.currentFeedbackIndex - 1 + this.feedbacks.length) % this.feedbacks.length;
  }

}
