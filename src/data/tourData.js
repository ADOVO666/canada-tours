// import T1IMG from "../images/tours/T1.png";
// import T2IMG from "../images/tours/T2.png";
// import T3IMG from "../images/tours/T3.png";
// import T4IMG from "../images/tours/T4.png";

import {fetchTours} from "../api";

const tours = fetchTours();
// const tours = [
//   { id: 1, title: 'Тур в Альберту', description: 'Горы и природа', price: 1000, image: T1IMG, destination: 'Канада', availableTickets: 1 },
//   { id: 2, title: 'Тур в Британскую Колумбию', description: 'Лес и океан', price: 13000, image: T2IMG, destination: 'Канада', availableTickets: 2 },
//   { id: 3, title: 'Тур в Японию', description: 'Исследуйте Токио и Киото', price: 15000, image: T3IMG, destination: 'Япония', availableTickets: 1 },
//   { id: 4, title: 'Отдых в Таиланде', description: 'Пляжи и море', price: 9000, image: T4IMG, destination: 'Таиланд', availableTickets: 2 },
//   { id: 5, title: 'Тур в Италию', description: 'Посетите Рим и Венецию', price: 14000, image: T1IMG, destination: 'Италия', availableTickets: 1 },
//   { id: 6, title: 'Путешествие по Франции', description: 'Париж, Лувр и многое другое', price: 13000, image: T2IMG, destination: 'Франция', availableTickets: 3 },
//   { id: 7, title: 'Тур по Германии', description: 'Берлин, Мюнхен и история', price: 12000, image: T3IMG, destination: 'Германия', availableTickets: 2 },
//   { id: 8, title: 'Тур в Испанию', description: 'Барселона и пляжи', price: 11000, image: T4IMG, destination: 'Испания', availableTickets: 1 },
//   { id: 9, title: 'Тур в Грецию', description: 'Афины и острова', price: 10000, image: T1IMG, destination: 'Греция', availableTickets: 4 },
//   { id: 10, title: 'Тур в Австралию', description: 'Сидней и кенгуру', price: 16000, image: T2IMG, destination: 'Австралия', availableTickets: 2 },
// ];

// export default tours;
