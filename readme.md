# Folder for the web dev project

![Unstable](https://img.shields.io/badge/Unstable%20Release-purple?style=flat)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=fff)
![VUE](https://img.shields.io/badge/Vue%20JS-35495E?logo=vuedotjs&logoColor=ggg)
![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)
[![DaisyUI](https://img.shields.io/badge/daisyUI-5A0EF8?&logo=daisyui&logoColor=white)](https://daisyui.com/)

## Table of contents
- [QnA](#QnA)
- [Tree](#Tree)
- [Roadmap](#Roadmap)
- [Installation](#Installation)
- [Status](#Status)

## QnA
- Why is the entire repo/code in english ?
    - It's because in a real project, we have a higher chance to use english over french
- Why use vue instead of vite like we saw in classe ?
    - Because im more used to vue instead of basic vite, and the teacher said that we could use react for example if we are more experienced with it.
    - Because I want vue router.
    - Because It dosen't change the syntax of daisyUI / TailwindCSS / Html unlike angular
- Did I used any form of AI ?
    - Yes, for minor issue fix / easier time at refactoring code (faster) / code overhauls
- Why Axios over mailto ?
    - I had issue setting up mailto with my browser, and I wanted to use axios and my own mail server. However, because of exams being soon, I do not have the time to make one, so Instead I rely on [web3forms](https://web3forms.com)'s service.

## Tree
```bash
"Tristan_Favier's Important File Tree"
├───public
│   ├───icon.png
│   └───audios
│       ├───apothecary.flac
│       ├───evangelion.flac
│       ├───expedition.flac
│       ├───lain.flac
│       ├───league.flac
│       └───osu.flac
├───src
│   ├───assets
│   │   ├───apothecary.png
│   │   ├───coding.jpg
│   │   ├───computer.png
│   │   ├───expedition33.jpeg
│   │   ├───expedition33.png
│   │   ├───hardware.jpg
│   │   ├───lain.jpeg
│   │   ├───lain2.jpeg
│   │   ├───lain3.jpeg
│   │   ├───league.jpg
│   │   ├───maomao.jpg
│   │   ├───systeme.png
│   │   ├───thebigblack.jpg
│   │   ├───thirdimpact.jpeg
│   │   └───vue.svg
│   ├───components
│   │   ├───AlertModal.vue
│   │   ├───BruteforceBanner.vue
│   │   ├───Calc.vue
│   │   ├───ContactBanner.vue
│   │   ├───ErrorModal.vue
│   │   ├───FloatingButton.vue
│   │   ├───FloatingHomeButton.vue
│   │   ├───FooterBar.vue
│   │   ├───LainBackground.vue
│   │   ├───QuizModal.vue
│   │   ├───RobotModal.vue
│   │   ├───SentModal.vue
│   │   ├───Split.vue
│   │   ├───StarField.vue
│   │   └───WelcomeBanner.vue
│   ├───pages
│   │   ├───ContactPage.vue
│   │   ├───HomePage.vue
│   │   └───PassionPage.vue
│   ├───App.vue
│   ├───main.js
│   ├───router.js
│   └────style.css
├───index.html
├───package-lock.json
├───package.json
├───readme.md
└───vite.config.js
```


## Roadmap
- [x] Setting up vue
- [x] Setting up Tailwind CSS / PostCSS / daisyUI (For good practice)
- [x] Setting up the homepage
- [x] Quiz
- [x] Bruteforce bot for the quiz
- [x] Router
- [x] Navigation guards
- [x] Contact page
- [x] Calc menu
- [ ] ~~Port my old html/css cv to tailwindcss/daisyui~~
- [x] Passion page
- [x] Adding content to the page
- [x] Buttons for the calculator
- [x] Media player for the passion page
- [ ] ~~Polishing the code~~
- [x] Contact page 'backend'
- [ ] ~~Performance upgrade in the contact page~~
- [ ] ~~Deploying the poject~~

## Installation

```bash
git clone https://github.com/Shoukshai/Tristan_Favier.git
cd Tristan_Favier/
npm install
npm run dev
```

## **Status:**
> [!NOTE]
> **I think** that it's mostly finished, the codebase need to be polished a bit but overall, it's usable and do everything of what we are asked to do
