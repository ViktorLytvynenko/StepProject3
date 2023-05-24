import instance from "./Assets/axiosInstances";
const modal = document.querySelector(".cardEdit");
const edit = (cardId) => {
    console.log(cardId);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
             Authorization: `Bearer ${token}`
            }
    }
    instance.get(`/${cardId}`, config)
    .then((res) => {
        console.log(res.data)
        modal.style.display ="block";
        modal.innerHTML = `
        <p class="paragrafCardEdit">Редагувати картку</p>
    <div class="sectionContainer">
        <select id="changeDoctor" class="selectItem">
            <option disabled  value="none">Зробіть свій вибір</option>
            <option ${res.data.doctor=="Cardiologist" ? "selected" : ""} value="Cardiologist">Кардіолог</option>
            <option value="stomatolog">Стоматолог</option>
            <option value="terapevt">Терапевт</option>
        </select>
        <select id="changeTime" class="selectItem">
            <option disabled selected>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
        </select>
    </div>
    <ul class="editList">
        <li class="editItem">
            <p class="editParam">Title</p>
            <input id="changeTitle" class="editInput" type="text" value="${res.data.title}" placeholder="Напишіть назву візиту">
        </li>
        <li class="editItem">
            <p class="editParam">Age</p>
            <input id="changeAge" class="editInput" type="text" value="${res.data.age}" placeholder="Напишіть вік">
        </li>
        <li class="editItem">
            <p class="editParam">Weight</p>
            <input id="changeWeight" class="editInput" type="text" value="${res.data.weight}" placeholder="Напишіть вагу">
        </li>
        <li class="editItem">
            <p class="editParam">BP</p>
            <input id="changeBp" class="editInput" type="text" value="${res.data.bp}" placeholder="Напишіть тиск">
        </li>
    </ul>
    <div class="editBtns">
        <button class="editBtn editCancel">Назад</button>
        <button class="editBtn editSave">Зберегти</button>
    </div>
        `
        const editCancel = document.querySelector('.editCancel')
        editCancel.addEventListener('click', () => {
            modal.style.display ="none";
        })
        const editSave = document.querySelector('.editSave');
        editSave.addEventListener('click', () => {
            const formsEl = {
                doctor: document.querySelector('#changeDoctor'),
                time: document.querySelector('#changeTime'),
                title: document.querySelector('#changeTitle'),
                age: document.querySelector('#changeAge'),
                weight: document.querySelector('#changeWeight'),
                bp: document.querySelector('#changeBp')
               
            }
            
            const formsData = {
                doctor: formsEl.doctor.value,
                time: formsEl.time.value,
                title: formsEl.title.value,
                age: formsEl.age.value,
                weight: formsEl.weight.value,
                bp: formsEl.bp.value
            }
            
            instance.put(`/${cardId}`,formsData,config)
            .then((res)=>{
                if (res.status === 200){
                    modal.style.display ="none";
                }
            })
        });
        
    });
}
export default edit

