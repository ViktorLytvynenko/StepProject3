import instance from "./Assets/axiosInstances";
const modelWindow = document.querySelector(".cardModal");

const openCard = (cardId) => {
  const token = localStorage.getItem("token");
  instance
    .get(`/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      modelWindow.style.display = "block";
      let infoHTML = ''
      Object.entries(res.data).forEach(([name, value]) => {
        infoHTML += `
        <li class="params-item">
            <p class="params-text"><span class="params-title">${name}:</span>${value}</p>
        </li>
        `
      });
      modelWindow.innerHTML = `
      <h2 class="card-title">Картка пацієнта</h2>
        <ul class="card-params">
           ${infoHTML}
        </ul>
        <button class="cardExit">Вийти</button>
        `;
        const buttonExit = document.querySelector('.cardExit');
        buttonExit.addEventListener('click', () =>{
            modelWindow.style.display = 'none';
        })
    });
};
export default openCard;

