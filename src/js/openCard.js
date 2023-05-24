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
      console.log(res.data);
      modelWindow.style.display = "block";
      modelWindow.innerHTML = `
      <h2 class="card-title">Картка пацієнта</h2>
        <ul class="card-params">
            <li class="params-item">
                <p class="params-text"><span class="params-title">Id:</span>${res.data.id}</p>
            </li>
            <li class="params-item">
                <p class="params-text"><span class="params-title">Doctor:</span>${res.data.doctor}</p>
            </li>
            <li class="params-item">
                <p class="params-text"><span class="params-title">Description:</span>${res.data.description}</p>
            </li>
            <li class="params-item">
                <p class="params-text"><span class="params-title">Title:</span>${res.data.title}</p>
            </li>
            <li class="params-item">
                <p class="params-text"><span class="params-title">Age:</span>${res.data.age}</p>
            </li>
            
            <li class="params-item">
                <p class="params-text"><span class="params-title">Weight:</span>${res.data.weight}</p>
            </li>
            <li class="params-item">
                <p class="params-text"><span class="params-title">BP:</span>${res.data.bp}</p>
            </li>
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

