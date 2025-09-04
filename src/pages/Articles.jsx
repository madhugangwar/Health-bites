import React, { useState } from "react";
import "../style/Articles.css";


const articles = [
  { id: 1, title: "Healthy Diet Tips",
    content: "Learn how to balance nutrition and eat healthy every day. Include vegetables, fruits, proteins, and healthy fats in your meals.", 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Yoga & Meditation",
    content: "Improve flexibility, balance, and mindfulness with daily yoga and meditation exercises. Even 10 minutes a day can help relieve stress.", 
    image: "https://plus.unsplash.com/premium_photo-1664299350663-9a5648f66c2c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, title: "Exercise Routines", 
    content: "Daily exercises for energy and strength. Focus on cardio, stretching, and strength training to keep your body fit and active.", 
    image: "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1571019613454-1cb2f99b2d8b%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dworkout%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8d29ya291dHxlbnwwfHx8fDE3NTY2MTA4NTB8MA%26ixlib%3Drb-4.1.0&blend-w=1&auto=format&fit=crop&q=60" },
  { id: 4, title: "Bad Digestion", 
    content: "Tips to improve digestion, avoid bloating, and maintain gut health. Include fiber-rich foods, probiotics, and stay hydrated.", 
    image: "https://images.unsplash.com/photo-1649073586428-e288125d930a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnZXN0aXZlfGVufDB8fDB8fHww" },
  { id: 5, title: "Feeling Dizzy", 
    content: "Causes of dizziness and remedies to prevent it. Stay hydrated, eat balanced meals, and avoid sudden posture changes.", 
    image: "https://www.shutterstock.com/image-photo/blured-photo-woman-suffering-vertigo-600nw-2122756115.jpg" },
  { id: 6, title: "Low Iron", 
    content: "Boost your iron levels naturally. Include iron-rich foods, vitamin C to enhance absorption, and avoid excess caffeine.", 
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80" },
  { id: 7, title: "Diabetes Care", 
    content: "Manage blood sugar levels with proper diet, exercise, and monitoring. Focus on low-glycemic foods and avoid sugary drinks.",
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPAfh-Zwu-Q-Ly0zPa9CgcsMF5fiPmdXFRw&s" },
  { id: 8, title: "Liver Health", 
    content: "Maintain a healthy liver with detox-friendly foods, limit alcohol, and stay active to prevent liver diseases.", 
    image: "data:image/jpeg;base64,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" },
];

function Articles() {
  const [modalArticle, setModalArticle] = useState(null);

  const openModal = (article) => setModalArticle(article);
  const closeModal = () => setModalArticle(null);

  return (
    <div className="articles-page">
      <div className="bg-image"></div>

      <div className="container py-5 position-relative">
        <section className="glassmorphism text-center mb-5 p-5">
          <h1 className="display-5 fw-bold mb-2">Articles & Health Tips</h1>
          <p className="lead">Read, learn, and stay healthy!</p>
        </section>

        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card card-hover">
              <img src={article.image} alt={article.title} className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-text">{article.content.slice(0, 70)}...</p>
                <button className="btn btn-success btn-hover" onClick={() => openModal(article)}>Read More</button>
              </div>
            </div>
          ))}
        </div>

        {modalArticle && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{modalArticle.title}</h2>
              <img src={modalArticle.image} alt={modalArticle.title} />
              <p>{modalArticle.content}</p>
              <button className="btn btn-danger mt-3" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
